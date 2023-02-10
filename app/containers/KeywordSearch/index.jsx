/**
 *
 * KeywordSearch
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { set, unset, isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  TextField,
} from '@material-ui/core';

import Header from 'components/Header';
import Button from 'components/Button';
import AlertDialog from 'components/AlertDialog';
import DnDListItem from 'components/DnDListItem';

import validation from 'utils/validation';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectLoading } from 'utils/injectLoading';
import { useInjectToast } from 'utils/injectToast';

import TopKeywordSearch from './TopKeywordSearch';
import {
  makeSelectKeywordSearch,
  makeSelecttopKeywordSearchList,
  makeSelectKeywordSearchList,
  makeSelectRefreshData,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  getListRequest,
  getTopKeywordSearchRequest,
  addRequest,
  updateOrderRequest,
  deleteRequest,
  updateDataField,
  cleanDataAction,
} from './actions';
import { CONTEXT, LOADING_ACTION_TYPES, TOAST_ACTION_TYPES } from './constants';

export function KeywordSearch(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTION_TYPES);
  useInjectToast(TOAST_ACTION_TYPES);

  const {
    intl,
    keywordSearch,
    topKeywordSearchList,
    getTopKeywordSearchList,
    keywordSearchList,
    setDataField,
    getKeywordSearchList,
    addKeywordSearch,
    updateOrder,
    deleteKeywordSearch,
    cleanData,
    refreshData,
  } = props;

  const [idRemove, setIdRemove] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [validate, setValidate] = useState({});

  useEffect(() => {
    getKeywordSearchList();
    getTopKeywordSearchList({ limit: 30 });
  }, []);

  useEffect(() => {
    if (refreshData) {
      handleCancelAddNew();
      getKeywordSearchList();
    }
  }, [refreshData]);

  const onChangeDataField = name => event => {
    let dataField;
    switch (name) {
      default:
        dataField = { [name]: event.target.value };
        break;
    }
    setDataField(dataField);
  };

  const validateField = () => {
    const option = [
      {
        type: 'empty',
        model: keywordSearch,
        keys: ['hotKeyword'],
      },
    ];
    const result = validation(option);
    setValidate(result);
    return isEmpty(result);
  };

  const handleAddKeywordSearch = () => {
    const noValidate = validateField();
    if (noValidate) {
      addKeywordSearch([keywordSearch]);
    }
  };

  const handleCancelAddNew = () => {
    cleanData();
  };

  const onConfirmCancelRemove = () => {
    setIdRemove(0);
  };

  const onConfirmRemove = () => {
    deleteKeywordSearch({ id: idRemove });
    setIdRemove(0);
  };

  const handlerDidChangeOrder = listNewOrder => {
    const data = listNewOrder.map((item, index) => {
      set(item, 'orderNumber', index);
      unset(item, 'vendorId');
      return item;
    });
    updateOrder({ data });
  };

  const handleAgreeDialog = selected => {
    const data = selected.map(item => ({ hotKeyword: item.name }));
    addKeywordSearch(data);
    handleCancelDialog();
  };

  const handleCancelDialog = () => {
    setOpenDialog(false);
  };

  const renderSpotlightItem = item => (
    <Grid container>
      <Grid item xs={5} container alignItems="center">
        <Typography variant="subtitle1" color="primary" noWrap>
          {item.hotKeyword}
        </Typography>
      </Grid>
      <Grid item xs container alignItems="center" />
      <Grid item>
        <Button
          icon="delete"
          type="iconButton"
          onClick={() => {
            setIdRemove(item.hotSearchId);
          }}
        />
      </Grid>
    </Grid>
  );

  return (
    <div>
      <Helmet>
        <title>{intl.formatMessage(messages.header)}</title>
        <meta name="description" content="Description of KeywordSearch" />
      </Helmet>

      <Header title={intl.formatMessage(messages.header)} />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={
                <Typography variant="h6">
                  {intl.formatMessage(messages.add)}
                </Typography>
              }
            />
            <CardContent>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={6}>
                  <TextField
                    required
                    id="keyword-search"
                    label={intl.formatMessage(messages.hotKeyword)}
                    variant="outlined"
                    value={keywordSearch.hotKeyword && keywordSearch.hotKeyword}
                    fullWidth
                    onChange={onChangeDataField('hotKeyword')}
                    error={validate.hotKeyword && validate.hotKeyword.error}
                    helperText={
                      validate.hotKeyword &&
                      intl.formatMessage(
                        messages[validate.hotKeyword.helperText],
                      )
                    }
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button icon="save" onClick={handleAddKeywordSearch} />
                  <Button
                    icon="cancel"
                    color="default"
                    onClick={handleCancelAddNew}
                  />
                </Grid>
                <Grid item xs={3} container justify="flex-end">
                  <Grid item>
                    <Button
                      icon="add"
                      name="Lịch sử tìm kiếm"
                      options={{ showIcon: false }}
                      onClick={() => setOpenDialog(true)}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={
                <Typography variant="h6">
                  {intl.formatMessage(messages.list)}
                </Typography>
              }
            />
            <CardContent>
              <DnDListItem
                items={keywordSearchList}
                renderChild={renderSpotlightItem}
                onOrderChange={handlerDidChangeOrder}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <TopKeywordSearch
        intl={intl}
        open={openDialog}
        dataList={topKeywordSearchList}
        onCancel={handleCancelDialog}
        onAgree={handleAgreeDialog}
      />

      <AlertDialog
        open={idRemove !== 0}
        description={intl.formatMessage(messages.confirmDelete)}
        onCancel={onConfirmCancelRemove}
        onConfirm={onConfirmRemove}
      />
    </div>
  );
}

KeywordSearch.propTypes = {
  intl: intlShape,
  keywordSearch: PropTypes.object,
  topKeywordSearchList: PropTypes.array,
  getTopKeywordSearchList: PropTypes.func,
  keywordSearchList: PropTypes.array,
  getKeywordSearchList: PropTypes.func,
  addKeywordSearch: PropTypes.func,
  updateOrder: PropTypes.func,
  deleteKeywordSearch: PropTypes.func,
  setDataField: PropTypes.func,
  cleanData: PropTypes.func,
  refreshData: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  keywordSearch: makeSelectKeywordSearch(),
  topKeywordSearchList: makeSelecttopKeywordSearchList(),
  keywordSearchList: makeSelectKeywordSearchList(),
  refreshData: makeSelectRefreshData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getKeywordSearchList: payload => dispatch(getListRequest(payload)),
    getTopKeywordSearchList: payload =>
      dispatch(getTopKeywordSearchRequest(payload)),
    addKeywordSearch: payload => dispatch(addRequest(payload)),
    updateOrder: payload => dispatch(updateOrderRequest(payload)),
    deleteKeywordSearch: payload => dispatch(deleteRequest(payload)),
    setDataField: payload => dispatch(updateDataField(payload)),
    cleanData: () => dispatch(cleanDataAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(injectIntl(KeywordSearch));
