import { unit as parseUnit, walk } from 'postcss-value-parser';

import { functionNameMap } from './function_name_map';
import { unitNameMap } from './unit_name_map';
import { valueNameMap } from './value_name_map';

import type { Feature } from '~/types';

type Params = {
  nodes: import('postcss-value-parser').Node[];
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ nodes, parent }: Params): Promise<Feature[]> {
  const promises: Promise<Feature[]>[] = [];
  const features: Feature[] = [];

  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);

  walk(nodes, (node) => {
    if (node.type === 'function') {
      const functionName = node.value;
      const featureId = functionNameMap.get(functionName);

      if (featureId != null) {
        const index = offset + node.sourceIndex;
        const endIndex = offset + node.sourceEndIndex;

        features.push({
          endIndex,
          id: featureId,
          index,
          name: `"${functionName}()" function`,
          node: parent,
        });

        promises.push(
          import('~/types/__function/collect_features').then(({ collectFeatures }) => {
            return collectFeatures({ functionName, node, parent });
          }),
        );
      } else {
        const functionName = node.value.replace(/^-(?:ms|o|webkit|moz)-/, '');
        const featureId = functionNameMap.get(functionName);

        if (featureId != null) {
          const index = offset + node.sourceIndex;
          const endIndex = offset + node.sourceEndIndex;

          features.push({
            endIndex,
            id: featureId,
            index,
            name: `"${functionName}()" function`,
            node: parent,
          });
        }

        promises.push(
          import('~/types/__function/collect_features').then(({ collectFeatures }) => {
            return collectFeatures({ functionName, node, parent });
          }),
        );
      }
    }

    if (node.type === 'word') {
      const dimension = parseUnit(node.value);

      if (dimension !== false) {
        const featureId = unitNameMap.get(dimension.unit);

        if (featureId != null) {
          const index = offset + node.sourceIndex + dimension.number.length;
          const endIndex = offset + node.sourceEndIndex;

          features.push({
            endIndex,
            id: featureId,
            index,
            name: `"${dimension.unit}" unit`,
            node: parent,
          });
        }

        promises.push(
          import('~/types/number/scientific_notation/collect_features').then(({ collectFeatures }) => {
            return collectFeatures({ dimension, node, parent });
          }),
        );
      } else {
        const featureId = valueNameMap.get(node.value);

        if (featureId != null) {
          const index = offset + node.sourceIndex;
          const endIndex = offset + node.sourceEndIndex;

          features.push({
            endIndex,
            id: featureId,
            index,
            name: `"${node.value}" value`,
            node: parent,
          });
        }

        if (/^#[0-9A-Fa-f]{3,8}$/.test(node.value)) {
          promises.push(
            import('~/types/color/rgb_hexadecimal_notation/collect_features').then(({ collectFeatures }) => {
              return collectFeatures({ node, parent });
            }),
          );
        }
      }
    }
  });

  return [...features, ...(await Promise.all(promises)).flat()];
}
