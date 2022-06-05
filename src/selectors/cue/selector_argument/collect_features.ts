import type { Feature } from '~/types';

type Params = {
  node: import('postcss-selector-parser').Pseudo;
  parent: import('postcss').Rule;
};

export async function collectFeatures({ node, parent }: Params): Promise<Feature[]> {
  if (node.value !== '::cue' || node.nodes.length === 0) {
    return [];
  }

  const index = node.sourceIndex;
  const endIndex = index + node.toString().length;

  const features: Feature[] = [
    {
      endIndex,
      id: `selectors.cue.selector_argument`,
      index,
      name: `"::cue" pseudo-element with selector argument`,
      node: parent,
    },
  ];

  return features;
}
