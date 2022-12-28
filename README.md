# stylelint-browser-compat

![stylelint-browser-compat](https://raw.githubusercontent.com/3846masa/stylelint-browser-compat/develop/docs/assets/ogp.png)

[![github sponsors](https://flat.badgen.net/badge/GitHub%20Sponsors/Support%20me%20%E2%9D%A4/ff69b4?icon=github)](https://github.com/sponsors/3846masa)
[![npm](https://flat.badgen.net/npm/v/stylelint-browser-compat)](https://www.npmjs.com/package/stylelint-browser-compat)
[![license](https://flat.badgen.net/badge/license/MIT/blue)](LICENSE)
[![standard-readme compliant](https://flat.badgen.net/badge/readme%20style/standard/green)](https://github.com/RichardLitt/standard-readme)

Yet another linter rule to detect compatibility of CSS features.

This plugin checks if the CSS you're using is supported by the browsers you're targeting.
It uses [@mdn/browser-compat-data](https://github.com/mdn/browser-compat-data) to detect browser support.

**:warning: This plugin is beta. USE AT YOUR OWN RISK.**

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Background

`stylelint-no-unsupported-browser-features` (using `doiuse`) is available to detect compatibility of CSS features.

However, `doiuse` have not been maintained for a long time.

This library provides another alternative to detect compatibility of CSS features.

Although `doiuse` detects compatibility from `caniuse` data, this library uses `@mdn/browser-compat-data` to do so.

## Install

```bash
$ npm install --dev browserslist stylelint stylelint-browser-compat
```

```bash
$ yarn add --dev browserslist stylelint stylelint-browser-compat
```

## Usage

```js
module.exports = {
  plugins: ['stylelint-browser-compat'],
  rules: {
    'plugin/browser-compat': [
      true,
      {
        allow: {
          features: ['at-rules.supports'],
          flagged: false,
          partialImplementation: false,
          prefix: true,
        },
        browserslist: ['last 2 versions'],
      },
    ],
  },
};
```

### Options

- `browserslist` (string or array, optional)
  - Accepts [browserslist queries](https://github.com/browserslist/browserslist#queries) for target browsers.
  - By default, browserslist automatically loads the configuration file (e.g. `package.json`, `.browserslistrc`).
- `allow.features` (array, optional)
  - Accepts an array of features to allow.
  - Feature names are from [@mdn/browser-compat-data](https://github.com/mdn/browser-compat-data).
    - For example, if you want to use `@supports` at-rules, pass `at-rules.supports`.
- `allow.flagged` (boolean, optional)
  - Allows features that are available when the browser's feature flags is enabled.
  - `false` by default
- `allow.partialImplementation` (boolean, optional)
  - Allows features that are partial implementations.
  - `false` by default
- `allow.prefix` (boolean, optional)
  - Allows features with vendor prefix.
  - `true` by default

## Contributing

PRs accepted.

## License

[MIT (c) 3846masa](https://3846masa.mit-license.org/)
