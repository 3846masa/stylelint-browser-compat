import valueParser from 'postcss-value-parser';

import type { Feature } from '~/types';

type Params = {
  container: import('postcss').Container;
  ignoreFeatures: Set<string>;
};

export async function collectFeatures({ container, ignoreFeatures }: Params): Promise<Feature[]> {
  const promises: Promise<Feature[]>[] = [];

  container.each((node) => {
    if (node.type === 'atrule') {
      promises.push(
        import('~/at-rules/collect_features')
          .then(({ collectFeatures }) => collectFeatures({ ignoreFeatures, node }))
          .then((features) => {
            return features.filter((f) => !ignoreFeatures.has(f.id));
          }),
      );
    }
    if (node.type === 'rule') {
      promises.push(
        import('~/selectors/collect_features')
          .then(({ collectFeatures }) => collectFeatures({ ignoreFeatures, node }))
          .then((features) => {
            return features.filter((f) => !ignoreFeatures.has(f.id));
          }),
      );
    }
    if (node.type === 'decl') {
      const valueRoot = valueParser(node.value);

      promises.push(
        import('~/properties/collect_features')
          .then(({ collectFeatures }) => collectFeatures({ ignoreFeatures, node, valueRoot }))
          .then((features) => {
            return features.filter((f) => !ignoreFeatures.has(f.id));
          }),
      );

      promises.push(
        import('~/types/collect_features')
          .then(({ collectFeatures }) => {
            return collectFeatures({ nodes: valueRoot.nodes, parent: node });
          })
          .then((features) => {
            return features.filter((f) => !ignoreFeatures.has(f.id));
          }),
      );
    }
  });

  const features: Feature[] = (await Promise.all(promises)).flat();
  return features;
}
