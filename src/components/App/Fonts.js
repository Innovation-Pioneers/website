/**
 * Fonts
 * -----
 */

 import React from 'react';
import { FontFaces } from './FontFace';

import GESSTwo300 from '../../assets/fonts/gesstwo/GESSTwo-300.woff';
import GESSTwo400 from '../../assets/fonts/gesstwo/GESSTwo-400.woff';
import GESSTwo500 from '../../assets/fonts/gesstwo/GESSTwo-500.woff';

export const GESSTwo = FontFaces.create(
  [
    { url: GESSTwo300, weight: 300 },
    { url: GESSTwo400, weight: 400 },
    { url: GESSTwo500, weight: 500 },
  ],
  { name: 'GESSTwo' }
);

export default function () {
  return (
    <GESSTwo />
  );
}
