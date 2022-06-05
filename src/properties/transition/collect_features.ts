import type { Feature } from '~/types';

type Params = {
  nodes: import('postcss-value-parser').Node[];
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ nodes, parent }: Params): Promise<Feature[]> {
  const prop = parent.prop.replace(/^-(webkit|moz|ms|o)-/, '');
  if (prop !== 'transition') {
    return [];
  }

  const promises: Promise<Feature[]>[] = [];

  promises.push(
    import('~/properties/transition-property/collect_features').then(({ collectFeatures }) => {
      return collectFeatures({ nodes, parent });
    }),
  );

  const features = (await Promise.all(promises)).flat();

  return features;
}
