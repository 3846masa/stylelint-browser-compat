import type { Feature } from '~/types';

type Params = {
  node: import('postcss-selector-parser').Pseudo;
  parent: import('postcss').Rule;
};

export async function collectFeatures({ node, parent }: Params): Promise<Feature[]> {
  if (node.value !== ':before' && node.value !== '::before') {
    return [];
  }

  const features: Feature[] = [];

  parent.each((node) => {
    if (node.type !== 'decl') {
      return;
    }

    if (node.prop.startsWith('transition')) {
      features.push({
        endIndex: node.prop.length,
        id: `selectors.before.animation_and_transition_support`,
        index: 0,
        name: `CSS transition for "::before" pseudo-element`,
        node,
      });
    }

    if (node.prop.startsWith('animation')) {
      features.push({
        endIndex: node.prop.length,
        id: `selectors.before.animation_and_transition_support`,
        index: 0,
        name: `CSS animation for "::before" pseudo-element`,
        node,
      });
    }
  });

  return features;
}
