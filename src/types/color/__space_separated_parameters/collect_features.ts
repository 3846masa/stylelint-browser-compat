const FUNCTION_NAME_LIST = ['hsl', 'hsla', 'rgb', 'rgba'];

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
    (node.nodes.length === 5 && node.nodes[1]?.type === 'space' && node.nodes[3]?.type === 'space') ||
    (node.nodes.length === 7 &&
      node.nodes[1]?.type === 'space' &&
      node.nodes[3]?.type === 'space' &&
      node.nodes[5]?.type === 'div' &&
      node.nodes[5].value === '/')
  ) {
    const index = offset + node.sourceIndex;
    const endIndex = offset + node.sourceEndIndex;

    features.push({
      endIndex,
      id: `types.color.${funcName}.space_separated_parameters`,
      index,
      name: `Space-separated ${funcName}() parameters`,
      node: parent,
    });
  }

  return features;
}
