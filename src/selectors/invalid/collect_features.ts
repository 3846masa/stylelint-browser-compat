import type { Feature } from '~/types';

type Params = {
  node: import('postcss-selector-parser').Pseudo;
  parent: import('postcss').Rule;
};

export async function collectFeatures({ node, parent }: Params): Promise<Feature[]> {
  if (node.value !== ':invalid') {
    return [];
  }

  const features: Feature[] = [];

  let current: import('postcss-selector-parser').Node | undefined = node;

  while ((current = current.prev())) {
    if (!['id', 'class', 'attribute', 'tag', 'pseudo'].includes(current.type)) {
      break;
    }

    const index = node.sourceIndex;
    const endIndex = index + node.value.length;

    if (current.type === 'tag' && current.value === 'form') {
      features.push({
        endIndex,
        id: `selectors.invalid.form`,
        index,
        name: `":invalid" pseudo-class with the form tag`,
        node: parent,
      });
    }
  }

  return features;
}
