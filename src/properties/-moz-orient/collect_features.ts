import type { Feature } from '~/types';

type Params = {
  nodes: import('postcss-value-parser').Node[];
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ nodes, parent }: Params): Promise<Feature[]> {
  if (parent.prop !== '-moz-orient') {
    return [];
  }

  const features: Feature[] = [];
  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);

  for (const node of nodes) {
    if (node.type !== 'word') {
      continue;
    }

    const index = offset + node.sourceIndex;
    const endIndex = offset + node.sourceEndIndex;

    if (node.value === 'auto') {
      features.push({
        endIndex,
        id: `properties.-moz-orient.auto`,
        index,
        name: `"auto" value specified as -moz-orient`,
        node: parent,
      });
    }
    if (node.value === 'inline') {
      features.push({
        endIndex,
        id: `properties.-moz-orient.inline`,
        index,
        name: `"inline" value specified as -moz-orient`,
        node: parent,
      });
    }
    if (node.value === 'block') {
      features.push({
        endIndex,
        id: `properties.-moz-orient.block`,
        index,
        name: `"block" value specified as -moz-orient`,
        node: parent,
      });
    }
  }

  return features;
}
