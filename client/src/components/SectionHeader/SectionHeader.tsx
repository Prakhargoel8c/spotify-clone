import React from 'react';
import styled from '@emotion/styled';
import { RoundButton } from '../Button';

const SectionTitle = styled.h4({
  textAlign: 'left',
  color: 'white',
  marginTop: '2%',
  fontSize: 'x-large',
});

const SectionHeaderContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  marginLeft: 'max(2%,5px)',
  marginRight: 'max(2%,5px)',
});

export interface ISectionHeader {
  title: string;
  sectionLink: string;
}

const SectionHeader: React.FC<ISectionHeader> = ({ title, sectionLink }) => {
  return (
    <SectionHeaderContainer>
      <SectionTitle>{title}</SectionTitle>
      <RoundButton href={sectionLink} variant="contained">
        See All
      </RoundButton>
    </SectionHeaderContainer>
  );
};

export default SectionHeader;
