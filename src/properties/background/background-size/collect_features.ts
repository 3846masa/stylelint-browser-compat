import { unit } from 'postcss-value-parser';

import type { Feature } from '~/types';

const BG_SIZE_SINGLE_KEYWORD_LIST = ['contain', 'cover'];

function isValidBgSizeValue(
  node: import('postcss-value-parser').Node | undefined | null,
): node is import('postcss-value-parser').Node {
  if (node == null) {
    return false;
  }
  if (node.type === 'word') {
    return node.value === 'auto' || unit(node.value) !== false;
  }
  if (node.type === 'function') {
    return node.value === 'calc';
  }
  return false;
}

type Params = {
  bgLayerList: import('postcss-value-parser').Node[][];
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ bgLayerList, parent }: Params): Promise<Feature[]> {
  const prop = parent.prop.replace(/^-(webkit|moz|ms|o)-/, '');
  if (prop !== 'background') {
    return [];
  }

  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);

  const promises: Promise<Feature[]>[] = [];
  const features: Feature[] = [];

  // background-size
  for (const bgLayer of bgLayerList) {
    const slashDivNodeIndex = bgLayer.findIndex((node) => node.type === 'div' && node.value === '/');
    if (slashDivNodeIndex === -1) {
      continue;
    }

    const firstValueNode = bgLayer[slashDivNodeIndex + 1];
    const secondValueNode = bgLayer[slashDivNodeIndex + 3];

    if (firstValueNode == null) {
      continue;
    }

    if (BG_SIZE_SINGLE_KEYWORD_LIST.includes(firstValueNode.value)) {
      const index = offset + firstValueNode.sourceIndex;
      const endIndex = offset + firstValueNode.sourceEndIndex;

      features.push({
        endIndex,
        id: `properties.background.background-size`,
        index,
        name: `Values of background-size specified as background`,
        node: parent,
      });

      promises.push(
        import('~/properties/background-size/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ nodes: [firstValueNode], parent });
        }),
      );
    } else if (isValidBgSizeValue(firstValueNode)) {
      if (isValidBgSizeValue(secondValueNode)) {
        const index = offset + firstValueNode.sourceIndex;
        const endIndex = offset + secondValueNode.sourceEndIndex;

        features.push({
          endIndex,
          id: `properties.background.background-size`,
          index,
          name: `Values of background-size specified as background`,
          node: parent,
        });
      } else {
        const index = offset + firstValueNode.sourceIndex;
        const endIndex = offset + firstValueNode.sourceEndIndex;

        features.push({
          endIndex,
          id: `properties.background.background-size`,
          index,
          name: `Values of background-size specified as background`,
          node: parent,
        });
      }
    }
  }

  return [...features, ...(await Promise.all(promises)).flat()];
}
