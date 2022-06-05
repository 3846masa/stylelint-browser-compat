import type { Feature } from '~/types';

type Params = {
  node: import('postcss-selector-parser').Attribute;
  parent: import('postcss').Rule;
};

export async function collectFeatures({ node, parent }: Params): Promise<Feature[]> {
  const features: Feature[] = [];

  const index = node.sourceIndex;
  const endIndex = index + node.toString().length;

  features.push({
    endIndex,
    id: `selectors.attribute`,
    index,
    name: `Attribute selector`,
    node: parent,
  });

  if (node.insensitive || node.raws.insensitiveFlag === 'i' || node.raws.insensitiveFlag === 'I') {
    features.push({
      endIndex,
      id: `selectors.attribute.case_insensitive_modifier`,
      index,
      name: `Attribute selector with case-insensitive modifier`,
      node: parent,
    });
  }

  if (node.raws.insensitiveFlag === 's' || node.raws.insensitiveFlag === 'S') {
    features.push({
      endIndex,
      id: `selectors.attribute.case_sensitive_modifier`,
      index,
      name: `Attribute selector with case-sensitive modifier`,
      node: parent,
    });
  }

  return features;
}
