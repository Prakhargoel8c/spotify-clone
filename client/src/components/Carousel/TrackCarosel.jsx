import styled from '@emotion/styled';
import React, { createElement } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const CarouselContainer = styled.div({ margin: 'max(10px,(2% 5%))' });
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    paritialVisibilityGutter: 100,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 300, min: 0 },
    items: 1,
    paritialVisibilityGutter: 30,
  },
};
const TrackCarosel = ({ cauroselData, component }) => {
  return (
    <CarouselContainer>
      <Carousel responsive={responsive} partialVisible>
        {cauroselData.map(({ id, image, title }) => createElement(component, { image, title, key: id }))}
      </Carousel>
    </CarouselContainer>
  );
};

export default TrackCarosel;
