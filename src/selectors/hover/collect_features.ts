import { isPseudoElement } from 'postcss-selector-parser';

import type { Feature } from '~/types';

type Params = {
  node: import('postcss-selector-parser').Pseudo;
  parent: import('postcss').Rule;
};

export async function collectFeatures({ node, parent }: Params): Promise<Feature[]> {
  if (node.value !== ':hover') {
    return [];
  }

  const features: Feature[] = [];

  let current: import('postcss-selector-parser').Node = node;

  while ((current = current.prev())) {
    if (['id', 'class', 'attribute', 'tag', 'pseudo'].includes(current.type) !== true) {
      break;
    }

    const index = node.sourceIndex;
    const endIndex = index + node.value.length;

    if (current.type === 'tag') {
      if (current.value === 'a') {
        features.push({
          endIndex,
          id: `selectors.hover.a_elements`,
          index,
          name: `":hover" pseudo-class with the anchor tag`,
          node: parent,
        });
      } else {
        features.push({
          endIndex,
          id: `selectors.hover.all_elements`,
          index,
          name: `":hover" pseudo-class with any tag`,
          node: parent,
        });
      }
    }

    if (current.type === 'pseudo' && isPseudoElement(current)) {
      features.push({
        endIndex,
        id: `selectors.hover.pseudo_elements`,
        index,
        name: `":hover" pseudo-class with pseudo-element`,
        node: parent,
      });
    }
  }

  return features;
}
