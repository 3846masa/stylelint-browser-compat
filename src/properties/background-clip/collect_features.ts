import type { Feature } from '~/types';

type Params = {
  nodes: import('postcss-value-parser').Node[];
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ nodes, parent }: Params): Promise<Feature[]> {
  const prop = parent.prop.replace(/^-(webkit|moz|ms|o)-/, '');
  if (prop !== 'background' && prop !== 'background-clip') {
    return [];
  }

  const features: Feature[] = [];

  for (const node of nodes) {
    if (node.type !== 'word') {
      continue;
    }

    if (node.value === 'content-box') {
      const offset = parent.prop.length + (parent.raws.between?.length ?? 0);
      const index = offset + node.sourceIndex;
      const endIndex = offset + node.sourceEndIndex;

      features.push({
        endIndex,
        id: `properties.background-clip.content-box`,
        index,
        name: `"content-box" value specified as background-clip`,
        node: parent,
      });
    } else if (node.value === 'text') {
      const offset = parent.prop.length + (parent.raws.between?.length ?? 0);
      const index = offset + node.sourceIndex;
      const endIndex = offset + node.sourceEndIndex;

      features.push({
        endIndex,
        id: `properties.background-clip.text`,
        index,
        name: `"text" value specified as background-clip`,
        node: parent,
      });
    }
  }

  return features;
}
