import { typeUnitNameMap } from './type_unit_name_map';

import type { Feature } from '~/types';

type Params = {
  node: import('postcss-value-parser').FunctionNode;
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ node, parent }: Params): Promise<Feature[]> {
  const funcName = node.value.replace(/^-(?:ms|o|webkit|moz)-/, '');
  if (funcName !== 'attr') {
    return [];
  }

  const features: Feature[] = [];
  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);

  const [, firstDiv, second, secondDiv, third] = node.nodes;

  if (second != null) {
    if (firstDiv?.type === 'div' && firstDiv.value === ',') {
      const index = offset + second.sourceIndex;
      const endIndex = offset + second.sourceEndIndex;

      features.push({
        endIndex,
        id: `types.attr.fallback`,
        index,
        name: `Fallback value for attr()`,
        node: parent,
      });
    }
    if (firstDiv?.type === 'space') {
      const featureId = typeUnitNameMap.get(second.value);

      if (featureId != null) {
        const index = offset + second.sourceIndex;
        const endIndex = offset + second.sourceEndIndex;

        features.push({
          endIndex,
          id: featureId,
          index,
          name: `"${second.value}" unit keyword for attr()`,
          node: parent,
        });
      }
    }
  }

  if (third != null && secondDiv?.type === 'div' && secondDiv.value === ',') {
    const index = offset + third.sourceIndex;
    const endIndex = offset + third.sourceEndIndex;

    features.push({
      endIndex,
      id: `types.attr.fallback`,
      index,
      name: `Fallback value for attr()`,
      node: parent,
    });
  }

  return features;
}
