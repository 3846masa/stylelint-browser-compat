import type { Feature } from '~/types';

const FLOW_RELATIVE_VALUE_LIST = ['inline-start', 'inline-end'];

type Params = {
  nodes: import('postcss-value-parser').Node[];
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ nodes, parent }: Params): Promise<Feature[]> {
  const prop = parent.prop.replace(/^-(webkit|moz|ms|o)-/, '');
  if (prop !== 'clear') {
    return [];
  }

  const features: Feature[] = [];

  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);
  const node = nodes[0];

  if (node?.type === 'word' && FLOW_RELATIVE_VALUE_LIST.includes(node.value)) {
    const index = offset + node.sourceIndex;
    const endIndex = offset + node.sourceEndIndex;

    features.push({
      endIndex,
      id: `properties.clear.flow_relative_values`,
      index,
      name: `"${node.value}" value specified as clear`,
      node: parent,
    });
  }

  return features;
}
