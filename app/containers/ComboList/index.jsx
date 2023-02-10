/**
 *
 * ComboList
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { injectIntl, intlShape } from 'react-intl';
import { Grid } from '@material-ui/core';
import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import TableAdvance from 'components/TableAdvance';
import AlertDialog from 'components/AlertDialog';
import Button from 'components/Button';
import Header from 'components/Header';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectLoading } from 'utils/injectLoading';
import { useInjectToast } from 'utils/injectToast';

import {
  makeSelectComboList,
  makeSelectPaging,
  makeSelectRefreshData,
} from './selectors';
import { getListRequest, deleteRequest } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { CONTEXT, LOADING_ACTION_TYPES, TOAST_ACTION_TYPES } from './constants';

export function ComboList(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTION_TYPES);
  useInjectToast(TOAST_ACTION_TYPES);

  const {
    intl,
    dispatch,
    comboList,
    paging,
    getComboList,
    deleteCombo,
    refreshData,
  } = props;

  const [comboRemove, setComboRemove] = useState(0);

  useEffect(() => {
    getComboList({});
  }, []);

  const editAction = id => (
    <Button
      key={`edit-${id}`}
      icon="edit"
      type="iconButton"
      onClick={() => editCombo(id)}
    />
  );

  const deleteAction = id => (
    <Button
      key={`delete-${id}`}
      icon="delete"
      type="iconButton"
      onClick={() => setComboRemove(id)}
    />
  );

  const headerRows = [
    {
      id: 'productComboId',
      type: 'text',
      label: 'ID',
    },
    {
      id: 'name',
      type: 'text',
      label: 'Tên',
    },
    {
      id: 'comboNumber',
      type: 'text',
      label: 'Số lượng',
    },
    {
      id: 'comboPercent',
      type: 'text',
      label: 'Phần trăm',
    },
    {
      id: 'action',
      type: 'actions',
      actions: [editAction, deleteAction],
      align: 'right',
    },
  ];

  const createCombo = () => {
    dispatch(push('/admin/combo/create'));
  };

  const editCombo = comboId => {
    dispatch(push(`/admin/combo/edit/${comboId}`));
  };

  const onConfirmCancelRemove = () => {
    setComboRemove(0);
  };

  const onConfirmRemove = () => {
    deleteCombo({ id: comboRemove });
    setComboRemove(0);
  };

  return (
    <div>
      <Helmet>
        <title>{intl.formatMessage(messages.header)}</title>
        <meta name="description" content="Description of ComboList" />
      </Helmet>
      <Header title={intl.formatMessage(messages.header)}>
        <Button icon="add" onClick={createCombo} />
      </Header>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableAdvance
            columnKey="productComboId"
            rows={comboList}
            headerRows={headerRows}
            paging={paging}
            fetchDataForPage={getComboList}
            refreshData={refreshData}
          />
        </Grid>
      </Grid>
      <AlertDialog
        open={comboRemove !== 0}
        description={intl.formatMessage(messages.confirmDelete)}
        onCancel={onConfirmCancelRemove}
        onConfirm={onConfirmRemove}
      />
    </div>
  );
}

ComboList.propTypes = {
  intl: intlShape,
  dispatch: PropTypes.func,
  comboList: PropTypes.array,
  paging: PropTypes.object,
  getComboList: PropTypes.func,
  deleteCombo: PropTypes.func,
  refreshData: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  comboList: makeSelectComboList(),
  paging: makeSelectPaging(),
  refreshData: makeSelectRefreshData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getComboList: payload => dispatch(getListRequest(payload)),
    deleteCombo: payload => dispatch(deleteRequest(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(injectIntl(ComboList));
