import { unit } from 'postcss-value-parser';

import type { Feature } from '~/types';

const RULE_NAME_MAP = {
  rgb: `types.color.rgb.float_values`,
  rgba: `types.color.rgb.float_values`,
} as const;

const FUNCTION_NAME_LIST = ['rgb', 'rgba'] as const;

function isTargetFunctionNameList(value: string): value is (typeof FUNCTION_NAME_LIST)[number] {
  return (FUNCTION_NAME_LIST as readonly string[]).includes(value);
}

type Params = {
  node: import('postcss-value-parser').FunctionNode;
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ node, parent }: Params): Promise<Feature[]> {
  const funcName = node.value.replace(/^-(?:ms|o|webkit|moz)-/, '');
  if (!isTargetFunctionNameList(funcName)) {
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
      .some((t) => t !== false && !/^[0-9]+$/.test(t.number));

    if (includedFloatUnit) {
      const index = offset + node.sourceIndex;
      const endIndex = offset + node.sourceEndIndex;

      features.push({
        endIndex,
        id: RULE_NAME_MAP[funcName],
        index,
        name: `Float values in ${funcName}() parameters`,
        node: parent,
      });
    }
  }

  return features;
}
