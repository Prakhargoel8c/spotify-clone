import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { VirtualizedList } from '../../components/List';
import { LargeSectionHeader } from '../../components/SectionHeader';
import { WhiteSpinner } from '../../components/Spinner';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import AlbumListItem from './AlbumListItem';
import { loadAlbumsData, selectAlbums, selectAlbumsTotalCount, selectApiStatus } from './state';

const WeeklyPage = () => {
  const dispatch = useAppDispatch();
  const [cancelTokenSource] = useState(axios.CancelToken.source());
  const albums = useAppSelector(selectAlbums);
  const albumsPagesCount = useAppSelector(selectAlbumsTotalCount);
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
      <LargeSectionHeader title="Released This Week" />
      <VirtualizedList
        loadPage={loadAlbumDataCallback}
        pageCount={albumsPagesCount}
        itemsData={albums}
        rowItem={AlbumListItem}
        apiStatus={apiStatus}
        loadingSpinner={WhiteSpinner}
      />
    </>
  );
};

export default WeeklyPage;
