const FUNCTION_NAME_LIST = ['rgb', 'rgba'];

import { unit } from 'postcss-value-parser';

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
    node.nodes.length >= 5 &&
    node.nodes[0]?.type === 'word' &&
    node.nodes[2]?.type === 'word' &&
    node.nodes[4]?.type === 'word'
  ) {
    const includedFloatUnit = [node.nodes[0].value, node.nodes[2].value, node.nodes[4].value]
      .map((v) => unit(v))
      .some((t) => t !== false && /^[0-9]+$/.test(t.number) === false);

    if (includedFloatUnit) {
      const index = offset + node.sourceIndex;
      const endIndex = offset + node.sourceEndIndex;

      features.push({
        endIndex,
        id: `types.color.${funcName}.float_values`,
        index,
        name: `Float values in ${funcName}() parameters`,
        node: parent,
      });
    }
  }

  return features;
}
