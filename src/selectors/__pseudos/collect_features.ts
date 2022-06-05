import { isPseudoElement } from 'postcss-selector-parser';

import { pseudoSelectorNameSet } from '~/selectors/__pseudos/pseudo_selector_name_set';
import type { Feature } from '~/types';

const PSEUDO_TYPE_CLASS = 'pseudo-class';
const PSEUDO_TYPE_ELEMENT = 'pseudo-element';

type Params = {
  node: import('postcss-selector-parser').Pseudo;
  parent: import('postcss').Rule;
};

export async function collectFeatures({ node, parent }: Params): Promise<Feature[]> {
  const promises: Promise<Feature[]>[] = [];

  const pseudoType = isPseudoElement(node) ? PSEUDO_TYPE_ELEMENT : PSEUDO_TYPE_CLASS;

  const index = node.sourceIndex;
  const endIndex = index + node.toString().length;

  const [, vendorPrefix] = /^::?(-(?:webkit|moz|ms|o)-)/.exec(node.value) ?? [];

  const selector = node.value;
  const id = selector.replace(/^::?/, '');

  if (pseudoSelectorNameSet.has(id)) {
    promises.push(
      Promise.resolve([
        {
          endIndex,
          id: `selectors.${id}`,
          index,
          name: `"${selector}" ${pseudoType}`,
          node: parent,
        },
      ]),
    );
  } else if (vendorPrefix != null) {
    const selector = node.value.replace(vendorPrefix, '');
    const id = selector.replace(/^::?/, '');

    if (pseudoSelectorNameSet.has(id)) {
      promises.push(
        Promise.resolve([
          {
            endIndex,
            id: `selectors.${id}`,
            index,
            name: `"${selector}" ${pseudoType}`,
            node: parent,
            prefix: vendorPrefix,
          },
        ]),
      );
    }
  }

  switch (id) {
    case 'active': {
      promises.push(
        import('~/selectors/active/non_a_elements/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ node, parent });
        }),
      );
      break;
    }
    case 'after': {
      promises.push(
        import('~/selectors/after/animation_and_transition_support/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ node, parent });
        }),
      );
      break;
    }
    case 'backdrop': {
      promises.push(
        import('~/selectors/backdrop/dialog/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ node, parent });
        }),
      );
      break;
    }
    case 'before': {
      promises.push(
        import('~/selectors/before/animation_and_transition_support/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ node, parent });
        }),
      );
      break;
    }
    case 'cue': {
      promises.push(
        import('~/selectors/cue/selector_argument/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ node, parent });
        }),
      );
      break;
    }
    case 'host': {
      promises.push(
        import('~/selectors/hostfunction/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ node, parent });
        }),
      );
      break;
    }
    case 'hover': {
      promises.push(
        import('~/selectors/hover/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ node, parent });
        }),
      );
      break;
    }
    case 'invalid': {
      promises.push(
        import('~/selectors/invalid/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ node, parent });
        }),
      );
      break;
    }
    case 'marker': {
      promises.push(
        import('~/selectors/marker/animation_and_transition_support/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ node, parent });
        }),
      );
      break;
    }
    case 'not': {
      promises.push(
        import('~/selectors/not/selector_list/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ node, parent });
        }),
      );
      break;
    }
    case 'nth-child': {
      promises.push(
        import('~/selectors/nth-child/of_syntax/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ node, parent });
        }),
      );
      break;
    }
    case 'nth-last-child': {
      promises.push(
        import('~/selectors/nth-last-child/of_syntax/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ node, parent });
        }),
      );
      break;
    }
    case 'valid': {
      promises.push(
        import('~/selectors/valid/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ node, parent });
        }),
      );
      break;
    }
  }

  const features = (await Promise.all(promises)).flat();
  return features;
}
