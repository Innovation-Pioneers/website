import React from 'react';
import { Element } from 'react-scroll';

import Block from '../../Block';
import Sitewidth from '../../Sitewidth';
import InstagramFeed from '../../InstagramFeed';

function Gallery({ gallery, lang }) {
  return (
    <Block pt={[4, 5]} pb={[6, 7]}>
      <Element name="gallery" />
      <Sitewidth>
        <InstagramFeed gallery={gallery} lang={lang} />
      </Sitewidth>
    </Block>
  );
}

export default Gallery;
