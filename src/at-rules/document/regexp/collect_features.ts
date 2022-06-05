import type { Feature } from '~/types';

type Params = {
  node: import('postcss-value-parser').Node;
  parent: import('postcss').AtRule;
};

export async function collectFeatures({ node, parent }: Params): Promise<Feature[]> {
  const features: Feature[] = [];

  if (node.type === 'function' && node.value === 'regexp') {
    const offset = `@${parent.name}`.length + (parent.raws.afterName?.length ?? 0);
    const index = offset + node.sourceIndex;
    const endIndex = offset + node.sourceEndIndex;

    features.push({
      endIndex,
      id: `at-rules.document.regexp`,
      index,
      name: `"regexp()" function of the @document`,
      node: parent,
    });
  }

  return features;
}
