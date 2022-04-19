import styled from '@emotion/styled';
import { ListItem, ListItemText } from '@mui/material';
import React from 'react';

const ListItemTrackStyled = styled(ListItem)({ color: 'white', flexBasis: '25%', minWidth: '100px', marginLeft: 'max(20px,5%)', marginTop: '2%' });

interface ITextListItem {
  data: string;
}
const TextListItem: React.FC<ITextListItem> = ({ data }) => {
  return (
    <ListItemTrackStyled>
      <ListItemText primary={data} />
    </ListItemTrackStyled>
  );
};

export default TextListItem;
