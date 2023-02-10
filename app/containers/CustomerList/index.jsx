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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import { injectIntl, intlShape } from 'react-intl';
import isEmpty from 'lodash/isEmpty';

import TableAdvance from 'components/TableAdvance';
import TabsAdvance from 'components/TabsAdvance';
import Button from 'components/Button';
import Header from 'components/Header';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectLoading } from 'utils/injectLoading';
import { NUMBER_PAGE_SIZE } from 'utils/constants';

import {
  makeSelectCustomerList,
  makeSelectPaging,
  makeSelectCustomerOrderedList,
  makeSelectOrderedPaging,
} from './selectors';
import {
  getListRequest,
  getOrderedListRequest,
  searchRequest,
} from './actions';
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
    backgroundColor: '#fff',
  },
}));

const tabList = [
  { id: 'all', name: 'Tất cả khách hàng' },
  { id: 'ordered', name: 'Khách hàng đã đặt hàng' },
];

export function CustomerList(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTION_TYPES);

  const classes = useStyles();

  const {
    intl,
    dispatch,
    customerList,
    paging,
    getCustomerList,
    customerOrderedList,
    orderedPaging,
    getCustomerOrderedList,
    searchCustomer,
    onSelectCustomer,
  } = props;

  const [activeTab, setActiveTab] = useState(tabList[0]);
  const [keyword, setKeyword] = useState();
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    getCustomerList({});
    getCustomerOrderedList({});
  }, []);

  const detailAction = id => (
    <Button
      variant="outlined"
      key={`detail-${id}`}
      icon={onSelectCustomer ? 'add' : 'detail'}
      fontSize="small"
      options={{ showIcon: true }}
      onClick={() => detailCustomer(id)}
    />
  );

  const headerRows = React.useMemo(
    () => [
      {
        id: 'profileId',
        type: 'text',
        label: 'ID',
      },
      {
        id: 'avatar',
        type: 'avatar',
        label: 'Ảnh đại điện',
        alt: 'fullName',
      },
      {
        id: 'fullName',
        type: 'text',
        label: 'Khách hàng',
      },
      {
        id: 'phone',
        type: 'text',
        label: 'Số điện thoại',
      },
      {
        id: 'email',
        type: 'text',
        label: 'Email',
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

  const detailCustomer = React.useCallback(customerId => {
    if (onSelectCustomer) {
      onSelectCustomer(customerId);
    } else {
      dispatch(push(`/admin/customer/detail/${customerId}`));
    }
  }, []);

  const renderContentTab = itemData => {
    if (itemData.id === 'all') {
      return (
        <TableAdvance
          columnKey="profileId"
          rows={customerList}
          headerRows={headerRows}
          paging={paging}
          fetchDataForPage={fetchCustomerList}
        />
      );
    }
    return (
      <TableAdvance
        columnKey="profileId"
        rows={customerOrderedList}
        headerRows={headerRows}
        paging={orderedPaging}
        fetchDataForPage={getCustomerOrderedList}
      />
    );
  };

  React.useEffect(() => {
    setSearching(!isEmpty(keyword));
  }, [keyword]);

  const handleSearchInputChange = React.useCallback(event => {
    const textSearch = event.target.value;
    setKeyword(textSearch);
  }, []);

  const onSearch = () => {
    if (!isEmpty(keyword)) {
      searchCustomer({ keyword, page: 0 });
    }
  };

  const onClearSearch = () => {
    setKeyword('');
    getCustomerList({});
  };

  const fetchCustomerList = payload => {
    const { page = 0, limit = NUMBER_PAGE_SIZE } = payload;
    if (searching) return searchCustomer({ keyword, page, limit });
    return getCustomerList(payload);
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
        {activeTab.id === 'all' && (
          <Grid container alignItems="center" spacing={3} justify="flex-end">
            <Grid item className={classes.padding0}>
              <TextField
                className={classes.searchInput}
                margin="dense"
                value={keyword}
                variant="outlined"
                id="user-search"
                label="Nhập tên, số điện thoại, email"
                onChange={handleSearchInputChange}
                InputProps={{
                  style: {
                    paddingRight: 0,
                  },
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
        )}
      </Header>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TabsAdvance
            dataSource={tabList}
            dataTextField="name"
            dataValueField="id"
            contentTab={renderContentTab}
            selectedTab={activeTab}
            onSelectedTabChange={tab => {
              setActiveTab(tab);
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

CustomerList.propTypes = {
  intl: intlShape,
  dispatch: PropTypes.func,
  customerList: PropTypes.array,
  paging: PropTypes.object,
  getCustomerList: PropTypes.func,
  customerOrderedList: PropTypes.array,
  orderedPaging: PropTypes.object,
  getCustomerOrderedList: PropTypes.func,
  searchCustomer: PropTypes.func,
  onSelectCustomer: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  customerList: makeSelectCustomerList(),
  paging: makeSelectPaging(),
  customerOrderedList: makeSelectCustomerOrderedList(),
  orderedPaging: makeSelectOrderedPaging(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getCustomerList: payload => dispatch(getListRequest(payload)),
    getCustomerOrderedList: payload => dispatch(getOrderedListRequest(payload)),
    searchCustomer: payload => dispatch(searchRequest(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(injectIntl(CustomerList));
