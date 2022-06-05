import type { Feature } from '~/types';

type Params = {
  nodes: import('postcss-value-parser').Node[];
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ nodes, parent }: Params): Promise<Feature[]> {
  const prop = parent.prop.replace(/^-(webkit|moz|ms|o)-/, '');
  if (prop !== 'background-position-x') {
    return [];
  }

  const features: Feature[] = [];
  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);

  if (nodes.length >= 3) {
    const index = offset;
    const endIndex = offset + parent.value.length;

    features.push({
      endIndex,
      id: `properties.background-position-x.two_value_syntax`,
      index,
      name: `Offset values from any edge specified as background-position-x`,
      node: parent,
    });
  }

  return features;
}
