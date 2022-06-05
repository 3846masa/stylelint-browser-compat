import type { Feature } from '~/types';

type Params = {
  node: import('postcss').AtRule;
};

export async function collectFeatures({ node }: Params): Promise<Feature[]> {
  const features: Feature[] = [];

  node.walkDecls((delc) => {
    const prop = delc.prop.replace(/^-(webkit|moz|ms|o)-/, '');

    switch (prop) {
      case 'clip-path': {
        features.push({
          endIndex: delc.prop.length,
          id: `properties.clip-path.animations`,
          index: 0,
          name: `CSS animation for clip-path`,
          node: delc,
        });
      }
    }
  });

  return features;
}
