import type { Feature } from '~/types';

type Params = {
  nodes: import('postcss-value-parser').Node[];
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ nodes, parent }: Params): Promise<Feature[]> {
  const prop = parent.prop.replace(/^-(webkit|moz|ms|o)-/, '');
  if (prop !== 'background' && prop !== 'background-attachment') {
    return [];
  }

  const features: Feature[] = [];

  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);
  let isMultipleBackground = false;

  for (const node of nodes) {
    if (node.type === 'div' && node.value === ',') {
      isMultipleBackground = true;
      continue;
    }
    if (node.type !== 'word') {
      continue;
    }

    if (node.value === 'fixed') {
      const index = offset + node.sourceIndex;
      const endIndex = offset + node.sourceEndIndex;

      features.push({
        endIndex,
        id: `properties.background-attachment.fixed`,
        index,
        name: `"fixed" value specified as background-attachment`,
        node: parent,
      });
    } else if (node.value === 'local') {
      const index = offset + node.sourceIndex;
      const endIndex = offset + node.sourceEndIndex;

      features.push({
        endIndex,
        id: `properties.background-attachment.local`,
        index,
        name: `"local" value specified as background-attachment`,
        node: parent,
      });
    }
  }

  if (isMultipleBackground) {
    const index = offset;
    const endIndex = offset + parent.value.length;

    features.push({
      endIndex,
      id: `properties.background-attachment.multiple_backgrounds`,
      index,
      name: `Multiple backgrounds`,
      node: parent,
    });
  }

  return features;
}
