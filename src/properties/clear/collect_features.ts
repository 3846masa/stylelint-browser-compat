import type { Feature } from '~/types';

type Params = {
  nodes: import('postcss-value-parser').Node[];
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ nodes, parent }: Params): Promise<Feature[]> {
  const prop = parent.prop.replace(/^-(webkit|moz|ms|o)-/, '');
  if (prop !== 'clear') {
    return [];
  }

  const features: Feature[] = [];

  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);
  const node = nodes[0];

  if (node?.type === 'word') {
    const index = offset + node.sourceIndex;
    const endIndex = offset + node.sourceEndIndex;

    switch (node.value) {
      case 'inline-start': {
        features.push({
          endIndex,
          id: `properties.clear.inline-start`,
          index,
          name: `"inline-start" value specified as clear`,
          node: parent,
        });
        break;
      }
      case 'inline-end': {
        features.push({
          endIndex,
          id: `properties.clear.inline-end`,
          index,
          name: `"inline-end" value specified as clear`,
          node: parent,
        });
        break;
      }
    }
  }

  return features;
}
