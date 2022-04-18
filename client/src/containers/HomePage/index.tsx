import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import CarouselSection from './CarouselSection';
import TextSection from './TextSection';
import { loadAlbumsData, loadFeaturedPlaylistsData, loadGenresData, selectAlbums, selectFeaturedPlaylists, selectGenres } from './state';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const [cancelTokenSource] = useState(axios.CancelToken.source());
  const albums = useAppSelector(selectAlbums);
  const featuredPlayLists = useAppSelector(selectFeaturedPlaylists);
  const genres = useAppSelector(selectGenres);
  const loadPageData = () => {
    dispatch(loadAlbumsData(cancelTokenSource.token));
    dispatch(loadFeaturedPlaylistsData(cancelTokenSource.token));
    dispatch(loadGenresData(cancelTokenSource.token));
    return () => {
      cancelTokenSource.cancel();
    };
  };
  useEffect(loadPageData, [cancelTokenSource, dispatch]);
  return (
    <>
      <CarouselSection data={albums} title="Released This Week" sectionLink="" />
      <CarouselSection data={featuredPlayLists} title="Featured Playlists" sectionLink="" />
      <TextSection data={genres} title="Browse genres" sectionLink="" />
    </>
  );
};

export default HomePage;
