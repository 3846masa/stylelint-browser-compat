import valueParser from 'postcss-value-parser';

import { descriptorNameSet } from '~/at-rules/property/descriptor_name_set';
import type { Feature } from '~/types';

type Params = {
  node: import('postcss').AtRule;
};

export async function collectFeatures({ node }: Params): Promise<Feature[]> {
  const promises: Promise<Feature[]>[] = [];

  node.walkDecls((delc) => {
    const [vendorPrefix] = /^-(webkit|moz|ms|o)-/.exec(delc.prop) ?? [];

    if (descriptorNameSet.has(delc.prop)) {
      promises.push(
        Promise.resolve([
          {
            endIndex: delc.prop.length,
            id: `at-rules.property.${delc.prop}`,
            index: 0,
            name: `"${delc.prop}" descriptor of the @property`,
            node: delc,
          },
        ]),
      );
    } else if (vendorPrefix != null) {
      const name = delc.prop.replace(vendorPrefix, '');

      if (descriptorNameSet.has(name)) {
        promises.push(
          Promise.resolve([
            {
              endIndex: delc.prop.length,
              id: `at-rules.property.${name}`,
              index: 0,
              name: `"${name}" descriptor of the @property`,
              node: delc,
              prefix: vendorPrefix,
            },
          ]),
        );
      }
    }

    const valueRoot = valueParser(delc.value);

    promises.push(
      import('~/types/collect_features').then(({ collectFeatures }) => {
        return collectFeatures({ nodes: valueRoot.nodes, parent: delc });
      }),
    );
  });

  const features: Feature[] = (await Promise.all(promises)).flat();
  return features;
}
