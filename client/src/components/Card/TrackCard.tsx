import { CardMedia, CardContent, Typography, Card } from '@mui/material';
import styled from '@emotion/styled';
import React from 'react';

const TrackCardStyled = styled(Card)({ maxWidth: '250px', borderRadius: '12px', color: 'white', backgroundColor: 'transparent' });

const TrackCardContentStyled = styled(CardContent)({ backgroundColor: '#0C0C0C' });

interface ITrackCard {
  image: string;
  title: string;
}

const TrackCard: React.FC<ITrackCard> = ({ title, image }) => {
  return (
    <TrackCardStyled>
      <CardMedia component="img" height="200" src={image} image={image} alt={title} />
      <TrackCardContentStyled>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
      </TrackCardContentStyled>
    </TrackCardStyled>
  );
};

export default TrackCard;
