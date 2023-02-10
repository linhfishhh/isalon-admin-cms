/**
 *
 * Table
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { unionBy, union, differenceBy, difference, intersection } from 'lodash';
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
  Radio,
} from '@material-ui/core';

import { NUMBER_PAGE_SIZE } from 'utils/constants';

import styles from './styles';
import Head from './Head';
import Cell from './Cell';
import Toolbar from './Toolbar';
import { stableSort, getSorting } from './helpers';
import messages from './messages';

const optionsDefault = {
  allowSelection: false,
  multipleSelection: true,
  showPaging: true,
  showToolbar: true,
  showOrderBy: false,
  showTextRowsSelected: true,
  selectedDataRow: true,
  clickRowToSelect: false,
  size: 'small',
  stickyAction: false,
};

function TableAdvance(props) {
  const {
    intl,
    className,
    name,
    columnKey,
    rows,
    headerRows,
    fetchDataForPage,
    onSelectionChange,
    refreshData,
    actions,
    selectedList,
    options,
    paging,
    spanningRows,
    onSelectedRow,
  } = props;

  const classes = styles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState(selectedList);
  const [limit, setLimit] = useState(NUMBER_PAGE_SIZE);
  const [page, setPage] = useState(0);

  const fullOptions = { ...optionsDefault, ...options };

  useEffect(() => {
    if (refreshData) {
      fetchDataForPage({ page, limit });
    }
  }, [refreshData]);

  useEffect(() => {
    const { size, number } = paging;
    if (size) {
      setLimit(size);
      setPage(number);
    }
  }, [paging]);

  useEffect(() => {
    setSelected(selectedList);
  }, [selectedList]);

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleSelectAllClick(event) {
    let newSelected = [];
    const keyList = rows.map(item => item[columnKey]);
    if (event.target.checked) {
      newSelected = fullOptions.selectedDataRow
        ? unionBy(selected, rows, columnKey)
        : union(selected, keyList);
      setSelected(newSelected);
    } else {
      newSelected = fullOptions.selectedDataRow
        ? differenceBy(selected, rows, columnKey)
        : difference(selected, keyList);
      setSelected(newSelected);
    }
    if (onSelectionChange) {
      onSelectionChange(newSelected);
    }
  }

  function handleSelection(event, row) {
    let newSelected = [];
    if (fullOptions.multipleSelection) {
      const listIdSelected = fullOptions.selectedDataRow
        ? selected.map(item => item[columnKey])
        : selected;
      const selectedIndex = listIdSelected.indexOf(row[columnKey]);

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(
          selected,
          fullOptions.selectedDataRow ? row : row[columnKey],
        );
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
    } else {
      newSelected = [fullOptions.selectedDataRow ? row : row[columnKey]];
    }
    setSelected(newSelected);

    if (onSelectionChange) {
      onSelectionChange(newSelected);
    }
  }

  function handleRowClick(event, row) {
    if (fullOptions.allowSelection && fullOptions.clickRowToSelect) {
      handleSelection(event, row);
    } else if (fullOptions.clickRowToSelect && onSelectedRow) {
      onSelectedRow(row);
    }
  }

  function handleChangePage(event, newPage) {
    if (fetchDataForPage) {
      setPage(newPage);
      fetchDataForPage({ page: newPage, limit });
    }
  }

  function handleChangeRowsPerPage(event) {
    const newLimit = event.target.value;
    setLimit(newLimit);
    if (fetchDataForPage) {
      setPage(0);
      fetchDataForPage({ limit: newLimit });
    }
  }

  const isSelected = id => {
    const listIdSelected = fullOptions.selectedDataRow
      ? selected.map(item => item[columnKey])
      : selected;
    return listIdSelected.indexOf(id) !== -1;
  };

  const numberSelect = () => {
    const allKey = rows.map(item => item[columnKey]);
    const selectKey = fullOptions.selectedDataRow
      ? selected.map(item => item[columnKey])
      : selected;
    const unchecked = intersection(allKey, selectKey);
    return unchecked.length;
  };

  return (
    <div className={`${classes.root} ${className}`}>
      <Paper className={classes.paper}>
        {fullOptions.showToolbar &&
          (name ||
            (fullOptions.multipleSelection && selected.length) ||
            actions) && (
            <Toolbar
              name={name}
              numSelected={selected.length}
              actions={actions}
              options={fullOptions}
            />
          )}
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={fullOptions.size}
          >
            <Head
              classes={classes}
              numSelected={numberSelect()}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headerRows={headerRows}
              options={fullOptions}
            />
            <TableBody>
              {rows.length ? (
                stableSort(rows, getSorting(order, orderBy))
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row[columnKey]);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={event => handleRowClick(event, row)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row[columnKey]}
                        selected={isItemSelected}
                        className={
                          fullOptions.clickRowToSelect ? classes.row : ''
                        }
                      >
                        {fullOptions.allowSelection &&
                          (fullOptions.multipleSelection ? (
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                inputProps={{
                                  'aria-labelledby': labelId,
                                }}
                                onChange={e => handleSelection(e, row)}
                              />
                            </TableCell>
                          ) : (
                            <TableCell padding="checkbox">
                              <Radio
                                checked={isItemSelected}
                                onChange={e => handleSelection(e, row)}
                                value={row[columnKey]}
                                name="radio-button-demo"
                                inputProps={{ 'aria-label': 'A' }}
                              />
                            </TableCell>
                          ))}
                        {headerRows.map((header, indexColum) => (
                          <Cell
                            key={header.id || indexColum}
                            header={header}
                            dataRow={row}
                            columnKey={columnKey}
                          />
                        ))}
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={headerRows.length + 1}>
                    {intl.formatMessage(messages.noData)}
                  </TableCell>
                </TableRow>
              )}
              {spanningRows}
            </TableBody>
          </Table>
        </div>
        {fullOptions.showPaging && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={paging.totalElements || 0}
            rowsPerPage={limit}
            page={page}
            backIconButtonProps={{
              'aria-label': 'previous page',
            }}
            nextIconButtonProps={{
              'aria-label': 'next page',
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            labelDisplayedRows={({ from, to, count }) =>
              `${from} - ${to} ${intl.formatMessage(messages.of)} ${count}`
            }
            labelRowsPerPage={intl.formatMessage(messages.rowsPerPage)}
          />
        )}
      </Paper>
    </div>
  );
}

TableAdvance.defaultProps = {
  className: '',
  refreshData: false,
  selectedList: [],
  rows: [],
  paging: {},
};

TableAdvance.propTypes = {
  intl: intlShape,
  className: PropTypes.string,
  name: PropTypes.string,
  columnKey: PropTypes.string,
  rows: PropTypes.array,
  headerRows: PropTypes.array,
  paging: PropTypes.object,
  fetchDataForPage: PropTypes.func,
  refreshData: PropTypes.bool,
  onSelectionChange: PropTypes.func,
  actions: PropTypes.arrayOf(PropTypes.element),
  selectedList: PropTypes.array,
  options: PropTypes.object,
  spanningRows: PropTypes.object,
  onSelectedRow: PropTypes.func,
};

export default memo(injectIntl(TableAdvance));
