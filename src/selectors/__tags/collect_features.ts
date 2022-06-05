import type { Feature } from '~/types';

type Params = {
  node: import('postcss-selector-parser').Tag;
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
  } else if (node.namespace != null) {
    const namespaceLength = `${node.namespace}|`.length;
    const index = node.sourceIndex - namespaceLength;
    const endIndex = index + namespaceLength;

    features.push({
      endIndex,
      id: `selectors.type.namespaces`,
      index,
      name: `Namespace selector`,
      node: parent,
    });
  }

  const index = node.sourceIndex;
  const endIndex = index + node.value.length;
  features.push({
    endIndex,
    id: `selectors.type`,
    index,
    name: `Type selector`,
    node: parent,
  });

  return features;
}
