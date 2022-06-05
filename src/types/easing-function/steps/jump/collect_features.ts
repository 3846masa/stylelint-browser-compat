import type { Feature } from '~/types';

const JUMP_TERM_WORD_LIST = ['jump-start', 'jump-end', 'jump-none', 'jump-both'];

type Params = {
  node: import('postcss-value-parser').FunctionNode;
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ node, parent }: Params): Promise<Feature[]> {
  const funcName = node.value.replace(/^-(?:ms|o|webkit|moz)-/, '');
  if (funcName !== 'steps') {
    return [];
  }

  const features: Feature[] = [];
  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);

  if (node.nodes[2]?.type === 'word' && JUMP_TERM_WORD_LIST.includes(node.nodes[2].value)) {
    const index = offset + node.nodes[2].sourceIndex;
    const endIndex = offset + node.nodes[2].sourceEndIndex;

    features.push({
      endIndex,
      id: `types.easing-function.steps.jump`,
      index,
      name: `"${node.nodes[2].value}" keyword for steps()`,
      node: parent,
    });
  }

  return features;
}
