import { unit } from 'postcss-value-parser';

import type { Feature } from '~/types';

type Params = {
  nodes: import('postcss-value-parser').Node[];
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ nodes, parent }: Params): Promise<Feature[]> {
  const prop = parent.prop.replace(/^-(webkit|moz|ms|o)-/, '');
  if (prop !== 'box-shadow') {
    return [];
  }

  const features: Feature[] = [];

  const boxShadowList: import('postcss-value-parser').Node[][] = [[]];

  for (const node of nodes) {
    if (node.type === 'div' && node.value === ',') {
      boxShadowList.push([]);
    } else {
      const boxShadow = boxShadowList[boxShadowList.length - 1];
      boxShadow?.push(node);
    }
  }

  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);

  if (boxShadowList.length >= 2) {
    const index = offset;
    const endIndex = offset + parent.value.length;

    features.push({
      endIndex,
      id: `properties.box-shadow.multiple_shadows`,
      index,
      name: `Multiple shadows`,
      node: parent,
    });
  }

  let hasLengthValue = false;
  for (const boxShadow of boxShadowList) {
    for (let idx = 0; idx < boxShadow.length; idx++) {
      const first = boxShadow[idx];

      if (first?.type === 'word' && first.value === 'inset') {
        const index = offset + first.sourceIndex;
        const endIndex = offset + first.sourceEndIndex;

        features.push({
          endIndex,
          id: `properties.box-shadow.inset`,
          index,
          name: `"inset" value specified as box-shadow`,
          node: parent,
        });
        continue;
      }

      if (hasLengthValue) {
        continue;
      }

      if (first?.type === 'word' && unit(first.value) !== false) {
        hasLengthValue = true;

        const fourth = boxShadow[idx + 6];

        if (fourth?.type === 'word' && unit(fourth.value) !== false) {
          const index = offset + fourth.sourceIndex;
          const endIndex = offset + fourth.sourceEndIndex;

          features.push({
            endIndex,
            id: `properties.box-shadow.spread_radius`,
            index,
            name: `Spread radius value specified as box-shadow`,
            node: parent,
          });
          continue;
        }
      }
    }
  }

  return features;
}
