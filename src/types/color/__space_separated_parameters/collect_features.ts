import type { Feature } from '~/types';

const RULE_NAME_MAP = {
  hsl: `types.color.hsl.space_separated_parameters`,
  hsla: `types.color.hsl.space_separated_parameters`,
  rgb: `types.color.rgb.space_separated_parameters`,
  rgba: `types.color.rgb.space_separated_parameters`,
} as const;

const FUNCTION_NAME_LIST = ['hsl', 'hsla', 'rgb', 'rgba'] as const;

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
      id: RULE_NAME_MAP[funcName],
      index,
      name: `Space-separated ${funcName}() parameters`,
      node: parent,
    });
  }

  return features;
}
