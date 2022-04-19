import styled from '@emotion/styled';
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import React, { memo } from 'react';
const ListItemTrackStyled = styled(ListItem)({ color: 'white', flexBasis: '40%', minWidth: '100px', marginLeft: 'max(20px,5%)', marginTop: '2%' });
export interface ITrackListItem {
  image: string;
  title: string;
}

const TrackListItem: React.FC<ITrackListItem> = memo(({ image, title }) => {
  return (
    <ListItemTrackStyled>
      <ListItemAvatar>
        <Avatar alt={title} src={image} />
      </ListItemAvatar>
      <ListItemText primary={title} />
    </ListItemTrackStyled>
  );
});

export default TrackListItem;
