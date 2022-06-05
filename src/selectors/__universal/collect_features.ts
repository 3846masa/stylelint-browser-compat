import type { Feature } from '~/types';

type Params = {
  node: import('postcss-selector-parser').Universal;
  parent: import('postcss').Rule;
};

export async function collectFeatures({ node, parent }: Params): Promise<Feature[]> {
  const features: Feature[] = [];

  if (node.namespace === '*') {
    const namespaceLength = `${node.namespace}|`.length;
    const index = node.sourceIndex - namespaceLength;
    const endIndex = index + namespaceLength;

    features.push({
      endIndex,
      id: `selectors.universal.namespaces`,
      index,
      name: `Universal namespace selector`,
      node: parent,
    });
  }

  const index = node.sourceIndex;
  const endIndex = index + node.value.length;
  features.push({
    endIndex,
    id: `selectors.universal`,
    index,
    name: `Universal selector`,
    node: parent,
  });

  return features;
}
