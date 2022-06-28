import type { Feature } from '~/types';

type Params = {
  nodes: import('postcss-value-parser').Node[];
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ nodes, parent }: Params): Promise<Feature[]> {
  const prop = parent.prop.replace(/^-(webkit|moz|ms|o)-/, '');
  if (prop !== 'background') {
    return [];
  }

  const promises: Promise<Feature[]>[] = [];

  const bgLayerList: import('postcss-value-parser').Node[][] = [[]];

  for (const node of nodes) {
    if (node.type === 'div' && node.value === ',') {
      bgLayerList.push([]);
    } else {
      const bgLayer = bgLayerList.at(-1);
      bgLayer?.push(node);
    }
  }

  promises.push(
    import('~/properties/background/multiple_backgrounds/collect_features').then(({ collectFeatures }) => {
      return collectFeatures({ nodes, parent });
    }),
  );
  promises.push(
    import('~/properties/background/background-size/collect_features').then(({ collectFeatures }) => {
      return collectFeatures({ bgLayerList, parent });
    }),
  );
  promises.push(
    import('~/properties/background/background-clip/collect_features').then(({ collectFeatures }) => {
      return collectFeatures({ bgLayerList, parent });
    }),
  );
  promises.push(
    import('~/properties/background/background-origin/collect_features').then(({ collectFeatures }) => {
      return collectFeatures({ bgLayerList, parent });
    }),
  );

  for (const bgLayer of bgLayerList) {
    promises.push(
      import('~/properties/background-attachment/collect_features').then(({ collectFeatures }) => {
        return collectFeatures({ nodes: bgLayer, parent });
      }),
    );
    promises.push(
      import('~/properties/background-image/collect_features').then(({ collectFeatures }) => {
        return collectFeatures({ nodes: bgLayer, parent });
      }),
    );
    promises.push(
      import('~/properties/background-position/collect_features').then(({ collectFeatures }) => {
        return collectFeatures({ nodes: bgLayer, parent });
      }),
    );
    promises.push(
      import('~/properties/background-repeat/collect_features').then(({ collectFeatures }) => {
        return collectFeatures({ nodes: bgLayer, parent });
      }),
    );
  }

  const features = (await Promise.all(promises)).flat();

  return features;
}
