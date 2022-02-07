/**
 * Theme
 * -----
 */

import color from 'tinycolor2';
import { rem } from '../utils';

const breakpoints = [
  rem('420px'), rem('768px'), // mobile
  rem('1024px'), rem('1280px'), rem('1680px'), rem('1920px'), // desktop
];

const Sitewidth = '1200px';

// color config
const primary = 'hsl(56, 100%, 50%)';
const secondary = 'hsl(0, 0%, 0%)';
const white = 'hsl(0, 0%, 100%)';
const black = 'hsl(0, 0%, 0%)';

// color mixins
const colors = {
  primary: {
    base: primary,
    shade: [
      color(primary).setAlpha(0.85).toHslString(),
      color(primary).setAlpha(0.60).toHslString(),
      color(primary).setAlpha(0.50).toHslString(),
      color(primary).setAlpha(0.30).toHslString(),
      color(primary).setAlpha(0.10).toHslString(),
      color(primary).setAlpha(0.05).toHslString(),
      color(primary).setAlpha(0.025).toHslString(),
    ],
  },
  secondary: {
    base: secondary,
    shade: [
      color(secondary).setAlpha(0.85).toHslString(),
      color(secondary).setAlpha(0.60).toHslString(),
      color(secondary).setAlpha(0.50).toHslString(),
      color(secondary).setAlpha(0.30).toHslString(),
      color(secondary).setAlpha(0.10).toHslString(),
      color(secondary).setAlpha(0.05).toHslString(),
      color(secondary).setAlpha(0.025).toHslString(),
    ],
  },
  white: {
    base: white,
    shade: [
      color(white).setAlpha(0.85).toHslString(),
      color(white).setAlpha(0.60).toHslString(),
      color(white).setAlpha(0.50).toHslString(),
      color(white).setAlpha(0.30).toHslString(),
      color(white).setAlpha(0.10).toHslString(),
      color(white).setAlpha(0.05).toHslString(),
      color(white).setAlpha(0.025).toHslString(),
    ],
  },
  black: {
    base: black,
    shade: [
      color(black).setAlpha(0.85).toHslString(),
      color(black).setAlpha(0.60).toHslString(),
      color(black).setAlpha(0.50).toHslString(),
      color(black).setAlpha(0.30).toHslString(),
      color(black).setAlpha(0.10).toHslString(),
      color(black).setAlpha(0.05).toHslString(),
      color(black).setAlpha(0.025).toHslString(),
    ],
  },
  button: {
    base: primary,
    shade: [
      color(primary).setAlpha(0.85).toHslString(),
      color(primary).setAlpha(0.60).toHslString(),
      color(primary).setAlpha(0.50).toHslString(),
      color(primary).setAlpha(0.30).toHslString(),
      color(primary).setAlpha(0.10).toHslString(),
      color(primary).setAlpha(0.05).toHslString(),
      color(primary).setAlpha(0.025).toHslString(),
    ],
  },
};

const space = [
  rem(3), rem(5), rem(8), rem(13), rem(21), rem(34),
  rem(55), rem(89), rem(144), rem(233), rem(377), rem(610), rem(120),
];

const fontFamilies = {
  sans: "'Montserrat', 'Avenir Next', 'Helvetica Neue', sans-serif",
  script: "'Times', 'Times New Roman', serif",
};
const fontSizes = [
  rem(14), rem(16), rem(18), rem(20), rem(22), rem(24), rem(26),
  rem(32), rem(34), rem(38), rem(48), rem(78), rem(90), rem(96),
];

const fontWeights = {
  light: 300,
  regular: 400,
  semi: 600,
  bold: 700,
  heavy: 900,
};

const radii = [
  rem(0), rem(2), rem(4), rem(8), rem(16), rem(32),
];

const theme = {
  breakpoints,
  Sitewidth,
  colors,
  space,
  fontFamilies,
  fontSizes,
  fontWeights,
  radii,
  primary,
};

export default theme;
