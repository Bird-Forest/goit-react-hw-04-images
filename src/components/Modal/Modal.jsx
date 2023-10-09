import React, { useEffect } from 'react';
import { ModalImg, Overlay, ModalWrap } from './Modal.styled';

export const Modal = ({ open, onClose }) => {
  const onOverlyaClick = event => {
    if (event.currentTarget === event.target) onClose();
  };
  useEffect(() => {
    const handleKeyPress = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose]);

  return (
    <Overlay onClick={onOverlyaClick}>
      <ModalWrap>
        <ModalImg src={open} alt="Big foto" />
      </ModalWrap>
    </Overlay>
  );
};
