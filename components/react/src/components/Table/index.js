import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../Spinner';

import { 
  TableWrapper,
  TableHeader,
  TableHeaderHead,
  TableHeaderActions,
  TableBody,
  TableContent,
  EmptyData,
} from './styled';

const Table = ({
  title,
  addHeaderContent,
  headers,
  tableData,
  loadingData,
  emptyData,
  notFoundMessage,
}) => {
  console.log(emptyData);
  return (
    <TableWrapper>
      {title && (
        <TableHeader>
          <TableHeaderHead title={title} />
          <TableHeaderActions>
            {addHeaderContent}
          </TableHeaderActions>  
        </TableHeader>
      )}
      <TableBody>
        <TableContent
          headers={headers}
          tableData={tableData}
        />
        {loadingData && <Spinner />}
        {!loadingData && emptyData ? <EmptyData>{notFoundMessage}</EmptyData> : null}
      </TableBody>
    </TableWrapper>
  );
}

Table.defaultProps = {
  loadingData: false,
  emptyData: false,
  notFoundMessage: 'Not found resources',
};

Table.propTypes = {
  title: PropTypes.string,
  addHeaderContent: PropTypes.any,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadingData: PropTypes.bool,
  emptyData: PropTypes.bool,
  notFoundMessage: PropTypes.string,
};

export default Table;
