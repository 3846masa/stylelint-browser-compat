import type { Feature } from '~/types';

type Params = {
  nodes: import('postcss-value-parser').Node[];
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ nodes, parent }: Params): Promise<Feature[]> {
  if (parent.prop !== '-moz-user-input') {
    return [];
  }

  const features: Feature[] = [];
  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);

  for (const node of nodes) {
    if (node.type !== 'word') {
      continue;
    }

    const index = offset + node.sourceIndex;
    const endIndex = offset + node.sourceEndIndex;

    if (node.value === 'auto') {
      features.push({
        endIndex,
        id: `properties.-moz-user-input.auto`,
        index,
        name: `"auto" value specified as -moz-user-input`,
        node: parent,
      });
    }
    if (node.value === 'none') {
      features.push({
        endIndex,
        id: `properties.-moz-user-input.none`,
        index,
        name: `"none" value specified as -moz-user-input`,
        node: parent,
      });
    }

    if (node.value === 'disabled') {
      features.push({
        endIndex,
        id: `properties.-moz-user-input.disabled`,
        index,
        name: `"disabled" value specified as -moz-user-input`,
        node: parent,
      });
    }
    if (node.value === 'enabled') {
      features.push({
        endIndex,
        id: `properties.-moz-user-input.enabled`,
        index,
        name: `"enabled" value specified as -moz-user-input`,
        node: parent,
      });
    }
  }

  return features;
}
