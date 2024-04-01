import type { Feature } from '~/types';

type Params = {
  nodes: import('postcss-value-parser').Node[];
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ nodes, parent }: Params): Promise<Feature[]> {
  const prop = parent.prop.replace(/^-(webkit|moz|ms|o)-/, '');
  if (prop !== 'background' && prop !== 'background-size') {
    return [];
  }

  const features: Feature[] = [];
  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);

  for (const node of nodes) {
    if (node.type === 'word') {
      const index = offset + node.sourceIndex;
      const endIndex = offset + node.sourceEndIndex;

      switch (node.value) {
        case 'contain': {
          features.push({
            endIndex,
            id: `properties.background-size.contain`,
            index,
            name: `"contain" value specified as background-size`,
            node: parent,
          });
          break;
        }
        case 'cover': {
          features.push({
            endIndex,
            id: `properties.background-size.cover`,
            index,
            name: `"cover" value specified as background-size`,
            node: parent,
          });
          break;
        }
      }
    }
  }

  return features;
}
