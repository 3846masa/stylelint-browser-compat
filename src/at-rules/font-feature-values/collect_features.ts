import { atRulesNameSet } from '~/at-rules/font-feature-values/at_rules_name_set';
import type { Feature } from '~/types';

type Params = {
  node: import('postcss').AtRule;
};

export async function collectFeatures({ node }: Params): Promise<Feature[]> {
  const features: Feature[] = [];

  node.each((node) => {
    if (node.type !== 'atrule') {
      return;
    }

    if (atRulesNameSet.has(node.name)) {
      features.push({
        endIndex: `@${node.name}`.length,
        id: `at-rules.font-feature-values.${node.name}`,
        index: 0,
        name: `"@${node.name}" at rules of the @font-feature-values`,
        node,
      });
    }
  });

  return features;
}
