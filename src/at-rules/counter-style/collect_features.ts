import { descriptorNameSet } from '~/at-rules/counter-style/descriptor_name_set';
import type { Feature } from '~/types';

type Params = {
  node: import('postcss').AtRule;
};

export async function collectFeatures({ node }: Params): Promise<Feature[]> {
  const features: Feature[] = [];

  node.walkDecls((delc) => {
    const [vendorPrefix] = /^-(webkit|moz|ms|o)-/.exec(delc.prop) ?? [];

    if (descriptorNameSet.has(delc.prop)) {
      features.push({
        endIndex: delc.prop.length,
        id: `at-rules.counter-style.${delc.prop}`,
        index: 0,
        name: `"${delc.prop}" descriptor of the @counter-style`,
        node: delc,
      });
    } else if (vendorPrefix != null) {
      const name = delc.prop.replace(vendorPrefix, '');

      if (descriptorNameSet.has(name)) {
        features.push({
          endIndex: delc.prop.length,
          id: `at-rules.counter-style.${name}`,
          index: 0,
          name: `"${name}" descriptor of the @counter-style`,
          node: delc,
          prefix: vendorPrefix,
        });
      }
    }
  });

  return features;
}
