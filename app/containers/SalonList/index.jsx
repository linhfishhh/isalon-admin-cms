/**
 *
 * CustomerList
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import {
  Grid,
  TextField,
  Button as MuiButton,
  InputAdornment,
  IconButton,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import { injectIntl, intlShape } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import { NUMBER_PAGE_SIZE } from 'utils/constants';

import TableAdvance from 'components/TableAdvance';
import Button from 'components/Button';
import Header from 'components/Header';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectLoading } from 'utils/injectLoading';

import { makeSelectSalonList, makeSelectPaging } from './selectors';
import { getListRequest, searchRequest } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { CONTEXT, LOADING_ACTION_TYPES } from './constants';

const useStyles = makeStyles(theme => ({
  searchInput: {
    width: 300,
  },
  padding0: {
    paddingTop: '0px !important',
    paddingBottom: '0px !important',
  },
  header: {
    height: 60,
  },
  salonName: {
    fontWeight: 'bold',
  },
}));

export function SalonList(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTION_TYPES);

  const classes = useStyles();

  const {
    intl,
    dispatch,
    salonList,
    paging,
    getSalonList,
    searchSalon,
  } = props;

  const [keyword, setKeyword] = useState();
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    getSalonList({});
  }, []);

  const detailAction = id => (
    <Button
      variant="outlined"
      key={`detail-${id}`}
      icon="detail"
      fontSize="small"
      options={{ showIcon: false }}
      onClick={() => detailSalon(id)}
    />
  );

  const headerRows = React.useMemo(
    () => [
      {
        id: 'id',
        type: 'text',
        label: 'ID',
      },
      {
        id: 'cover',
        type: 'image',
        label: 'Ảnh đại điện',
        alt: 'cover',
      },
      {
        id: 'name',
        type: 'customize',
        label: 'Tên',
        customize: data => (
          <Grid container>
            <Grid item xs={12}>
              <Typography className={classes.salonName}>{data.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>{data.address}</Typography>
            </Grid>
          </Grid>
        ),
      },
      {
        id: 'action',
        type: 'actions',
        actions: [detailAction],
        align: 'right',
      },
    ],
    [],
  );

  const detailSalon = React.useCallback(salonId => {
    dispatch(push(`/admin/salon/detail/${salonId}`));
  }, []);

  React.useEffect(() => {
    setSearching(!isEmpty(keyword));
  }, [keyword]);

  const handleSearchInputChange = React.useCallback(event => {
    const textSearch = event.target.value;
    setKeyword(textSearch);
  }, []);

  const onSearch = () => {
    if (!isEmpty(keyword)) {
      searchSalon({ keyword });
    }
  };

  const onClearSearch = () => {
    setKeyword('');
    getSalonList({});
  };

  const fetchSalonList = payload => {
    const { page = 0, limit = NUMBER_PAGE_SIZE } = payload;
    if (searching) {
      searchSalon({
        keyword,
        page: page + 1,
        limit,
      });
    } else {
      getSalonList({ page: page + 1, limit });
    }
  };

  return (
    <div>
      <Helmet>
        <title>{intl.formatMessage(messages.header)}</title>
        <meta name="description" content="Description of CustomerList" />
      </Helmet>

      <Header
        title={intl.formatMessage(messages.header)}
        className={classes.header}
      >
        <Grid container alignItems="center" spacing={3} justify="flex-end">
          <Grid item className={classes.padding0}>
            <TextField
              className={classes.searchInput}
              margin="dense"
              value={keyword}
              variant="outlined"
              id="salon-search"
              label="Nhập tên salon"
              onChange={handleSearchInputChange}
              InputProps={{
                paddingRight: 0,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={onClearSearch}>
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item className={classes.padding0}>
            <MuiButton variant="contained" color="primary" onClick={onSearch}>
              Tìm kiếm
            </MuiButton>
          </Grid>
        </Grid>
      </Header>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableAdvance
            columnKey="id"
            rows={salonList}
            headerRows={headerRows}
            paging={paging}
            fetchDataForPage={fetchSalonList}
          />
        </Grid>
      </Grid>
    </div>
  );
}

SalonList.propTypes = {
  intl: intlShape,
  dispatch: PropTypes.func,
  salonList: PropTypes.array,
  paging: PropTypes.object,
  getSalonList: PropTypes.func,
  searchSalon: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  salonList: makeSelectSalonList(),
  paging: makeSelectPaging(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getSalonList: payload => dispatch(getListRequest(payload)),
    searchSalon: payload => dispatch(searchRequest(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(injectIntl(SalonList));
