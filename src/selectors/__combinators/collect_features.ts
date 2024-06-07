import type { Feature } from '~/types';

type Params = {
  node: import('postcss-selector-parser').Combinator;
  parent: import('postcss').Rule;
};

export async function collectFeatures({ node, parent }: Params): Promise<Feature[]> {
  const features: Feature[] = [];

  const index = node.sourceIndex;
  const endIndex = index + node.value.length;

  switch (node.value) {
    case '+': {
      features.push({
        endIndex,
        id: `selectors.next-sibling`,
        index,
        name: `Next-sibling combinator`,
        node: parent,
      });
      break;
    }
    case '>': {
      features.push({
        endIndex,
        id: `selectors.child`,
        index,
        name: `Child combinator`,
        node: parent,
      });
      break;
    }
    case '||': {
      features.push({
        endIndex,
        id: `selectors.column`,
        index,
        name: `Column combinator`,
        node: parent,
      });
      break;
    }
    case ' ': {
      features.push({
        endIndex,
        id: `selectors.descendant`,
        index,
        name: `Descendant combinator`,
        node: parent,
      });
      break;
    }
    case '>>': {
      features.push({
        endIndex,
        id: `selectors.descendant.two_greater_than_syntax`,
        index,
        name: `">>" syntax for descendant combinator`,
        node: parent,
      });
      break;
    }
    case '~': {
      features.push({
        endIndex,
        id: `selectors.subsequent-sibling`,
        index,
        name: `Subsequent-sibling combinator`,
        node: parent,
      });
      break;
    }
  }

  return features;
}
