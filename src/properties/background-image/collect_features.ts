import type { Feature } from '~/types';

type Params = {
  nodes: import('postcss-value-parser').Node[];
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ nodes, parent }: Params): Promise<Feature[]> {
  const prop = parent.prop.replace(/^-(webkit|moz|ms|o)-/, '');
  if (prop !== 'background' && prop !== 'background-image') {
    return [];
  }

  const promises: Promise<Feature[]>[] = [];
  const features: Feature[] = [];

  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);
  let isMultipleBackground = false;

  for (const node of nodes) {
    if (node.type === 'div' && node.value === ',') {
      isMultipleBackground = true;
      continue;
    }
    if (node.type !== 'function') {
      continue;
    }

    const funcName = node.value.replace(/^-(webkit|moz|ms|o)-/, '');

    const index = offset + node.sourceIndex;
    const endIndex = offset + node.sourceEndIndex;

    switch (funcName) {
      case 'element': {
        features.push({
          endIndex,
          id: `properties.background-image.element`,
          index,
          name: `"element()" function specified as background-image`,
          node: parent,
        });
        break;
      }
      case 'conic-gradient':
      case 'linear-gradient':
      case 'radial-gradient':
      case 'repeating-conic-gradient':
      case 'repeating-linear-gradient':
      case 'repeating-radial-gradient': {
        features.push({
          endIndex,
          id: `properties.background-image.gradients`,
          index,
          name: `Gradient function specified as background-image`,
          node: parent,
        });
        break;
      }
      case 'image-rect': {
        features.push({
          endIndex,
          id: `properties.background-image.image-rect`,
          index,
          name: `"image-rect()" function specified as background-image`,
          node: parent,
        });
        break;
      }
      case 'image-set': {
        features.push({
          endIndex,
          id: `properties.background-image.image-set`,
          index,
          name: `"image-set()" function specified as background-image`,
          node: parent,
        });
        promises.push(
          import('~/properties/background-image/svg_images/collect_features').then(({ collectFeatures }) => {
            return collectFeatures({ nodes: node.nodes, parent });
          }),
        );
        break;
      }
      case 'url': {
        promises.push(
          import('~/properties/background-image/svg_images/collect_features').then(({ collectFeatures }) => {
            return collectFeatures({ nodes: [node], parent });
          }),
        );
        break;
      }
    }
  }

  if (isMultipleBackground) {
    const index = offset;
    const endIndex = offset + parent.value.length;

    features.push({
      endIndex,
      id: `properties.background-image.multiple_backgrounds`,
      index,
      name: `Multiple backgrounds`,
      node: parent,
    });
  }

  return [...features, ...(await Promise.all(promises)).flat()];
}
