/**
 *
 * GiftCode
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Button from 'components/Button';
import TableAdvance from 'components/TableAdvance';
import AlertDialog from 'components/AlertDialog';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectLoading } from 'utils/injectLoading';
import { useInjectToast } from 'utils/injectToast';
import UpdateDialog from './UpdateDialog';

import {
  makeSelectGiftCode,
  makeSelectGiftCodeList,
  makeSelectPaging,
  makeSelectRefreshData,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  getListRequest,
  getRequest,
  addRequest,
  editRequest,
  deleteRequest,
  generateRequest,
  updateDataField,
  cleanDataEdit as cleanDataEditAction,
} from './actions';
import { CONTEXT, LOADING_ACTION_TYPES, TOAST_ACTION_TYPES } from './constants';

export function GiftCodeList(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTION_TYPES);
  useInjectToast(TOAST_ACTION_TYPES);

  const {
    intl,
    giftPackageId,
    giftCode,
    giftCodeList,
    paging,
    setDataField,
    getGiftCodeList,
    getGiftCode,
    addGiftCode,
    editGiftCode,
    deleteGiftCode,
    generateGiftCode,
    cleanDataEdit,
    refreshData,
  } = props;

  const [idRemove, setIdRemove] = useState(0);
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (giftPackageId) {
      fetchData({});
    }
  }, [giftPackageId]);

  useEffect(() => {
    if (refreshData) {
      handleCancelUpdate();
    }
  }, [refreshData]);

  const fetchData = payload => {
    getGiftCodeList({ giftPackageId, ...payload });
  };

  const editAction = id => (
    <Button
      key={`edit-${id}`}
      icon="edit"
      type="iconButton"
      onClick={() => {
        getGiftCode({ id });
        setOpenDialogUpdate(true);
        setEditMode(true);
      }}
    />
  );

  const deleteAction = id => (
    <Button
      key={`delete-${id}`}
      icon="delete"
      type="iconButton"
      onClick={() => {
        setIdRemove(id);
      }}
    />
  );

  const headerRows = [
    {
      id: 'giftCodeId',
      type: 'text',
      label: 'ID',
    },
    {
      id: 'code',
      type: 'text',
      label: `${intl.formatMessage(messages.code)}`,
    },
    {
      id: 'quantity',
      type: 'number',
      label: `${intl.formatMessage(messages.quantity)}`,
      align: 'right',
    },
    {
      id: 'maxUsedPerUser',
      type: 'number',
      label: `${intl.formatMessage(messages.maxUsedPerUser)}`,
      align: 'right',
    },
    {
      id: 'isPublic',
      type: 'checked',
      label: `${intl.formatMessage(messages.isPublic)}`,
      align: 'center',
    },
    {
      id: 'action',
      type: 'actions',
      actions: [editAction, deleteAction],
      align: 'right',
    },
  ];

  const actions = [
    <div key={2} style={{ flexGrow: 1 }} />,
    <Button
      key={1}
      icon="add"
      name="Thêm mã quà tặng"
      onClick={() => setOpenDialogUpdate(true)}
    />,
  ];

  const handleOnChange = name => event => {
    let dataField;
    let removeField = [];
    switch (name) {
      case 'maxUsedPerUser':
      case 'quantity': {
        const { value } = event.target;
        if (isEmpty(value)) {
          removeField = [name];
        } else {
          dataField = {
            [name]: Number(value),
          };
        }
        break;
      }
      case 'isPublic': {
        dataField = { [name]: event.target.checked };
        break;
      }
      default:
        dataField = { [name]: event.target.value };
        break;
    }
    setDataField({ dataField, removeField });
  };

  const handleOnSave = () => {
    if (editMode) {
      editGiftCode();
    } else {
      addGiftCode({ giftPackageId });
    }
  };

  const handleCancelUpdate = () => {
    setOpenDialogUpdate(false);
    setEditMode(false);
    cleanDataEdit();
  };

  const onConfirmCancelRemove = () => {
    setIdRemove(0);
  };

  const onConfirmRemove = () => {
    deleteGiftCode({ id: idRemove });
    setIdRemove(0);
  };

  return (
    <>
      <TableAdvance
        name={intl.formatMessage(messages.list)}
        columnKey="giftCodeId"
        headerRows={headerRows}
        rows={giftCodeList}
        paging={paging}
        fetchDataForPage={fetchData}
        refreshData={refreshData}
        actions={actions}
      />
      <UpdateDialog
        open={openDialogUpdate}
        editMode={editMode}
        giftCode={giftCode}
        generateGiftCode={generateGiftCode}
        onChangeDataField={handleOnChange}
        onCancel={handleCancelUpdate}
        onAgree={handleOnSave}
      />
      <AlertDialog
        open={idRemove !== 0}
        description={intl.formatMessage(messages.confirmDelete)}
        onCancel={onConfirmCancelRemove}
        onConfirm={onConfirmRemove}
      />
    </>
  );
}

GiftCodeList.propTypes = {
  intl: intlShape,
  giftPackageId: PropTypes.number,
  giftCode: PropTypes.object,
  giftCodeList: PropTypes.array,
  paging: PropTypes.object,
  getGiftCodeList: PropTypes.func,
  getGiftCode: PropTypes.func,
  addGiftCode: PropTypes.func,
  editGiftCode: PropTypes.func,
  deleteGiftCode: PropTypes.func,
  generateGiftCode: PropTypes.func,
  setDataField: PropTypes.func,
  cleanDataEdit: PropTypes.func,
  refreshData: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  giftCode: makeSelectGiftCode(),
  giftCodeList: makeSelectGiftCodeList(),
  paging: makeSelectPaging(),
  refreshData: makeSelectRefreshData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getGiftCodeList: payload => dispatch(getListRequest(payload)),
    getGiftCode: payload => dispatch(getRequest(payload)),
    addGiftCode: payload => dispatch(addRequest(payload)),
    editGiftCode: () => dispatch(editRequest()),
    deleteGiftCode: payload => dispatch(deleteRequest(payload)),
    generateGiftCode: payload => dispatch(generateRequest(payload)),
    setDataField: payload => dispatch(updateDataField(payload)),
    cleanDataEdit: () => dispatch(cleanDataEditAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(injectIntl(GiftCodeList));
