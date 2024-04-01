import { propertyNameSet } from '~/properties/property_name_set';
import type { Feature } from '~/types';

type Params = {
  ignoreFeatures: Set<string>;
  node: import('postcss').Declaration;
  valueRoot: import('postcss-value-parser').ParsedValue;
};

export async function collectFeatures({ node, valueRoot }: Params): Promise<Feature[]> {
  const promises: Promise<Feature[]>[] = [];

  const [vendorPrefix] = /^-(webkit|moz|ms|o)-/.exec(node.prop) ?? [];

  if (propertyNameSet.has(node.prop)) {
    promises.push(
      Promise.resolve([
        {
          endIndex: node.prop.length,
          id: `properties.${node.prop}`,
          index: 0,
          name: `"${node.prop}" property`,
          node,
        },
      ]),
    );
  } else if (vendorPrefix != null) {
    const prop = node.prop.replace(vendorPrefix, '');

    if (propertyNameSet.has(prop)) {
      promises.push(
        Promise.resolve([
          {
            endIndex: node.prop.length,
            id: `properties.${prop}`,
            index: 0,
            name: `"${prop}" property`,
            node: node,
            prefix: vendorPrefix,
          },
        ]),
      );
    }
  }

  const normalizedProps = propertyNameSet.has(node.prop) ? node.prop : node.prop.replace(/^-(webkit|moz|ms|o)-/, '');

  switch (normalizedProps) {
    case '-moz-orient': {
      promises.push(
        import('~/properties/-moz-orient/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ nodes: valueRoot.nodes, parent: node });
        }),
      );
      break;
    }
    case '-moz-user-input': {
      promises.push(
        import('~/properties/-moz-user-input/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ nodes: valueRoot.nodes, parent: node });
        }),
      );
      break;
    }
    case 'animation': {
      promises.push(
        import('~/properties/animation-direction/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ nodes: valueRoot.nodes, parent: node });
        }),
      );
      promises.push(
        import('~/properties/animation-timing-function/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ nodes: valueRoot.nodes, parent: node });
        }),
      );
      break;
    }
    case 'animation-direction': {
      promises.push(
        import('~/properties/animation-direction/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ nodes: valueRoot.nodes, parent: node });
        }),
      );
      break;
    }
    case 'animation-timing-function': {
      promises.push(
        import('~/properties/animation-timing-function/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ nodes: valueRoot.nodes, parent: node });
        }),
      );
      break;
    }
    case 'align-content': {
      promises.push(
        import('~/properties/align-content/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ nodes: valueRoot.nodes, parent: node });
        }),
      );
      break;
    }
    case 'align-items': {
      promises.push(
        import('~/properties/align-items/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ nodes: valueRoot.nodes, parent: node });
        }),
      );
      break;
    }
    case 'align-self': {
      promises.push(
        import('~/properties/align-self/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ nodes: valueRoot.nodes, parent: node });
        }),
      );
      break;
    }
    case 'appearance': {
      promises.push(
        import('~/properties/appearance/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ nodes: valueRoot.nodes, parent: node });
        }),
      );
      break;
    }
    case 'background': {
      promises.push(
        import('~/properties/background/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ nodes: valueRoot.nodes, parent: node });
        }),
      );
      break;
    }
    case 'background-attachment': {
      promises.push(
        import('~/properties/background-attachment/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ nodes: valueRoot.nodes, parent: node });
        }),
      );
      break;
    }
    case 'background-clip': {
      promises.push(
        import('~/properties/background-clip/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ nodes: valueRoot.nodes, parent: node });
        }),
      );
      break;
    }
    case 'background-image': {
      promises.push(
        import('~/properties/background-image/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ nodes: valueRoot.nodes, parent: node });
        }),
      );
      break;
    }
    case 'background-origin': {
      promises.push(
        import('~/properties/background-origin/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ nodes: valueRoot.nodes, parent: node });
        }),
      );
      break;
    }
    case 'background-position': {
      promises.push(
        import('~/properties/background-position/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ nodes: valueRoot.nodes, parent: node });
        }),
      );
      break;
    }
    case 'background-repeat': {
      promises.push(
        import('~/properties/background-repeat/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ nodes: valueRoot.nodes, parent: node });
        }),
      );
      break;
    }
    case 'background-size': {
      promises.push(
        import('~/properties/background-size/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ nodes: valueRoot.nodes, parent: node });
        }),
      );
      break;
    }
    case 'block-size': {
      promises.push(
        import('~/properties/block-size/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ nodes: valueRoot.nodes, parent: node });
        }),
      );
      break;
    }
    case 'border-bottom-left-radius': {
      promises.push(
        import('~/properties/border-bottom-left-radius/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ nodes: valueRoot.nodes, parent: node });
        }),
      );
      break;
    }
    case 'border-bottom-right-radius': {
      promises.push(
        import('~/properties/border-bottom-right-radius/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ nodes: valueRoot.nodes, parent: node });
        }),
      );
      break;
    }
    case 'border-top-left-radius': {
      promises.push(
        import('~/properties/border-top-left-radius/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ nodes: valueRoot.nodes, parent: node });
        }),
      );
      break;
    }
    case 'border-top-right-radius': {
      promises.push(
        import('~/properties/border-top-right-radius/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ nodes: valueRoot.nodes, parent: node });
        }),
      );
      break;
    }
    case 'border-radius': {
      promises.push(
        import('~/properties/border-radius/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ nodes: valueRoot.nodes, parent: node });
        }),
      );
      break;
    }
    case 'box-shadow': {
      promises.push(
        import('~/properties/box-shadow/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ nodes: valueRoot.nodes, parent: node });
        }),
      );
      break;
    }
    case 'box-sizing': {
      promises.push(
        import('~/properties/box-sizing/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ nodes: valueRoot.nodes, parent: node });
        }),
      );
      break;
    }
    case 'caption-side': {
      promises.push(
        import('~/properties/caption-side/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ nodes: valueRoot.nodes, parent: node });
        }),
      );
      break;
    }
    case 'clear': {
      promises.push(
        import('~/properties/clear/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ nodes: valueRoot.nodes, parent: node });
        }),
      );
      break;
    }
    case 'clip-path': {
      promises.push(
        import('~/properties/clip-path/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ nodes: valueRoot.nodes, parent: node });
        }),
      );
      break;
    }
    case 'color-scheme': {
      promises.push(
        import('~/properties/color-scheme/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ nodes: valueRoot.nodes, parent: node });
        }),
      );
      break;
    }
    case 'justify-content': {
      promises.push(
        import('~/properties/justify-content/collect_features').then(({ collectFeatures }) => {
          return collectFeatures({ nodes: valueRoot.nodes, parent: node });
        }),
      );
      break;
    }
    default: {
      // TODO...
    }
  }

  const features = (await Promise.all(promises)).flat();
  return features;
}
