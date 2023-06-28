import React from 'react';
import styled from 'styled-components';

import ConfigPopup from '^/components/molecules/ConfigPopup';
import YouWinPopup from '^/components/molecules/YouWinPopup';
import UIButton from '^/components/atoms/UIButton';
import { useModalStore } from '^/store/modal';
import { ModalType } from '^/types';

import { text } from './text';

const Root = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  box-sizing: border-box;
  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.6);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChildContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: white;
  padding: 3%;
  border-radius: 2.5%;
`;

const ChildHeader = styled.div`
  box-sizing: border-box;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  column-gap: 2rem;
`;

const ModalTitle = styled.span`
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 0.8rem;
`;

function ModalForPopups() {
  const modalType = useModalStore((state) => state.modalType);
  const setModalType = useModalStore((state) => state.setModalType);

  const modalContent = (() => {
    switch (modalType) {
      case ModalType.GAME_CONFIG:
        return <ConfigPopup />;
      case ModalType.YOU_WIN:
        return <YouWinPopup />;
      default:
        return null;
    }
  })();

  if (modalContent === null) {
    return null;
  }

  function handleOnCloseClick() {
    setModalType(ModalType.OFF);
  }

  return (
    <Root>
      <ChildContent>
        <ChildHeader>
          <ModalTitle>{text.title[modalType]}</ModalTitle>
          <UIButton
            onClick={() => handleOnCloseClick()}
            label="Close"
          />
        </ChildHeader>
        {modalContent}
      </ChildContent>
    </Root>
  );
}

export default ModalForPopups;
