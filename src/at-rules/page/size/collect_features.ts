import type { Feature } from '~/types';

type Params = {
  nodes: import('postcss-value-parser').Node[];
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ nodes, parent }: Params): Promise<Feature[]> {
  const features: Feature[] = [];

  const prop = parent.prop.replace(/^-(webkit|moz|ms|o)-/, '');
  if (prop !== 'size') {
    return [];
  }

  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);

  if (nodes.length === 1 && nodes[0]?.type === 'word') {
    const index = offset + nodes[0].sourceIndex;
    const endIndex = offset + nodes[0].sourceEndIndex;

    switch (nodes[0].value.toLowerCase()) {
      case 'jis-b4': {
        features.push({
          endIndex,
          id: `at-rules.page.size.jis-b4`,
          index,
          name: `"JIS-B4" size`,
          node: parent,
        });
        break;
      }
      case 'jis-b5': {
        features.push({
          endIndex,
          id: `at-rules.page.size.jis-b5`,
          index,
          name: `"JIS-B5" size`,
          node: parent,
        });
        break;
      }
    }
  }

  return features;
}
