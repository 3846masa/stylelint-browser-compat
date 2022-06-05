import type { Feature } from '~/types';

type Params = {
  node: import('postcss-value-parser').WordNode;
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ node, parent }: Params): Promise<Feature[]> {
  const features: Feature[] = [];
  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);

  if (/^#[0-9A-Fa-f]{3}$/.test(node.value) || /^#[0-9A-Fa-f]{6}$/.test(node.value)) {
    const index = offset + node.sourceIndex;
    const endIndex = offset + node.sourceEndIndex;

    features.push({
      endIndex,
      id: `types.color.rgb_hexadecimal_notation`,
      index,
      name: `RGB hexadecimal notation`,
      node: parent,
    });
  }

  if (/^#[0-9A-Fa-f]{4}$/.test(node.value) || /^#[0-9A-Fa-f]{8}$/.test(node.value)) {
    const index = offset + node.sourceIndex;
    const endIndex = offset + node.sourceEndIndex;

    features.push({
      endIndex,
      id: `types.color.rgb_hexadecimal_notation.alpha_hexadecimal_notation`,
      index,
      name: `RGBA hexadecimal notation`,
      node: parent,
    });
  }

  return features;
}
