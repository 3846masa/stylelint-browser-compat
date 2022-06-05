import valueParser from 'postcss-value-parser';

import type { Feature } from '~/types';

type Params = {
  ignoreFeatures: Set<string>;
  node: import('postcss').AtRule;
};

export async function collectFeatures({ ignoreFeatures, node }: Params): Promise<Feature[]> {
  const promises: Promise<Feature[]>[] = [];

  const valueRoot = valueParser(node.params);

  for (const valueNode of valueRoot.nodes) {
    if (valueNode.type === 'function' && valueNode.value === 'regexp') {
      promises.push(
        import('~/at-rules/document/regexp/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ node: valueNode, parent: node });
        }),
      );
    }
  }

  promises.push(
    import('~/collect_features').then(({ collectFeatures }) => {
      return collectFeatures({ container: node, ignoreFeatures });
    }),
  );

  const features: Feature[] = (await Promise.all(promises)).flat();
  return features;
}
