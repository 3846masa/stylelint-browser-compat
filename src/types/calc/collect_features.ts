import { unit as parseUnit } from 'postcss-value-parser';

import type { Feature } from '~/types';

type Params = {
  node: import('postcss-value-parser').FunctionNode;
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ node, parent }: Params): Promise<Feature[]> {
  const funcName = node.value.replace(/^-(?:ms|o|webkit|moz)-/, '');
  if (funcName !== 'calc') {
    return [];
  }

  const features: Feature[] = [];
  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);

  let areAllValuesNumber = true;

  for (const child of node.nodes) {
    if (child.type === 'function') {
      const funcName = child.value.replace(/^-(?:ms|o|webkit|moz)-/, '');
      if (funcName === 'calc') {
        const index = offset + child.sourceIndex;
        const endIndex = offset + child.sourceEndIndex;

        features.push({
          endIndex,
          id: `types.calc.nested`,
          index,
          name: `Nested calc()`,
          node: parent,
        });
      }
    }
    if (child.type === 'word') {
      const { unit: unitName } = parseUnit(child.value) || { number: null, unit: null };
      if (unitName != null && unitName !== '') {
        areAllValuesNumber = false;
      }
    }
  }

  if (areAllValuesNumber) {
    const index = offset + node.sourceIndex;
    const endIndex = offset + node.sourceEndIndex;

    features.push({
      endIndex,
      id: `types.calc.number_values`,
      index,
      name: `<number> value with calc()`,
      node: parent,
    });
  }

  return features;
}
