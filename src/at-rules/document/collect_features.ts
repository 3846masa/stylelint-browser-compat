import type { Feature } from '~/types';

type Params = {
  ignoreFeatures: Set<string>;
  node: import('postcss').AtRule;
};

export async function collectFeatures({ ignoreFeatures, node }: Params): Promise<Feature[]> {
  const promises: Promise<Feature[]>[] = [];

  promises.push(
    import('~/collect_features').then(({ collectFeatures }) => {
      return collectFeatures({ container: node, ignoreFeatures });
    }),
  );

  const features: Feature[] = (await Promise.all(promises)).flat();
  return features;
}
