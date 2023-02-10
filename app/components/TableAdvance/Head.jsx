import React from 'react';
import PropTypes from 'prop-types';
import {
  TableRow,
  TableHead,
  TableSortLabel,
  TableCell,
  Checkbox,
} from '@material-ui/core';

function Head(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headerRows,
    options,
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className={classes.header}>
      <TableRow>
        {options.allowSelection &&
          (options.multipleSelection ? (
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{ 'aria-label': 'select all desserts' }}
              />
            </TableCell>
          ) : (
            <TableCell padding="checkbox" />
          ))}
        {headerRows.map(header => (
          <TableCell
            className={classes.headerText}
            key={header.id}
            align={header.align || 'left'}
            sortDirection={orderBy === header.id ? order : false}
            style={{ width: header.width || 'auto' }}
          >
            {options.showOrderBy ? (
              <TableSortLabel
                active={orderBy === header.id}
                direction={order}
                onClick={createSortHandler(header.id)}
              >
                {header.label}
                {orderBy === header.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            ) : (
              header.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

Head.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  headerRows: PropTypes.array.isRequired,
  options: PropTypes.object,
};

export default Head;
