import type { Feature } from '~/types';

type Params = {
  nodes: import('postcss-value-parser').Node[];
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ nodes, parent }: Params): Promise<Feature[]> {
  const prop = parent.prop.replace(/^-(webkit|moz|ms|o)-/, '');
  if (prop !== 'align-items') {
    return [];
  }

  const features: Feature[] = [];
  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);

  if (nodes.length === 3 && nodes[0]?.type === 'word' && nodes[1]?.type === 'space' && nodes[2]?.type === 'word') {
    const first = nodes[0];
    const second = nodes[2];

    if (first.value === 'first' && second.value === 'baseline') {
      const index = offset + first.sourceIndex;
      const endIndex = offset + second.sourceEndIndex;

      features.push({
        endIndex,
        id: `properties.align-items.flex_context.first_baseline`,
        index,
        name: `"first baseline" value specified as align-items`,
        node: parent,
      });
    }

    if (first.value === 'last' && second.value === 'baseline') {
      const index = offset + first.sourceIndex;
      const endIndex = offset + second.sourceEndIndex;

      features.push({
        endIndex,
        id: `properties.align-items.flex_context.last_baseline`,
        index,
        name: `"last baseline" value specified as align-items`,
        node: parent,
      });
    }

    if (first.value === 'safe' || first.value === 'unsafe') {
      const index = offset + first.sourceIndex;
      const endIndex = offset + first.sourceEndIndex;

      features.push({
        endIndex,
        id: `properties.align-items.flex_context.safe_unsafe`,
        index,
        name: `"${first.value}" value specified as align-items`,
        node: parent,
      });
    }
  }

  for (const node of nodes) {
    if (node.type !== 'word') {
      continue;
    }

    const index = offset + node.sourceIndex;
    const endIndex = offset + node.sourceEndIndex;

    switch (node.value) {
      case 'baseline': {
        features.push({
          endIndex,
          id: `properties.align-items.flex_context.baseline`,
          index,
          name: `"${node.value}" value specified as align-items`,
          node: parent,
        });
        break;
      }
      case 'start':
      case 'end': {
        features.push({
          endIndex,
          id: `properties.align-items.flex_context.start_end`,
          index,
          name: `"${node.value}" value specified as align-items`,
          node: parent,
        });
        break;
      }
    }
  }

  return features;
}
