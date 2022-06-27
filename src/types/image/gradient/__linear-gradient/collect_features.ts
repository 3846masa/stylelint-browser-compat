import type { Feature } from '~/types';

type Params = {
  node: import('postcss-value-parser').FunctionNode;
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ node, parent }: Params): Promise<Feature[]> {
  const funcName = node.value.replace(/^-(?:ms|o|webkit|moz)-/, '');
  if (funcName !== 'linear-gradient' && funcName !== 'repeating-linear-gradient') {
    return [];
  }

  const promises: Promise<Feature[]>[] = [];

  const colorStopList: import('postcss-value-parser').Node[][] = [[]];

  for (const chlid of node.nodes) {
    if (chlid.type === 'div' && chlid.value === ',') {
      colorStopList.push([]);
    } else {
      const colorStop = colorStopList.at(-1);
      colorStop?.push(chlid);
    }
  }

  for (const [colorStopIndex, colorStop] of colorStopList.entries()) {
    promises.push(
      import('~/types/image/gradient/__linear-gradient/doubleposition/collect_features').then(({ collectFeatures }) => {
        return collectFeatures({ colorStop, node, parent });
      }),
    );
    promises.push(
      import('~/types/image/gradient/__linear-gradient/interpolation_hints/collect_features').then(
        ({ collectFeatures }) => {
          return collectFeatures({ colorStop, colorStopIndex, node, parent });
        },
      ),
    );
    promises.push(
      import('~/types/image/gradient/__linear-gradient/to/collect_features').then(({ collectFeatures }) => {
        return collectFeatures({ colorStop, node, parent });
      }),
    );
    promises.push(
      import('~/types/image/gradient/__linear-gradient/unitless_0_angle/collect_features').then(
        ({ collectFeatures }) => {
          return collectFeatures({ colorStop, colorStopIndex, node, parent });
        },
      ),
    );
  }

  const features = (await Promise.all(promises)).flat();
  return features;
}
