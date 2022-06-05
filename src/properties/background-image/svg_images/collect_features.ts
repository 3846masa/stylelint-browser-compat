import path from 'node:path';

import { Result } from 'ts-results';

import type { Feature } from '~/types';

type Params = {
  nodes: import('postcss-value-parser').Node[];
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ nodes, parent }: Params): Promise<Feature[]> {
  const prop = parent.prop.replace(/^-(webkit|moz|ms|o)-/, '');
  if (prop !== 'background' && prop !== 'background-image') {
    return [];
  }

  const features: Feature[] = [];

  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);

  for (const node of nodes) {
    if (node.type !== 'function' || node.value !== 'url' || node.nodes.length !== 1 || node.nodes[0] == null) {
      continue;
    }

    const urlPathNode = node.nodes[0];
    const url = Result.wrap(() => new URL(urlPathNode.value, 'https://example.com/')).unwrapOr(null);

    if (url == null || (url.protocol !== 'http:' && url.protocol !== 'https:')) {
      continue;
    }

    const extension = path.extname(url.pathname);

    if (extension === '.svg') {
      const index = offset + urlPathNode.sourceIndex;
      const endIndex = offset + urlPathNode.sourceEndIndex;

      features.push({
        endIndex,
        id: `properties.background-image.svg_images`,
        index,
        name: `SVG image as background-image`,
        node: parent,
      });
    }
  }

  return features;
}
