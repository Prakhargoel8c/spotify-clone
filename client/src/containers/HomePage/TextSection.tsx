import styled from '@emotion/styled';
import React from 'react';
import { TextCard } from '../../components/Card';
import { SectionHeader } from '../../components/SectionHeader';

const TextSectionContainer = styled.div({ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', margin: 'max(10px,(2% 5%))' });

export interface ITextSection {
  data: string[];
  title: string;
  sectionLink: string;
}

const TextSection: React.FC<ITextSection> = ({ data, title, sectionLink }) => {
  return (
    <>
      <SectionHeader title={title} sectionLink={sectionLink} />
      <TextSectionContainer>
        {data.slice(0, 10).map((value) => (
          <TextCard key={value} title={value} />
        ))}
      </TextSectionContainer>
    </>
  );
};

export default TextSection;
