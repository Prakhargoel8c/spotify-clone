import styled from '@emotion/styled';
import { Pagination } from '@mui/material';
import React, { createElement } from 'react';

const ListContiner = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '2%',
  '&.loading': { justifyContent: 'center', minHeight: '500px' },
});

const ListPagination = styled(Pagination)({ margin: '2%', ul: { justifyContent: 'center', 'li>*': { color: 'white !important' } } });

export interface IVirtualizedListItem {
  data: any;
}
export interface IVirtualizedList {
  pageCount: number;
  rowItem: React.FC<IVirtualizedListItem>;
  loadPage: (pageNumber: number) => void;
  itemsData: Array<any>;
  apiStatus: 'idle' | 'loading' | 'failed';
  loadingSpinner: React.FC;
}
export const VirtualizedList: React.FC<IVirtualizedList> = ({ pageCount, rowItem: RowItem, itemsData, loadPage, apiStatus, loadingSpinner }) => {
  return (
    <>
      <ListContiner className={apiStatus}>
        {apiStatus === 'loading' ? createElement(loadingSpinner) : itemsData.map((data) => createElement(RowItem, { data, key: data?.id ?? data }))}
      </ListContiner>
      {pageCount > 1 && <ListPagination count={pageCount} onChange={(_, page) => loadPage(page)} size="large" />}
    </>
  );
};
