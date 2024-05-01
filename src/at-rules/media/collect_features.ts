import mediaParser from 'postcss-media-query-parser';
import valueParser, { unit } from 'postcss-value-parser';

import { mediaFeatureNameMap } from './media_feature_name_map';

import type { Feature } from '~/types';

type Params = {
  ignoreFeatures: Set<string>;
  node: import('postcss').AtRule;
};

const RANGE_OPERATOR_SET = new Set(['>=', '<=', '>', '<', '=']);

/* https://github.com/stylelint/stylelint/blob/f48c1d1518d6429c7516ae73f3d81e452f57287a/lib/utils/isRangeContextMediaFeature.js */
function isRangeContextMediaFeature(mediaFeature: string) {
  return mediaFeature.includes('=') || mediaFeature.includes('<') || mediaFeature.includes('>');
}

export async function collectFeatures({ ignoreFeatures, node }: Params): Promise<Feature[]> {
  const promises: Promise<Feature[]>[] = [];

  const mediaRoot = mediaParser(node.params);

  mediaRoot.walk('media-feature', (mediaFeatureNode): undefined => {
    const parent = mediaFeatureNode.parent;
    const mediaFeatureRangeContext = isRangeContextMediaFeature(parent?.value ?? '');

    let mediaFeature: null | { name: string; sourceIndex: number } = null;

    if (mediaFeatureRangeContext) {
      const valueRoot = valueParser(mediaFeatureNode.value);
      for (const node of valueRoot.nodes) {
        if (node.type !== 'word' || RANGE_OPERATOR_SET.has(node.value) || unit(node.value) !== false) {
          continue;
        }
        mediaFeature = {
          name: node.value,
          sourceIndex: mediaFeatureNode.sourceIndex + node.sourceIndex,
        };
      }
    } else {
      mediaFeature = {
        name: mediaFeatureNode.value,
        sourceIndex: mediaFeatureNode.sourceIndex,
      };
    }

    if (mediaFeature == null) {
      return;
    }

    const [vendorPrefix] = /^-(webkit|moz|ms|o)-/.exec(mediaFeature.name) ?? [];
    const offset = `@${node.name}${node.raws.afterName ?? ''}`.length;

    if (mediaFeatureRangeContext) {
      const index = offset + mediaFeatureNode.sourceIndex;
      const endIndex = index + mediaFeatureNode.value.length;

      promises.push(
        Promise.resolve([
          {
            endIndex,
            id: `at-rules.media.range_syntax`,
            index,
            name: `Range syntax for media queries`,
            node,
          },
        ]),
      );
    }

    const featureId = mediaFeatureNameMap.get(mediaFeature.name);
    if (featureId != null) {
      const index = offset + mediaFeature.sourceIndex;
      const endIndex = index + mediaFeature.name.length;

      promises.push(
        Promise.resolve([
          {
            endIndex,
            id: featureId,
            index,
            name: `"${mediaFeature.name}" media feature`,
            node,
          },
        ]),
      );
    } else if (vendorPrefix != null) {
      const mediaFeatureName = mediaFeature.name.replace(vendorPrefix, '');
      const featureId = mediaFeatureNameMap.get(mediaFeature.name);

      if (featureId != null) {
        const index = offset + mediaFeature.sourceIndex;
        const endIndex = index + mediaFeature.name.length;

        promises.push(
          Promise.resolve([
            {
              endIndex,
              id: featureId,
              index,
              name: `"${mediaFeatureName}" media feature`,
              node,
              prefix: vendorPrefix,
            },
          ]),
        );
      }
    }
  });

  promises.push(
    import('~/collect_features').then(({ collectFeatures }) => {
      return collectFeatures({ container: node, ignoreFeatures });
    }),
  );

  const features: Feature[] = (await Promise.all(promises)).flat();
  return features;
}
