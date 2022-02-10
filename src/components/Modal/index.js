import React from 'react';
import styled, { css } from 'styled-components';
import ReactModal from 'react-modal';

import iconClose from '../../assets/icons/x.svg';

const Wrapper = styled.div`
  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0;
  background: hsla(0, 0%, 5%, 0.8);
  z-index: 999999999;
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 0;
  pointer-events: none;
  transition: opacity 300ms;
  ${(props) => props.isOpen && css`
    opacity: 1;
    pointer-events: all;
    z-index: 9999999999;
  `}
`;

const Close = styled.img`
  position: absolute;
  z-index: 99999999999;
  pointer-events: all;
  top: 25px;
  right: ${({ lang }) => (lang === 'en' ? '25px' : 'auto')};
  left: ${({ lang }) => (lang === 'en' ? 'auto' : '25px')};

  width: 50px;
  height: 50px;
  margin: 5px;
  cursor: pointer;

  transition: opacity 500ms;
  opacity: 1;

  &:hover { opacity: 0.5; }
`;

const customStyles = {
  overlay: {
    background: 'none',
    zIndex: 9,
  },
  content: {
    border: 'none',
    background: 'none',
    borderRadius: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function Modal({ children, isOpen, setIsOpen, lang, ariaHideApp }) {
  return (
    <Wrapper
      isOpen={isOpen}
      onClick={() => setIsOpen(false)}
    >
      <ReactModal
        isOpen={isOpen}
        style={customStyles}
        ariaHideApp={ariaHideApp}
      >
        {children}
        <Close
          onClick={() => setIsOpen(false)}
          src={iconClose}
          alt=""
          lang={lang}
        />
      </ReactModal>
    </Wrapper>
  );
}

export default Modal;
