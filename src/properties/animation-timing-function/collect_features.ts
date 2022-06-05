import type { Feature } from '~/types';

const JUMP_TERM_WORD_LIST = ['jump-start', 'jump-end', 'jump-none', 'jump-both'];

type Params = {
  nodes: import('postcss-value-parser').Node[];
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ nodes, parent }: Params): Promise<Feature[]> {
  const prop = parent.prop.replace(/^-(webkit|moz|ms|o)-/, '');
  if (prop !== 'animation' && prop !== 'animation-timing-function') {
    return [];
  }

  const features: Feature[] = [];

  for (const node of nodes) {
    if (node.type !== 'function' || node.value !== 'steps') {
      continue;
    }

    if (node.nodes[0]?.type !== 'word' || node.nodes[1]?.type !== 'div' || node.nodes[2]?.type !== 'word') {
      continue;
    }

    const jumptermNode = node.nodes[2];
    if (JUMP_TERM_WORD_LIST.includes(jumptermNode.value) === false) {
      continue;
    }

    const offset = parent.prop.length + (parent.raws.between?.length ?? 0);
    const index = offset + jumptermNode.sourceIndex;
    const endIndex = offset + jumptermNode.sourceEndIndex;
    features.push({
      endIndex,
      id: `properties.animation-timing-function.jump`,
      index,
      name: `"${jumptermNode.value}" keyword for steps() specified as animation-timing-function`,
      node: parent,
    });
  }

  return features;
}
