import selectorParser from 'postcss-selector-parser';

import type { Feature } from '~/types';

type Params = {
  ignoreFeatures: Set<string>;
  node: import('postcss').Rule;
};

export async function collectFeatures({ ignoreFeatures, node }: Params): Promise<Feature[]> {
  const promises: Promise<Feature[]>[] = [];

  // Selector list
  promises.push(
    Promise.resolve(
      Array.from(node.selector.matchAll(/,/g)).map((matches) => ({
        endIndex: (matches.index ?? 0) + 1,
        id: `selectors.list`,
        index: matches.index ?? 0,
        name: `Selector list`,
        node,
      })),
    ),
  );

  const selectorRoot = await selectorParser().ast(node.selector);

  selectorRoot.walk((selectorNode) => {
    switch (selectorNode.type) {
      case 'combinator': {
        promises.push(
          import('~/selectors/__combinators/collect_features').then(({ collectFeatures }) =>
            collectFeatures({ node: selectorNode, parent: node }),
          ),
        );
        break;
      }
      case 'tag': {
        promises.push(
          import('~/selectors/__tags/collect_features').then(({ collectFeatures }) =>
            collectFeatures({ node: selectorNode, parent: node }),
          ),
        );
        break;
      }
      case 'id': {
        promises.push(
          import('~/selectors/__ids/collect_features').then(({ collectFeatures }) =>
            collectFeatures({ node: selectorNode, parent: node }),
          ),
        );
        break;
      }
      case 'class': {
        promises.push(
          import('~/selectors/__classes/collect_features').then(({ collectFeatures }) =>
            collectFeatures({ node: selectorNode, parent: node }),
          ),
        );
        break;
      }
      case 'attribute': {
        promises.push(
          import('~/selectors/__attributes/collect_features').then(({ collectFeatures }) =>
            collectFeatures({ node: selectorNode, parent: node }),
          ),
        );
        break;
      }
      case 'pseudo': {
        promises.push(
          import('~/selectors/__pseudos/collect_features').then(({ collectFeatures }) =>
            collectFeatures({ node: selectorNode, parent: node }),
          ),
        );
        break;
      }
      case 'universal': {
        promises.push(
          import('~/selectors/__universal/collect_features').then(({ collectFeatures }) =>
            collectFeatures({ node: selectorNode, parent: node }),
          ),
        );
        break;
      }
    }
  });

  promises.push(
    import('~/collect_features').then(({ collectFeatures }) => {
      return collectFeatures({ container: node, ignoreFeatures });
    }),
  );

  const features = (await Promise.all(promises)).flat();
  return features;
}
