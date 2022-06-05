import type { Feature } from '~/types';

type Params = {
  nodes: import('postcss-value-parser').Node[];
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ nodes, parent }: Params): Promise<Feature[]> {
  const prop = parent.prop.replace(/^-(webkit|moz|ms|o)-/, '');
  if (prop !== 'background') {
    return [];
  }

  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);

  const features: Feature[] = [];

  for (const node of nodes) {
    if (node.type === 'div' && node.value === ',') {
      const index = offset;
      const endIndex = offset + parent.value.length;

      features.push({
        endIndex,
        id: `properties.background.multiple_backgrounds`,
        index,
        name: `Multiple backgrounds`,
        node: parent,
      });
      break;
    }
  }

  return features;
}
