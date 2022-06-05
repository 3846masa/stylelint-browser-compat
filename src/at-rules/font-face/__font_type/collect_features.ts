import path from 'node:path';

import { Result } from 'ts-results';

import type { Feature } from '~/types';

type Params = {
  node: import('postcss-value-parser').Node;
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ node, parent }: Params): Promise<Feature[]> {
  const features: Feature[] = [];

  if (node.type !== 'function' || node.value !== 'url' || node.nodes.length !== 1 || node.nodes[0] == null) {
    return features;
  }

  const urlPathNode = node.nodes[0];
  const url = Result.wrap(() => new URL(urlPathNode.value, 'https://example.com/')).unwrapOr(null);

  if (url == null || (url.protocol !== 'http:' && url.protocol !== 'https:')) {
    return features;
  }

  const extension = path.extname(url.pathname);

  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);
  const index = offset + urlPathNode.sourceIndex;
  const endIndex = offset + urlPathNode.sourceEndIndex;

  switch (extension.toLowerCase()) {
    case '.svg': {
      features.push({
        endIndex,
        id: `at-rules.font-face.SVG_fonts`,
        index,
        name: `SVG fonts`,
        node: parent,
      });
      break;
    }
    case '.woff': {
      features.push({
        endIndex,
        id: `at-rules.font-face.WOFF`,
        index,
        name: `WOFF`,
        node: parent,
      });
      break;
    }
    case '.woff2': {
      features.push({
        endIndex,
        id: `at-rules.font-face.WOFF_2`,
        index,
        name: `WOFF2`,
        node: parent,
      });
      break;
    }
  }

  return features;
}
