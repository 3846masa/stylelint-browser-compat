import type { Feature } from '~/types';

const ENDING_SHAPE_VALUES = ['ellipse', 'circle'];
const SIZE_VALUES = ['closest-side', 'farthest-side', 'closest-corner', 'farthest-corner'];

type Params = {
  colorStop: import('postcss-value-parser').Node[];
  node: import('postcss-value-parser').FunctionNode;
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ colorStop, node, parent }: Params): Promise<Feature[]> {
  const funcName = node.value.replace(/^-(?:ms|o|webkit|moz)-/, '');
  if (funcName !== 'radial-gradient' && funcName !== 'repeating-radial-gradient') {
    return [];
  }

  const features: Feature[] = [];
  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);

  if (
    colorStop.some((n) => {
      return (
        n.type === 'word' &&
        (ENDING_SHAPE_VALUES.includes(n.value) || SIZE_VALUES.includes(n.value) || n.value === 'at')
      );
    })
  ) {
    return features;
  }

  if (colorStop.length >= 5) {
    const index = offset + (colorStop[0]?.sourceIndex ?? 0);
    const endIndex = offset + (colorStop[colorStop.length - 1]?.sourceEndIndex ?? 0);

    features.push({
      endIndex,
      id: `types.image.gradient.${funcName}.doubleposition`,
      index,
      name: `Double-position color stops for ${funcName}()`,
      node: parent,
    });
  }

  return features;
}
