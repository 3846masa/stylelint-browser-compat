import type { Feature } from '~/types';

const COMPAT_AUTO_VALUE_LIST = [
  'button',
  'searchfield',
  'textarea',
  'checkbox',
  'radio',
  'menulist',
  'listbox',
  'meter',
  'progress-bar',
];

type Params = {
  nodes: import('postcss-value-parser').Node[];
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ nodes, parent }: Params): Promise<Feature[]> {
  const prop = parent.prop.replace(/^-(webkit|moz|ms|o)-/, '');
  if (prop !== 'appearance') {
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

    if (COMPAT_AUTO_VALUE_LIST.includes(node.value)) {
      features.push({
        endIndex,
        id: `properties.appearance.${node.value}`,
        index,
        name: `"${parent.value}" value specified as appearance`,
        node: parent,
      });
    } else if (node.value === 'auto') {
      features.push({
        endIndex,
        id: `properties.appearance.auto`,
        index,
        name: `"auto" value specified as appearance`,
        node: parent,
      });
    } else if (node.value === 'none') {
      features.push({
        endIndex,
        id: `properties.appearance.none`,
        index,
        name: `"none" value specified as appearance`,
        node: parent,
      });
    } else if (node.value === 'textfield') {
      features.push({
        endIndex,
        id: `properties.appearance.textfield`,
        index,
        name: `"textfield" value specified as appearance`,
        node: parent,
      });
    } else if (node.value === 'menulist-button') {
      features.push({
        endIndex,
        id: `properties.appearance.menulist-button`,
        index,
        name: `"menulist-button" value specified as appearance`,
        node: parent,
      });
    }
  }

  return features;
}
