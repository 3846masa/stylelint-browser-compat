/* eslint-disable sort/object-properties */
import { stripIndent } from 'common-tags';
import { getTestRule } from 'jest-preset-stylelint';

import { messages, ruleName } from '~/rule';

const testRule = getTestRule({
  plugins: [require.resolve('~/index')],
});

testRule({
  ruleName,
  config: [
    true,
    {
      allow: {
        features: ['properties.appearance'],
      },
      browserslist: 'opera 12.1',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          appearance: searchfield;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('"searchfield" value specified as appearance', 'Opera 12.1', ''),
    },
    {
      code: stripIndent`
        #id {
          appearance: textarea;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 23,
      message: messages.rejected('"textarea" value specified as appearance', 'Opera 12.1', ''),
    },
    {
      code: stripIndent`
        #id {
          appearance: push-button;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('"push-button" value specified as appearance', 'Opera 12.1', ''),
    },
    {
      code: stripIndent`
        #id {
          appearance: slider-horizontal;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 32,
      message: messages.rejected('"slider-horizontal" value specified as appearance', 'Opera 12.1', ''),
    },
    {
      code: stripIndent`
        #id {
          appearance: checkbox;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 23,
      message: messages.rejected('"checkbox" value specified as appearance', 'Opera 12.1', ''),
    },
    {
      code: stripIndent`
        #id {
          appearance: radio;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 20,
      message: messages.rejected('"radio" value specified as appearance', 'Opera 12.1', ''),
    },
    {
      code: stripIndent`
        #id {
          appearance: square-button;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 28,
      message: messages.rejected('"square-button" value specified as appearance', 'Opera 12.1', ''),
    },
    {
      code: stripIndent`
        #id {
          appearance: menulist;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 23,
      message: messages.rejected('"menulist" value specified as appearance', 'Opera 12.1', ''),
    },
    {
      code: stripIndent`
        #id {
          appearance: listbox;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 22,
      message: messages.rejected('"listbox" value specified as appearance', 'Opera 12.1', ''),
    },
    {
      code: stripIndent`
        #id {
          appearance: meter;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 20,
      message: messages.rejected('"meter" value specified as appearance', 'Opera 12.1', ''),
    },
    {
      code: stripIndent`
        #id {
          appearance: progress-bar;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 27,
      message: messages.rejected('"progress-bar" value specified as appearance', 'Opera 12.1', ''),
    },
    {
      code: stripIndent`
        #id {
          appearance: button;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 21,
      message: messages.rejected('"button" value specified as appearance', 'Opera 12.1', ''),
    },
  ],
});
