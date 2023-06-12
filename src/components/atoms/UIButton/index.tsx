import React from 'react';
import { Button } from '@chakra-ui/react';

interface Props {
  onClick: () => void;
  label: string;
}

function UIButton({ onClick, label }: Props) {
  return (
    <Button
      colorScheme="whatsapp"
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

export default UIButton;
