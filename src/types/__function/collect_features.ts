import type { Feature } from '~/types';

type Params = {
  functionName: string;
  node: import('postcss-value-parser').FunctionNode;
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ functionName, node, parent }: Params): Promise<Feature[]> {
  const promises: Promise<Feature[]>[] = [];

  switch (functionName) {
    case 'attr': {
      promises.push(
        import('~/types/attr/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ node, parent });
        }),
      );
      break;
    }
    case 'calc': {
      promises.push(
        import('~/types/calc/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ node, parent });
        }),
      );
      break;
    }
    case 'hsl': {
      promises.push(
        import('~/types/color/__alpha_parameter/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ node, parent });
        }),
      );
      promises.push(
        import('~/types/color/__space_separated_parameters/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ node, parent });
        }),
      );
      break;
    }
    case 'hsla': {
      promises.push(
        import('~/types/color/__space_separated_parameters/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ node, parent });
        }),
      );
      break;
    }
    case 'rgb': {
      promises.push(
        import('~/types/color/__alpha_parameter/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ node, parent });
        }),
      );
      promises.push(
        import('~/types/color/__space_separated_parameters/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ node, parent });
        }),
      );
      promises.push(
        import('~/types/color/__float_values/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ node, parent });
        }),
      );
      break;
    }
    case 'rgba': {
      promises.push(
        import('~/types/color/__space_separated_parameters/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ node, parent });
        }),
      );
      promises.push(
        import('~/types/color/__float_values/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ node, parent });
        }),
      );
      break;
    }
    case 'steps': {
      promises.push(
        import('~/types/easing-function/steps/jump/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ node, parent });
        }),
      );
      break;
    }
    case 'conic-gradient': {
      promises.push(
        import('~/types/image/gradient/conic-gradient/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ node, parent });
        }),
      );
      break;
    }
    case 'linear-gradient':
    case 'repeating-linear-gradient': {
      promises.push(
        import('~/types/image/gradient/__linear-gradient/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ node, parent });
        }),
      );
      break;
    }
    case 'radial-gradient':
    case 'repeating-radial-gradient': {
      promises.push(
        import('~/types/image/gradient/__radial-gradient/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ node, parent });
        }),
      );
      break;
    }
  }

  const features = (await Promise.all(promises)).flat();
  return features;
}
