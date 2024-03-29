import type { Feature } from '~/types';

const RULE_NAME_MAP = {
  hsl: `types.color.hsl.float_values`,
  rgb: `types.color.rgb.float_values`,
} as const;

const FUNCTION_NAME_LIST = ['hsl', 'rgb'] as const;

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
      id: RULE_NAME_MAP[funcName],
      index,
      name: `Alpha parameter passed to ${funcName}()`,
      node: parent,
    });
  }

  return features;
}
