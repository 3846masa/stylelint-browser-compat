import type { Feature } from '~/types';

type Params = {
  colorStop: import('postcss-value-parser').Node[];
  node: import('postcss-value-parser').FunctionNode;
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ colorStop, node, parent }: Params): Promise<Feature[]> {
  const funcName = node.value.replace(/^-(?:ms|o|webkit|moz)-/, '');
  if (funcName !== 'conic-gradient') {
    return [];
  }

  const features: Feature[] = [];
  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);

  if (colorStop[0]?.type === 'word' && ['from', 'at', 'in'].includes(colorStop[0].value)) {
    return features;
  }

  if (colorStop.length >= 5) {
    const index = offset + (colorStop[0]?.sourceIndex ?? 0);
    const endIndex = offset + (colorStop.at(-1)?.sourceEndIndex ?? 0);

    features.push({
      endIndex,
      id: `types.image.gradient.conic-gradient.doubleposition`,
      index,
      name: `Double-position color stops for conic-gradient()`,
      node: parent,
    });
  }

  return features;
}
