import { unit } from 'postcss-value-parser';

import type { Feature } from '~/types';

const POSITION_KEYWORD_LIST = ['top', 'bottom', 'left', 'right', 'center'];

function isPositionValue(
  node: import('postcss-value-parser').Node | undefined | null,
): node is import('postcss-value-parser').Node {
  if (node == null) {
    return false;
  }
  if (node.type === 'word') {
    if (POSITION_KEYWORD_LIST.includes(node.value)) {
      return true;
    }
    if (unit(node.value) !== false) {
      return true;
    }
  }
  if (node.type === 'function' && node.value === 'calc') {
    return true;
  }
  return false;
}

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

  for (const bgPosition of bgPositionList) {
    for (let idx = 0; idx < bgPosition.length; idx++) {
      const first = bgPosition[idx];
      // const second = bgPosition[idx + 2];
      const third = bgPosition[idx + 4];
      const fourth = bgPosition[idx + 6];

      if (!isPositionValue(first)) {
        continue;
      }

      if (isPositionValue(fourth)) {
        const index = offset + first.sourceIndex;
        const endIndex = offset + fourth.sourceEndIndex;

        features.push({
          endIndex,
          id: `properties.background-position.4_value_syntax`,
          index,
          name: `Offset values from any edge specified as background-position`,
          node: parent,
        });
        break;
      }

      if (isPositionValue(third)) {
        const index = offset + first.sourceIndex;
        const endIndex = offset + third.sourceEndIndex;

        features.push({
          endIndex,
          id: `properties.background-position.4_value_syntax`,
          index,
          name: `Offset values from any edge specified as background-position`,
          node: parent,
        });
        break;
      }
    }
  }

  return features;
}
