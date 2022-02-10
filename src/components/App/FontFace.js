/* eslint-disable react/no-unused-prop-types */
/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-unstable-nested-components */

/**
 * FontFace
 * --------
 * props:
 *  - name: [string] **required**
 *  - weight: [number] **required**
 *  - url: [string] **required**
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export function renderCss({ name, weight, url } = {}) {
  return [
    '@font-face{',
    `font-family:${name};`,
    `font-weight:${weight};`,
    `src:url(${url});`,
    '}',
  ].join('');
}

export class FontFaces extends PureComponent {
  static create(fontFaces = [], { name, weight } = {}) {
    const parsedFontFaces = fontFaces.map((fontFace) => ({
      name,
      weight,
      ...fontFace,
    }));
    const FontFacesClass = this;
    return () => <FontFacesClass fontFaces={parsedFontFaces} />;
  }

  render() {
    const { fontFaces } = this.props;
    return (
      <style>
        {
          // eslint-disable-next-line react/prop-types
          fontFaces.map((fontFace) => renderCss(fontFace))
        }
      </style>
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
export default class FontFace extends PureComponent {
  render() {
    return <style>{renderCss(this.props)}</style>;
  }
}

FontFace.propTypes = {
  name: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};
