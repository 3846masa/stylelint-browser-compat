const FUNCTION_NAME_LIST = ['hsl', 'rgb'];

import type { Feature } from '~/types';

type Params = {
  node: import('postcss-value-parser').FunctionNode;
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ node, parent }: Params): Promise<Feature[]> {
  const funcName = node.value.replace(/^-(?:ms|o|webkit|moz)-/, '');
  if (!FUNCTION_NAME_LIST.includes(funcName)) {
    return [];
  }

  const features: Feature[] = [];
  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);

  if (
    node.nodes.length === 7 &&
    node.nodes[0]?.type === 'word' &&
    (node.nodes[1]?.type === 'space' || node.nodes[1]?.type === 'div') &&
    node.nodes[2]?.type === 'word' &&
    (node.nodes[3]?.type === 'space' || node.nodes[3]?.type === 'div') &&
    node.nodes[4]?.type === 'word' &&
    node.nodes[5]?.type === 'div' &&
    node.nodes[6]?.type === 'word'
  ) {
    const index = offset + node.sourceIndex;
    const endIndex = offset + node.sourceEndIndex;

    features.push({
      endIndex,
      id: `types.color.${funcName}.alpha_parameter`,
      index,
      name: `Alpha parameter passed to ${funcName}()`,
      node: parent,
    });
  }

  return features;
}
