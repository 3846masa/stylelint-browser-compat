import type { Feature } from '~/types';

type Params = {
  nodes: import('postcss-value-parser').Node[];
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ nodes, parent }: Params): Promise<Feature[]> {
  const prop = parent.prop.replace(/^-(webkit|moz|ms|o)-/, '');
  if (prop !== 'color-scheme') {
    return [];
  }

  const features: Feature[] = [];

  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);
  const first = nodes[0];
  const second = nodes[2];

  if (first?.type === 'word' && second?.type === 'word') {
    if (first.value === 'only' && second.value === 'light') {
      const index = offset + first.sourceIndex;
      const endIndex = offset + second.sourceEndIndex;

      features.push({
        endIndex,
        id: `properties.color-scheme.only_light`,
        index,
        name: `"only light" keyword specified as color-scheme`,
        node: parent,
      });
    }
    if (first.value === 'only' && second.value === 'dark') {
      const index = offset + first.sourceIndex;
      const endIndex = offset + second.sourceEndIndex;

      features.push({
        endIndex,
        id: `properties.color-scheme.only_dark`,
        index,
        name: `"only dark" keyword specified as color-scheme`,
        node: parent,
      });
    }
  }

  return features;
}
