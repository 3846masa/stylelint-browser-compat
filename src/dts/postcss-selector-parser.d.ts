import 'postcss-selector-parser';

declare module 'postcss-selector-parser' {
  declare namespace parser {
    interface Attribute {
      raws: {
        insensitiveFlag?: string;
        value?: string;
      };
    }

    // eslint-disable-next-line no-undef
    interface Universal extends Namespace {
      type: 'universal';
    }
  }

  export = parser;
}
