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
    if (node.type === 'word' && (node.value === 'contain' || node.value === 'cover')) {
      const index = offset + node.sourceIndex;
      const endIndex = offset + node.sourceEndIndex;

      features.push({
        endIndex,
        id: `properties.background-size.contain_and_cover`,
        index,
        name: `"${node.value}" value specified as background-size`,
        node: parent,
      });
    }
  }

  return features;
}
