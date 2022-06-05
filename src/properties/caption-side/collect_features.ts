import type { Feature } from '~/types';

const NON_STANDARD_VALUE_LIST = ['left', 'right', 'top-outside', 'bottom-outside'];

type Params = {
  nodes: import('postcss-value-parser').Node[];
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ nodes, parent }: Params): Promise<Feature[]> {
  const prop = parent.prop.replace(/^-(webkit|moz|ms|o)-/, '');
  if (prop !== 'caption-side') {
    return [];
  }

  const features: Feature[] = [];

  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);
  const node = nodes[0];

  if (node?.type === 'word' && NON_STANDARD_VALUE_LIST.includes(node.value)) {
    const index = offset + node.sourceIndex;
    const endIndex = offset + node.sourceEndIndex;

    features.push({
      endIndex,
      id: `properties.caption-side.non_standard_values`,
      index,
      name: `"${node.value}" value specified as caption-side`,
      node: parent,
    });
  }

  return features;
}
