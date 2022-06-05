import type { Feature } from '~/types';

type Params = {
  node: import('postcss-selector-parser').ClassName;
  parent: import('postcss').Rule;
};

export async function collectFeatures({ node, parent }: Params): Promise<Feature[]> {
  const features: Feature[] = [];

  const index = node.sourceIndex;
  const endIndex = index + node.toString().length;

  features.push({
    endIndex,
    id: `selectors.class`,
    index,
    name: `Class selector`,
    node: parent,
  });

  return features;
}
