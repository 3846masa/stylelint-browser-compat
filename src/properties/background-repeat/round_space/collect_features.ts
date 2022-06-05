import type { Feature } from '~/types';

type Params = {
  nodes: import('postcss-value-parser').Node[];
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ nodes, parent }: Params): Promise<Feature[]> {
  const prop = parent.prop.replace(/^-(webkit|moz|ms|o)-/, '');
  if (prop !== 'background' && prop !== 'background-repeat') {
    return [];
  }

  const features: Feature[] = [];

  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);

  for (const node of nodes) {
    if (node.type !== 'word') {
      continue;
    }

    if (node.value === 'round') {
      const index = offset + node.sourceIndex;
      const endIndex = offset + node.sourceEndIndex;

      features.push({
        endIndex,
        id: `properties.background-repeat.round_space`,
        index,
        name: `"round" value specified as background-repeat`,
        node: parent,
      });
    }
    if (node.value === 'space') {
      const index = offset + node.sourceIndex;
      const endIndex = offset + node.sourceEndIndex;

      features.push({
        endIndex,
        id: `properties.background-repeat.round_space`,
        index,
        name: `"space" value specified as background-repeat`,
        node: parent,
      });
    }
  }

  return features;
}
