import type { Feature } from '~/types';

type Params = {
  nodes: import('postcss-value-parser').Node[];
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ nodes, parent }: Params): Promise<Feature[]> {
  const prop = parent.prop.replace(/^-(webkit|moz|ms|o)-/, '');
  if (prop !== 'animation' && prop !== 'animation-direction') {
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

    if (node.value === 'reverse') {
      features.push({
        endIndex,
        id: `properties.animation-direction.reverse`,
        index,
        name: `"reverse" value specified as animation-direction`,
        node: parent,
      });
    }
    if (node.value === 'alternate-reverse') {
      features.push({
        endIndex,
        id: `properties.animation-direction.alternate-reverse`,
        index,
        name: `"alternate-reverse" value specified as animation-direction`,
        node: parent,
      });
    }
  }

  return features;
}
