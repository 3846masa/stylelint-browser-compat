import type { Feature } from '~/types';

type Params = {
  nodes: import('postcss-value-parser').Node[];
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ nodes, parent }: Params): Promise<Feature[]> {
  const prop = parent.prop.replace(/^-(webkit|moz|ms|o)-/, '');
  if (prop !== 'background' && prop !== 'background-position') {
    return [];
  }

  const features: Feature[] = [];

  const bgPositionList: import('postcss-value-parser').Node[][] = [[]];

  {
    let isAfterSlash = false;
    for (const node of nodes) {
      if (node.type === 'div' && node.value === ',') {
        bgPositionList.push([]);
        isAfterSlash = false;
      } else if (node.type === 'div' && node.value === '/') {
        isAfterSlash = true;
      } else if (!isAfterSlash) {
        const bgPosition = bgPositionList.at(-1);
        bgPosition?.push(node);
      }
    }
  }

  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);

  if (bgPositionList.length >= 2) {
    const index = offset;
    const endIndex = offset + parent.value.length;

    features.push({
      endIndex,
      id: `properties.background-position.multiple_backgrounds`,
      index,
      name: `Multiple backgrounds`,
      node: parent,
    });
  }

  return features;
}
