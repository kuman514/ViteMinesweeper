import React from 'react';
import styled from 'styled-components';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';

const Root = styled.div`
  width: 100%;
`;

const TitleContainer = styled.div`
  font-weight: 500;
`;

interface Props {
  title: string;
  value: number;
  minimum: number;
  maximum: number;
  onChange(newValue: number): void;
}

function UINumberSlider({
  title,
  value,
  minimum,
  maximum,
  onChange,
}: Props) {
  return (
    <Root>
      <TitleContainer>
        {title}
      </TitleContainer>
      <Slider
        flex="1"
        focusThumbOnChange={false}
        value={value}
        onChange={onChange}
        min={minimum}
        max={maximum}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb fontSize="sm" boxSize="32px">
          {value}
        </SliderThumb>
      </Slider>
    </Root>
  );
}

export default UINumberSlider;
