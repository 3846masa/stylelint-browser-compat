import type { Feature } from '~/types';

const REPEAT_SINGLE_KEYWORD_LIST = ['repeat-x', 'repeat-y'];
const REPEAT_GENERAL_KEYWORD_LIST = ['repeat', 'space', 'round', 'no-repeat'];
const REPEAT_KEYWORD_LIST = [...REPEAT_SINGLE_KEYWORD_LIST, ...REPEAT_GENERAL_KEYWORD_LIST];

type Params = {
  nodes: import('postcss-value-parser').Node[];
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ nodes, parent }: Params): Promise<Feature[]> {
  const prop = parent.prop.replace(/^-(webkit|moz|ms|o)-/, '');
  if (prop !== 'background' && prop !== 'background-repeat') {
    return [];
  }

  const promises: Promise<Feature[]>[] = [];
  const features: Feature[] = [];

  const bgRepeatList: import('postcss-value-parser').Node[][] = [[]];

  for (const node of nodes) {
    if (node.type === 'div' && node.value === ',') {
      bgRepeatList.push([]);
    } else {
      const bgRepeat = bgRepeatList.at(-1);
      bgRepeat?.push(node);
    }
  }

  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);

  if (bgRepeatList.length >= 2) {
    const index = offset;
    const endIndex = offset + parent.value.length;

    features.push({
      endIndex,
      id: `properties.background-repeat.multiple_backgrounds`,
      index,
      name: `Multiple backgrounds`,
      node: parent,
    });
  }

  for (const bgRepeat of bgRepeatList) {
    for (let idx = 0; idx < bgRepeat.length; idx++) {
      const first = bgRepeat[idx];
      const second = bgRepeat[idx + 2];

      if (first?.type !== 'word' || !REPEAT_KEYWORD_LIST.includes(first.value)) {
        continue;
      }

      if (!REPEAT_GENERAL_KEYWORD_LIST.includes(first.value)) {
        break;
      }

      if (second?.type === 'word' && REPEAT_GENERAL_KEYWORD_LIST.includes(second.value)) {
        const index = offset + first.sourceIndex;
        const endIndex = offset + second.sourceEndIndex;

        features.push({
          endIndex,
          id: `properties.background-repeat.2-value`,
          index,
          name: `Different values for x & y directions specified as background-repeat`,
          node: parent,
        });

        promises.push(
          import('~/properties/background-repeat/round_space/collect_features').then(({ collectFeatures }) => {
            return collectFeatures({ nodes: [first, second], parent });
          }),
        );
        break;
      } else {
        promises.push(
          import('~/properties/background-repeat/round_space/collect_features').then(({ collectFeatures }) => {
            return collectFeatures({ nodes: [first], parent });
          }),
        );
        break;
      }
    }
  }

  return [...features, ...(await Promise.all(promises)).flat()];
}
