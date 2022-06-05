import type { Feature } from '~/types';

type Params = {
  nodes: import('postcss-value-parser').Node[];
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ nodes, parent }: Params): Promise<Feature[]> {
  const prop = parent.prop.replace(/^-(webkit|moz|ms|o)-/, '');
  if (prop !== 'block-size') {
    return [];
  }

  const features: Feature[] = [];
  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);

  for (const node of nodes) {
    const index = offset + node.sourceIndex;
    const endIndex = offset + node.sourceEndIndex;

    if (node.type === 'word') {
      const value = node.value.replace(/^-(webkit|moz|ms|o)-/, '');

      if (value === 'fit-content') {
        features.push({
          endIndex,
          id: `properties.block-size.fit-content`,
          index,
          name: `"fit-content" value specified as block-size`,
          node: parent,
        });
      }
      if (value === 'min-content') {
        features.push({
          endIndex,
          id: `properties.block-size.min-content`,
          index,
          name: `"min-content" value specified as block-size`,
          node: parent,
        });
      }
      if (value === 'max-content') {
        features.push({
          endIndex,
          id: `properties.block-size.max-content`,
          index,
          name: `"max-content" value specified as block-size`,
          node: parent,
        });
      }
    }

    if (node.type === 'function') {
      const func = node.value.replace(/^-(webkit|moz|ms|o)-/, '');

      if (func === 'fit-content') {
        features.push({
          endIndex,
          id: `properties.block-size.fit-content_function`,
          index,
          name: `"fit-content()" function specified as block-size`,
          node: parent,
        });
      }
    }
  }

  return features;
}
