import color from 'tinycolor2';

// eslint-disable-next-line import/prefer-default-export
export function createColor(primary) {
  return {
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
  };
}
