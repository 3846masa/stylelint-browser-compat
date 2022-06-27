import type { Feature } from '~/types';

type Params = {
  colorStop: import('postcss-value-parser').Node[];
  colorStopIndex: number;
  node: import('postcss-value-parser').FunctionNode;
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ colorStop, colorStopIndex, node, parent }: Params): Promise<Feature[]> {
  const funcName = node.value.replace(/^-(?:ms|o|webkit|moz)-/, '');
  if (funcName !== 'linear-gradient' && funcName !== 'repeating-linear-gradient') {
    return [];
  }

  const features: Feature[] = [];
  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);

  if (colorStopIndex === 0 && colorStop.length === 1 && colorStop[0]?.type === 'word' && colorStop[0].value === '0') {
    const index = offset + (colorStop[0]?.sourceIndex ?? 0);
    const endIndex = offset + (colorStop.at(-1)?.sourceEndIndex ?? 0);

    features.push({
      endIndex,
      id: `types.image.gradient.${funcName}.unitless_0_angle`,
      index,
      name: `Unitless 0 angle for ${funcName}()`,
      node: parent,
    });
  }

  return features;
}
