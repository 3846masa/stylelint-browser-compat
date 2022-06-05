import type { Feature } from '~/types';

type Params = {
  colorStop: import('postcss-value-parser').Node[];
  colorStopIndex: number;
  node: import('postcss-value-parser').FunctionNode;
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ colorStop, colorStopIndex, node, parent }: Params): Promise<Feature[]> {
  const funcName = node.value.replace(/^-(?:ms|o|webkit|moz)-/, '');
  if (funcName !== 'radial-gradient' && funcName !== 'repeating-radial-gradient') {
    return [];
  }

  const features: Feature[] = [];
  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);

  if (colorStopIndex !== 0) {
    return features;
  }

  const atNode = colorStop.find((n) => n.type === 'word' && n.value === 'at');
  if (atNode != null) {
    const index = offset + atNode.sourceIndex;
    const endIndex = offset + atNode.sourceEndIndex;

    features.push({
      endIndex,
      id: `types.image.gradient.${funcName}.at`,
      index,
      name: `"at" syntax for ${funcName}()`,
      node: parent,
    });
  }

  return features;
}
