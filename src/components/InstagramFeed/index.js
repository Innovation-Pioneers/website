/**
 * Gallery
 * -------
 */

import React from 'react';

import Block from '../Block';

import Grid from './Grid';

const Gallery = React.memo((gallery, lang) => (
  <Block>
    <Grid gallery={gallery} lang={lang} />
  </Block>
));

export default Gallery;
