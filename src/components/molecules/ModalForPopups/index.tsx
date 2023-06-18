import React from 'react';
import styled from 'styled-components';

import ConfigPopup from '^/components/molecules/ConfigPopup';
import UIButton from '^/components/atoms/UIButton';

const Root = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  box-sizing: border-box;
  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.6);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChildContent = styled.div`
  box-sizing: border-box;
  width: 40vw;
  height: 40vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: white;
  padding: 5%;
  border-radius: 2.5%;
`;

const ChildHeader = styled.div`
  box-sizing: border-box;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

interface Props {
  isModalShown?: boolean;
  onCloseClick?: () => void;
}

function ModalForPopups({ isModalShown, onCloseClick }: Props) {
  return isModalShown ? (
    <Root>
      <ChildContent>
        <ChildHeader>
          <div>Configuration</div>
          <UIButton
            onClick={() => onCloseClick?.()}
            label="Close"
          />
        </ChildHeader>
        <ConfigPopup />
      </ChildContent>
    </Root>
  ) : null;
}

export default ModalForPopups;
