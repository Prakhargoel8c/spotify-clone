import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { VirtualizedList } from '../../components/List';
import { TextListItem } from '../../components/ListItem';
import { LargeSectionHeader } from '../../components/SectionHeader';
import { WhiteSpinner } from '../../components/Spinner';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loadGenresData, selectApiStatus, selectGenres, selectGenresPageCount, setPageGenres } from './state';

const WeeklyPage = () => {
  const dispatch = useAppDispatch();
  const [cancelTokenSource] = useState(axios.CancelToken.source());
  const genres = useAppSelector(selectGenres);
  const genrePageCount = useAppSelector(selectGenresPageCount);
  const apiStatus = useAppSelector(selectApiStatus);
  const loadGenreDataCallback = useCallback((pageNumber: number) => dispatch(setPageGenres(pageNumber)), [dispatch]);
  const loadPageData = () => {
    dispatch(loadGenresData(cancelTokenSource.token));
    return () => {
      cancelTokenSource.cancel();
    };
  };
  useEffect(loadPageData, [cancelTokenSource, dispatch]);
  return (
    <>
      <LargeSectionHeader title="Browse Genres" />
      <VirtualizedList
        loadPage={loadGenreDataCallback}
        pageCount={genrePageCount}
        itemsData={genres}
        rowItem={TextListItem}
        apiStatus={apiStatus}
        loadingSpinner={WhiteSpinner}
      />
    </>
  );
};

export default WeeklyPage;
