declare module 'postcss-media-query-parser' {
  type NodeType =
    | 'media-query-list'
    | 'url'
    | 'media-query'
    | 'media-type'
    | 'keyword'
    | 'media-feature-expression'
    | 'media-feature'
    | 'colon'
    | 'value';

  export type Container = Node & {
    each(callback: (node: Node, i: number, nodes: Node[]) => boolean | undefined): void;
    nodes: (Node | Container)[];
    walk(callback: (node: Node, i: number, nodes: Node[]) => boolean | undefined): void;
    walk(filter: string | RegExp, callback: (node: Node, i: number, nodes: Node[]) => boolean | undefined): void;
  };

  export type Node = {
    after: string;
    before: string;
    parent?: Node;
    sourceIndex: number;
    type: NodeType;
    value: string;
  };

  const parser: (query: string) => Container;

  export default parser;
}
