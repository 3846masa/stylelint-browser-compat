import type { Feature } from '~/types';

type Params = {
  nodes: import('postcss-value-parser').Node[];
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ nodes, parent }: Params): Promise<Feature[]> {
  const prop = parent.prop.replace(/^-(webkit|moz|ms|o)-/, '');
  if (prop !== 'justify-content') {
    return [];
  }

  const features: Feature[] = [];
  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);

  for (const node of nodes) {
    if (node.type !== 'word') {
      continue;
    }

    const index = offset + node.sourceIndex;
    const endIndex = offset + node.sourceEndIndex;

    switch (node.value) {
      case 'left':
      case 'right': {
        features.push({
          endIndex,
          id: `properties.justify-content.flex_context.left_right`,
          index,
          name: `"${node.value}" value specified as justify-content`,
          node: parent,
        });
        break;
      }
      case 'safe':
      case 'unsafe': {
        features.push({
          endIndex,
          id: `properties.justify-content.flex_context.safe_unsafe`,
          index,
          name: `"${node.value}" value specified as justify-content`,
          node: parent,
        });
        break;
      }
      case 'space-evenly': {
        features.push({
          endIndex,
          id: `properties.justify-content.flex_context.space-evenly`,
          index,
          name: `"${node.value}" value specified as justify-content`,
          node: parent,
        });
        break;
      }
      case 'start':
      case 'end': {
        features.push({
          endIndex,
          id: `properties.justify-content.flex_context.start_end`,
          index,
          name: `"${node.value}" value specified as justify-content`,
          node: parent,
        });
        break;
      }
      case 'stretch': {
        features.push({
          endIndex,
          id: `properties.justify-content.flex_context.start_end`,
          index,
          name: `"${node.value}" value specified as justify-content`,
          node: parent,
        });
        break;
      }
    }
  }

  return features;
}
