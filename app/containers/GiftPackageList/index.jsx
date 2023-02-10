/**
 *
 * GiftPackageList
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import TableAdvance from 'components/TableAdvance';
import AlertDialog from 'components/AlertDialog';
import Button from 'components/Button';
import { Grid } from '@material-ui/core';
import { push } from 'connected-react-router';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectLoading } from 'utils/injectLoading';
import { useInjectToast } from 'utils/injectToast';
import Header from 'components/Header';
import { injectIntl, intlShape } from 'react-intl';
import {
  makeSelectGiftPackageList,
  makeSelectRefreshData,
  makeSelectPaging,
} from './selectors';
import { getListRequest, deleteRequest } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { CONTEXT, LOADING_ACTION_TYPES, TOAST_ACTION_TYPES } from './constants';

export function GiftPackageList(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTION_TYPES);
  useInjectToast(TOAST_ACTION_TYPES);

  const {
    intl,
    dispatch,
    giftPackageList,
    paging,
    getGiftPackageList,
    deleteGiftPackage,
    refreshData,
  } = props;

  const [giftPackageRemove, setGiftPackageRemove] = useState(0);

  useEffect(() => {
    getGiftPackageList({});
  }, []);

  const editAction = id => (
    <Button
      key={`edit-${id}`}
      icon="edit"
      type="iconButton"
      onClick={() => editGiftPackage(id)}
    />
  );

  const deleteAction = id => (
    <Button
      key={`delete-${id}`}
      icon="delete"
      type="iconButton"
      onClick={() => setGiftPackageRemove(id)}
    />
  );

  const headerRows = [
    {
      id: 'giftPackageId',
      type: 'text',
      label: 'ID',
    },
    {
      id: 'imageSource',
      type: 'image',
      label: `${intl.formatMessage(messages.thumbnail)}`,
    },
    {
      id: 'percent',
      type: 'text',
      label: `${intl.formatMessage(messages.percent)}`,
      align: 'right',
    },
    {
      id: 'cash',
      type: 'number',
      label: `${intl.formatMessage(messages.cash)}`,
      align: 'right',
    },
    {
      id: 'appliedCash',
      type: 'number',
      label: `${intl.formatMessage(messages.appliedCash)}`,
      align: 'right',
    },
    {
      id: 'maxCash',
      type: 'number',
      label: `${intl.formatMessage(messages.maxCash)}`,
      align: 'right',
    },
    {
      id: 'startAt',
      type: 'dateTime',
      label: `${intl.formatMessage(messages.startAt)}`,
    },
    {
      id: 'expiredAt',
      type: 'dateTime',
      label: `${intl.formatMessage(messages.expiredAt)}`,
    },
    {
      id: 'action',
      type: 'actions',
      actions: [editAction, deleteAction],
      align: 'right',
    },
  ];

  const fetchDataForPage = payload => {
    const { page, limit } = payload;
    getGiftPackageList({ page, limit });
  };

  const createGiftPackage = () => {
    dispatch(push('/admin/gift-package/create'));
  };

  const editGiftPackage = giftPackageId => {
    dispatch(push(`/admin/gift-package/edit/${giftPackageId}`));
  };

  const onConfirmCancelRemove = () => {
    setGiftPackageRemove(0);
  };

  const onConfirmRemove = () => {
    deleteGiftPackage({ id: giftPackageRemove });
    setGiftPackageRemove(0);
  };

  return (
    <div>
      <Helmet>
        <title>{intl.formatMessage(messages.header)}</title>
        <meta name="description" content="Description of GiftPackageList" />
      </Helmet>

      <Header title={intl.formatMessage(messages.header)}>
        <Button icon="add" onClick={createGiftPackage} />
      </Header>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableAdvance
            columnKey="giftPackageId"
            rows={giftPackageList}
            headerRows={headerRows}
            paging={paging}
            fetchDataForPage={fetchDataForPage}
            refreshData={refreshData}
          />
        </Grid>
      </Grid>

      <AlertDialog
        open={giftPackageRemove !== 0}
        description={intl.formatMessage(messages.confirmDelete)}
        onCancel={onConfirmCancelRemove}
        onConfirm={onConfirmRemove}
      />
    </div>
  );
}

GiftPackageList.propTypes = {
  intl: intlShape,
  dispatch: PropTypes.func,
  giftPackageList: PropTypes.array,
  getGiftPackageList: PropTypes.func,
  deleteGiftPackage: PropTypes.func,
  refreshData: PropTypes.bool,
  paging: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  giftPackageList: makeSelectGiftPackageList(),
  refreshData: makeSelectRefreshData(),
  paging: makeSelectPaging(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getGiftPackageList: payload => dispatch(getListRequest(payload)),
    deleteGiftPackage: payload => dispatch(deleteRequest(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(injectIntl(GiftPackageList));
