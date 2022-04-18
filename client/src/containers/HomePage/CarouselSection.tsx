import React from 'react';
import { TrackCard } from '../../components/Card';
import { TrackCarosel } from '../../components/Carousel';
import { Album } from '../../types/Album';
import SectionHeader from './SectionHeader';

export interface ICarouselSection {
  data: Album[];
  title: string;
  sectionLink: string;
}
const CarouselSection: React.FC<ICarouselSection> = ({ data, title, sectionLink }) => {
  return (
    <>
      <SectionHeader title={title} sectionLink={sectionLink} />
      <TrackCarosel cauroselData={data} component={TrackCard} />
    </>
  );
};

export default CarouselSection;
