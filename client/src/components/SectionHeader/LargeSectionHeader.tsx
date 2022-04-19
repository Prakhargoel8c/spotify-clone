import styled from '@emotion/styled';
import React from 'react';

const SectionContainer = styled.div({ margin: '5%', color: 'white', fontSize: 'xxx-large' });

export interface ILargeSectionHeader {
  title: string;
}
const LargeSectionHeader: React.FC<ILargeSectionHeader> = ({ title }) => {
  return <SectionContainer>{title}</SectionContainer>;
};

export default LargeSectionHeader;
