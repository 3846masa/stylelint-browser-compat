import type { Feature } from '~/types';

const BOX_VALUE_LIST = ['border-box', 'padding-box', 'content-box', 'text'];

type Params = {
  bgLayerList: import('postcss-value-parser').Node[][];
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ bgLayerList, parent }: Params): Promise<Feature[]> {
  const prop = parent.prop.replace(/^-(webkit|moz|ms|o)-/, '');
  if (prop !== 'background') {
    return [];
  }

  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);

  const promises: Promise<Feature[]>[] = [];
  const features: Feature[] = [];

  // background-origin / background-clip
  for (const bgLayer of bgLayerList) {
    const boxList = bgLayer.filter((node) => BOX_VALUE_LIST.includes(node.value));

    // https://drafts.csswg.org/css-backgrounds/#the-background
    // If one <box> value is present then it sets both background-origin and background-clip to that value
    // If two values are present, then the first sets background-origin and the second background-clip.
    const backgroundOriginNode = boxList[0];

    if (backgroundOriginNode != null) {
      const index = offset + backgroundOriginNode.sourceIndex;
      const endIndex = offset + backgroundOriginNode.sourceEndIndex;

      features.push({
        endIndex,
        id: `properties.background.background-origin`,
        index,
        name: `Values of background-origin specified as background`,
        node: parent,
      });
      promises.push(
        import('~/properties/background-origin/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({
            nodes: [backgroundOriginNode],
            parent,
          });
        }),
      );
    }
  }

  return [...features, ...(await Promise.all(promises)).flat()];
}
