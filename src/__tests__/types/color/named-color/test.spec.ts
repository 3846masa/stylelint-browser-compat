/* eslint-disable sort/object-properties */
import { stripIndent } from 'common-tags';
import { getTestRule } from 'jest-preset-stylelint';

import { plugin, ruleName } from '~/rule';

const testRule = getTestRule({
  plugins: [plugin],
});

testRule({
  ruleName,
  config: [
    true,
    {
      allow: {
        features: ['properties.color'],
      },
      browserslist: '>= 0%',
    },
  ],
  accept: [
    {
      code: stripIndent`
        #id {
          color: aliceblue;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: antiquewhite;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: aqua;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: aquamarine;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: azure;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: beige;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: bisque;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: black;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: blanchedalmond;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: blue;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: blueviolet;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: brown;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: burlywood;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: cadetblue;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: chartreuse;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: chocolate;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: coral;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: cornflowerblue;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: cornsilk;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: crimson;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: cyan;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: darkblue;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: darkcyan;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: darkgoldenrod;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: darkgray;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: darkgreen;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: darkgrey;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: darkkhaki;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: darkmagenta;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: darkolivegreen;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: darkorange;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: darkorchid;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: darkred;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: darksalmon;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: darkseagreen;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: darkslateblue;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: darkslategray;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: darkslategrey;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: darkturquoise;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: darkviolet;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: deeppink;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: deepskyblue;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: dimgray;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: dimgrey;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: dodgerblue;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: firebrick;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: floralwhite;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: forestgreen;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: fuchsia;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: gainsboro;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: ghostwhite;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: gold;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: goldenrod;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: gray;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: green;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: greenyellow;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: grey;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: honeydew;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: hotpink;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: indianred;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: indigo;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: ivory;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: khaki;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: lavender;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: lavenderblush;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: lawngreen;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: lemonchiffon;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: lightblue;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: lightcoral;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: lightcyan;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: lightgoldenrodyellow;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: lightgray;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: lightgreen;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: lightgrey;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: lightpink;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: lightsalmon;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: lightseagreen;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: lightskyblue;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: lightslategray;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: lightslategrey;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: lightsteelblue;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: lightyellow;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: lime;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: limegreen;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: linen;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: magenta;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: maroon;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: mediumaquamarine;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: mediumblue;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: mediumorchid;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: mediumpurple;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: mediumseagreen;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: mediumslateblue;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: mediumspringgreen;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: mediumturquoise;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: mediumvioletred;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: midnightblue;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: mintcream;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: mistyrose;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: moccasin;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: navajowhite;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: navy;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: oldlace;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: olive;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: olivedrab;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: orange;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: orangered;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: orchid;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: palegoldenrod;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: palegreen;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: paleturquoise;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: palevioletred;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: papayawhip;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: peachpuff;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: peru;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: pink;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: plum;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: powderblue;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: purple;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: red;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: rosybrown;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: royalblue;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: saddlebrown;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: salmon;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: sandybrown;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: seagreen;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: seashell;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: sienna;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: silver;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: skyblue;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: slateblue;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: slategray;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: slategrey;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: snow;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: springgreen;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: steelblue;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: tan;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: teal;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: thistle;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: tomato;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: turquoise;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: violet;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: wheat;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: white;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: whitesmoke;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: yellow;
        }
      `,
    },
    {
      code: stripIndent`
        #id {
          color: yellowgreen;
        }
      `,
    },
  ],
});
