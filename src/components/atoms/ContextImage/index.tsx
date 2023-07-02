import React from 'react';
import styled from 'styled-components';

const Root = styled.img`
  box-sizing: border-box;
  width: 64%;
  height: 64%;
  pointer-events: none;
`;

interface Props {
  src?: string;
}

function ContextImage({ src }: Props) {
  return <Root src={src} />;
}

export default ContextImage;
