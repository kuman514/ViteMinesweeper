import React, { useEffect } from 'react';
import styled from 'styled-components';

import Board from '^/components/molecules/Board';
import ModalForPopups from '^/components/molecules/ModalForPopups';
import UIPanel from '^/components/molecules/UIPannel';

import { useGameStore } from '^/store/game';
import { useModalStore } from '^/store/modal';
import { ModalType } from '^/types';

const Root = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Main() {
  const isCompleted = useGameStore((state) => state.isCompleted);
  const setModalType = useModalStore((store) => store.setModalType);

  useEffect(() => {
    if (isCompleted) {
      setModalType(ModalType.YOU_WIN);
    }
  }, [isCompleted]);

  return (
    <Root>
      <Board />
      <UIPanel />
      <ModalForPopups />
    </Root>
  );
}

export default Main;
