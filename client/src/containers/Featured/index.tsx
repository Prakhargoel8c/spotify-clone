import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { VirtualizedList } from '../../components/List';
import { LargeSectionHeader } from '../../components/SectionHeader';
import { WhiteSpinner } from '../../components/Spinner';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import AlbumListItem from './AlbumListItem';
import { loadAlbumsData, selectAlbums, selectAlbumPagesTotalCount, selectApiStatus } from './state';

const WeeklyPage = () => {
  const dispatch = useAppDispatch();
  const [cancelTokenSource] = useState(axios.CancelToken.source());
  const albums = useAppSelector(selectAlbums);
  const albumsTotalCount = useAppSelector(selectAlbumPagesTotalCount);
  const apiStatus = useAppSelector(selectApiStatus);
  const loadAlbumDataCallback = useCallback(
    (pageNumber: number) => {
      dispatch(loadAlbumsData({ pageNumber, cancelToken: cancelTokenSource.token }));
    },
    [cancelTokenSource, dispatch]
  );
  const loadPageData = () => {
    loadAlbumDataCallback(1);
    return () => {
      cancelTokenSource.cancel();
    };
  };
  useEffect(loadPageData, [cancelTokenSource, dispatch, loadAlbumDataCallback]);
  return (
    <>
      <LargeSectionHeader title="Featured Playlists" />
      <VirtualizedList
        loadPage={loadAlbumDataCallback}
        pageCount={albumsTotalCount}
        itemsData={albums}
        rowItem={AlbumListItem}
        apiStatus={apiStatus}
        loadingSpinner={WhiteSpinner}
      />
    </>
  );
};

export default WeeklyPage;
