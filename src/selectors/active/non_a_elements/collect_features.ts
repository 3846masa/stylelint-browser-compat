import type { Feature } from '~/types';

type Params = {
  node: import('postcss-selector-parser').Pseudo;
  parent: import('postcss').Rule;
};

export async function collectFeatures({ node, parent }: Params): Promise<Feature[]> {
  if (node.value !== ':active') {
    return [];
  }

  const features: Feature[] = [];

  let current: import('postcss-selector-parser').Node | undefined = node;

  while ((current = current.prev())) {
    if (!['id', 'class', 'attribute', 'tag', 'pseudo'].includes(current.type)) {
      break;
    }

    if (current.type === 'tag' && current.value !== 'a') {
      const index = node.sourceIndex;
      const endIndex = index + node.value.length;

      features.push({
        endIndex,
        id: `selectors.active.non_a_elements`,
        index,
        name: `":active" pseudo-class with the non-anchor tag`,
        node: parent,
      });
    }
  }

  return features;
}
