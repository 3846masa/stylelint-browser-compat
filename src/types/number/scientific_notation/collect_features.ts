import type { Dimension } from 'postcss-value-parser';

import type { Feature } from '~/types';

type Params = {
  dimension: Dimension;
  node: import('postcss-value-parser').WordNode;
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ dimension, node, parent }: Params): Promise<Feature[]> {
  const features: Feature[] = [];
  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);

  if (dimension.number.includes('e')) {
    const index = offset + node.sourceIndex;
    const endIndex = offset + node.sourceIndex + dimension.number.length;

    features.push({
      endIndex,
      id: `types.number.scientific_notation`,
      index,
      name: `Scientific notation for number`,
      node: parent,
    });
  }

  return features;
}
