import React from 'react';
import { TrackListItem } from '../../components/ListItem';
import { Album } from '../../types/Album';

export interface IAlbumListItem {
  data: Album;
}

const AlbumListItem: React.FC<IAlbumListItem> = ({ data }) => {
  return <TrackListItem image={data.image} title={data.title} />;
};

export default AlbumListItem;
