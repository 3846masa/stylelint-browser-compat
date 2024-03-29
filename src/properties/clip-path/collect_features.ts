import type { Feature } from '~/types';

const BASIC_SHAPE_FUNCTION_NAME_LIST = ['inset', 'circle', 'ellipse', 'polygon', 'path'];

type Params = {
  nodes: import('postcss-value-parser').Node[];
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ nodes, parent }: Params): Promise<Feature[]> {
  const prop = parent.prop.replace(/^-(webkit|moz|ms|o)-/, '');
  if (prop !== 'clip-path') {
    return [];
  }

  const features: Feature[] = [];

  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);

  for (const node of nodes) {
    if (node.type === 'function') {
      if (node.value === 'path') {
        const index = offset + node.sourceIndex;
        const endIndex = offset + node.sourceEndIndex;

        features.push({
          endIndex,
          id: `properties.clip-path.path`,
          index,
          name: `"path()" function specified as clip-path`,
          node: parent,
        });
      } else if (BASIC_SHAPE_FUNCTION_NAME_LIST.includes(node.value)) {
        const index = offset + node.sourceIndex;
        const endIndex = offset + node.sourceEndIndex;

        features.push({
          endIndex,
          id: `properties.clip-path.basic_shape`,
          index,
          name: `"${node.value}()" function specified as clip-path`,
          node: parent,
        });
      }
    }
    if (node.type === 'word') {
      if (node.value === 'fill-box') {
        const index = offset + node.sourceIndex;
        const endIndex = offset + node.sourceEndIndex;

        features.push({
          endIndex,
          id: `properties.clip-path.fill-box`,
          index,
          name: `"${node.value}" value specified as clip-path`,
          node: parent,
        });
      } else if (node.value === 'stroke-box') {
        const index = offset + node.sourceIndex;
        const endIndex = offset + node.sourceEndIndex;

        features.push({
          endIndex,
          id: `properties.clip-path.stroke-box`,
          index,
          name: `"${node.value}" value specified as clip-path`,
          node: parent,
        });
      }
    }
  }

  return features;
}
