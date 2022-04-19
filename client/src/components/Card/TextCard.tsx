import { CardContent, Typography, Card } from '@mui/material';
import styled from '@emotion/styled';
import React from 'react';

const TextCardStyled = styled(Card)({
  minWidth: '250px',
  borderRadius: '32px',
  color: 'white',
  backgroundColor: '#0C0C0C',
  textAlign: 'center',
  margin: '1%',
});

const TrackCardContentStyled = styled(CardContent)({ backgroundColor: '#0C0C0C' });

interface ITextCard {
  title: string;
}

const TextCard: React.FC<ITextCard> = ({ title }) => {
  return (
    <TextCardStyled>
      <TrackCardContentStyled>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
      </TrackCardContentStyled>
    </TextCardStyled>
  );
};

export default TextCard;
