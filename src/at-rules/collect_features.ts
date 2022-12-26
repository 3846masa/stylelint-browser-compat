import { atRulesNameSet } from '~/at-rules/at_rules_name_set';
import type { Feature } from '~/types';

type Params = {
  ignoreFeatures: Set<string>;
  node: import('postcss').AtRule;
};

export async function collectFeatures({ ignoreFeatures, node }: Params): Promise<Feature[]> {
  const promises: Promise<Feature[]>[] = [];

  if (atRulesNameSet.has(node.name)) {
    promises.push(
      Promise.resolve([
        {
          endIndex: `@${node.name}`.length,
          id: `at-rules.${node.name}`,
          index: 0,
          name: `"@${node.name}" at rules`,
          node,
        },
      ]),
    );
  }

  switch (node.name) {
    case 'counter-style': {
      promises.push(
        import('~/at-rules/counter-style/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ node });
        }),
      );
      break;
    }
    case 'document': {
      promises.push(
        import('~/at-rules/document/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ ignoreFeatures, node });
        }),
      );
      break;
    }
    case 'font-face': {
      promises.push(
        import('~/at-rules/font-face/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ node });
        }),
      );
      break;
    }
    case 'font-feature-values': {
      promises.push(
        import('~/at-rules/font-feature-values/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ node });
        }),
      );
      break;
    }
    case 'keyframes': {
      promises.push(
        import('~/at-rules/keyframes/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ node });
        }),
      );
      break;
    }
    case 'media': {
      promises.push(
        import('~/at-rules/media/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ ignoreFeatures, node });
        }),
      );
      break;
    }
    case 'page': {
      promises.push(
        import('~/at-rules/page/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ ignoreFeatures, node });
        }),
      );
      break;
    }
    case 'property': {
      promises.push(
        import('~/at-rules/property/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ node });
        }),
      );
      break;
    }
  }

  const features = (await Promise.all(promises)).flat();
  return features;
}
