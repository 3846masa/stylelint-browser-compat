import type { Feature } from '~/types';

type Params = {
  node: import('postcss-selector-parser').Pseudo;
  parent: import('postcss').Rule;
};

export async function collectFeatures({ node, parent }: Params): Promise<Feature[]> {
  if (node.value !== ':not') {
    return [];
  }

  const features: Feature[] = [];

  if (node.nodes.length >= 2) {
    const index = node.sourceIndex;
    const endIndex = index + node.toString().length;

    features.push({
      endIndex,
      id: `selectors.not.selector_list`,
      index,
      name: `":not" pseudo-class with several selectors`,
      node: parent,
    });
  }

  return features;
}
