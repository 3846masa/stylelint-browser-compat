import { unit } from 'postcss-value-parser';

import type { Feature } from '~/types';

type Params = {
  nodes: import('postcss-value-parser').Node[];
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ nodes, parent }: Params): Promise<Feature[]> {
  const prop = parent.prop.replace(/^-(webkit|moz|ms|o)-/, '');
  if (prop !== 'border-radius') {
    return [];
  }

  const features: Feature[] = [];
  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);

  let isEllipticalBorder = false;

  for (const node of nodes) {
    if (node.type === 'word') {
      const result = unit(node.value);

      if (result !== false && result.unit === '%') {
        const index = offset + node.sourceIndex;
        const endIndex = offset + node.sourceEndIndex;

        features.push({
          endIndex,
          id: `properties.border-radius.percentages`,
          index,
          name: `Percentage value specified as border-radius`,
          node: parent,
        });
      }
    }

    if (node.type === 'div' && node.value === '/') {
      isEllipticalBorder = true;
    }
  }

  if (isEllipticalBorder) {
    const index = offset;
    const endIndex = offset + parent.value.length;

    features.push({
      endIndex,
      id: `properties.border-radius.elliptical_borders`,
      index,
      name: `Elliptical borders by border-radius`,
      node: parent,
    });
  }

  return features;
}
