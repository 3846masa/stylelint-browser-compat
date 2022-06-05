import type { Feature } from '~/types';

type Params = {
  node: import('postcss-selector-parser').Pseudo;
  parent: import('postcss').Rule;
};

export async function collectFeatures({ node, parent }: Params): Promise<Feature[]> {
  if (node.value !== ':host' || node.nodes.length === 0) {
    return [];
  }

  const index = node.sourceIndex;
  const endIndex = index + node.toString().length;

  const features: Feature[] = [
    {
      endIndex,
      id: `selectors.hostfunction`,
      index,
      name: `":host()" pseudo-class`,
      node: parent,
    },
  ];

  return features;
}
