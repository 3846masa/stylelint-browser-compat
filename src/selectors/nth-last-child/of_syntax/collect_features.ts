import type { Feature } from '~/types';

type Params = {
  node: import('postcss-selector-parser').Pseudo;
  parent: import('postcss').Rule;
};

export async function collectFeatures({ node, parent }: Params): Promise<Feature[]> {
  if (node.value !== ':nth-last-child') {
    return [];
  }

  const features: Feature[] = [];

  const notation = node.map(String).join(',');
  if (notation.includes(' of ')) {
    const index = node.sourceIndex;
    const endIndex = index + node.toString().length;

    features.push({
      endIndex,
      id: `selectors.nth-last-child.of_syntax`,
      index,
      name: `"of" syntax of :nth-last-child pseudo-class`,
      node: parent,
    });
  }

  return features;
}
