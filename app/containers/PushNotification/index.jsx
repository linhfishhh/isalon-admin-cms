/**
 *
 * PushNotification
 *
 */

import React, { memo, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { injectIntl, intlShape } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import Button from 'components/Button';
import Header from 'components/Header';
import TableAdvance from 'components/TableAdvance';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectLoading } from 'utils/injectLoading';
import { useInjectToast } from 'utils/injectToast';
import {
  makeSelectNotificationList,
  makeSelectPaging,
  makeSelectRefreshData,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { CONTEXT, LOADING_ACTION_TYPES, TOAST_ACTION_TYPES } from './constants';
import {
  getNotificationListRequest,
  deleteNotificationRequest,
  pushSystemNotificationRequest,
} from './actions';
import AddNotificationDialog from './views/AddNotificationDialog';

function PushNotification(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTION_TYPES);
  useInjectToast(TOAST_ACTION_TYPES);

  const {
    intl,
    notificationList,
    getNotificationList,
    paging,
    refreshData,
    deleteNotification,
    pushNotification,
  } = props;

  const [openAddDialog, setOpenAddDialog] = useState(false);

  const deleteAction = id => (
    <Button
      key={`delete-${id}`}
      icon="delete"
      type="iconButton"
      onClick={() => deleteNotification(id)}
    />
  );

  const headerRows = useMemo(
    () => [
      {
        id: 'userNotificationId',
        type: 'text',
        label: 'ID',
      },
      {
        id: 'message',
        type: 'text',
        label: 'Nội dung',
      },
      {
        id: 'createdDate',
        type: 'dateTime',
        label: 'Ngày tạo',
      },
      {
        id: 'action',
        type: 'actions',
        actions: [deleteAction],
        align: 'right',
      },
    ],
    [],
  );

  useEffect(() => {
    getNotificationList();
  }, []);

  const fetchDataForPage = p => {
    const { page, limit } = p;
    getNotificationList(page, limit);
  };

  const addNewNotification = () => {
    setOpenAddDialog(true);
  };

  const cancelPushNotification = () => {
    setOpenAddDialog(false);
  };
  const onPushNotification = ({
    title,
    body,
    isSaved,
    targetType = 'SEGMENTS',
    targetIds = ['All'],
    tenantId = 'isalon',
  }) => {
    pushNotification({
      title,
      body,
      isSaved,
      targetType,
      targetIds,
      tenantId,
      data: {
        type: 'SYSTEM',
      },
    });
    setOpenAddDialog(false);
  };

  return (
    <div>
      <Helmet>
        <title>Thông báo</title>
        <meta name="description" content="Thông báo" />
      </Helmet>

      <Header title={intl.formatMessage(messages.header)}>
        <Button icon="add" onClick={addNewNotification} />
      </Header>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableAdvance
            columnKey="userNotificationId"
            rows={notificationList}
            headerRows={headerRows}
            paging={paging}
            fetchDataForPage={fetchDataForPage}
            refreshData={refreshData}
          />
        </Grid>
      </Grid>

      <AddNotificationDialog
        onCancel={cancelPushNotification}
        onPush={onPushNotification}
        open={openAddDialog}
      />
    </div>
  );
}

PushNotification.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape,
  getNotificationList: PropTypes.func,
  notificationList: PropTypes.array,
  paging: PropTypes.object,
  refreshData: PropTypes.bool,
  deleteNotification: PropTypes.func,
  pushNotification: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  notificationList: makeSelectNotificationList(),
  paging: makeSelectPaging(),
  refreshData: makeSelectRefreshData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getNotificationList: (page, limit) =>
      dispatch(getNotificationListRequest({ page, limit })),
    deleteNotification: id => dispatch(deleteNotificationRequest({ id })),
    pushNotification: params => dispatch(pushSystemNotificationRequest(params)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(injectIntl(PushNotification));
