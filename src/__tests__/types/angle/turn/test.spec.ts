/* eslint-disable sort/object-properties */
import { stripIndent } from 'common-tags';
import { getTestRule } from 'jest-preset-stylelint';

import { messages, plugin, ruleName } from '~/rule';

const testRule = getTestRule({
  plugins: [plugin],
});

testRule({
  ruleName,
  config: [
    true,
    {
      allow: {
        features: ['properties.transform', 'properties.transform-function.rotate', 'types.transform-function.rotate'],
      },
      browserslist: 'ie 8',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          transform: rotate(1.75turn);
        }
      `,
      line: 2,
      column: 25,
      endLine: 2,
      endColumn: 29,
      message: messages.rejected('"turn" unit', 'IE 8', 'https://developer.mozilla.org/docs/Web/CSS/angle#turn'),
    },
  ],
});
