/**
 *
 * VariantDialog
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { set, isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Card,
  CardContent,
} from '@material-ui/core';

import AlertDialog from 'components/AlertDialog';
import Button from 'components/Button';
import TabsAdvance from 'components/TabsAdvance';
import TableAdvance from 'components/TableAdvance';
import SideView from 'components/SideView';
import ComboBox from 'components/ComboBox';

import validation from 'utils/validation';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectLoading } from 'utils/injectLoading';
import { useInjectToast } from 'utils/injectToast';

import reducer from './reducer';
import saga from './saga';
import { CONTEXT, LOADING_ACTION_TYPES, TOAST_ACTION_TYPES } from './constants';
import messages from './messages';
import {
  addRequest,
  editRequest,
  deleteRequest,
  addValueRequest,
  editValueRequest,
  deleteValueRequest,
  didRefresh as didRefreshAction,
} from './actions';
import { makeSelectRefresh } from './selectors';

const tabList = [
  { id: 'variant', name: 'Chọn thuộc tính' },
  { id: 'variantValue', name: 'Thêm giá trị mới' },
];

export function VariantDialog(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTION_TYPES);
  useInjectToast(TOAST_ACTION_TYPES);

  const {
    intl,
    open,
    onCancel,
    variantList,
    variantSelectedList,
    onAgree,
    addVariant,
    editVariant,
    deleteVariant,
    addVariantValue,
    editVariantValue,
    deleteVariantValue,
    refresh,
    refreshData,
    didRefresh,
    variantAddValue,
  } = props;

  const dataEmpty = { name: '' };

  const [activeTab, setActiveTab] = useState(tabList[0]);
  const [variantSelected, setVariantSelected] = useState([]);
  const [variantAddNewValue, setVariantAddNewValue] = useState();
  const [editMode, setEditMode] = useState(false);
  const [validate, setValidate] = useState({});
  const [openSideBottom, setOpenSideBottom] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(dataEmpty);
  const [removeId, setRemoveId] = useState(0);

  const validateField = model => {
    const option = [
      {
        type: 'empty',
        model,
        keys: ['name'],
      },
    ];
    const result = validation(option);
    setValidate(result);
    return isEmpty(result);
  };

  useEffect(() => {
    if (refresh) {
      refreshData(refresh);
    }
  }, [refresh]);

  useEffect(() => {
    if (isEmpty(variantAddValue)) {
      setActiveTab(tabList[0]);
    } else {
      setVariantAddNewValue(variantAddValue);
      setActiveTab(tabList[1]);
    }
  }, [variantAddValue]);

  useEffect(() => {
    didRefresh();
    if (variantAddNewValue) {
      const currentVariant = variantList.find(
        item => item.variantId === variantAddNewValue.variantId,
      );
      setVariantAddNewValue(currentVariant);
    }
    if (variantSelected.length) {
      const variantSelectIds = variantSelected.map(item => item.variantId);
      const newVariantSelect = variantList.filter(item =>
        variantSelectIds.includes(item.variantId),
      );
      setVariantSelected(newVariantSelect);
    }
  }, [variantList]);

  const handleAgreeAction = () => {
    onAgree(variantSelected);
  };

  const handleSave = () => {
    const data = { name: dataUpdate.name };
    const noValidate = validateField(data);
    if (noValidate) {
      if (editMode) {
        if (activeTab.id === 'variant') {
          set(data, 'variantId', dataUpdate.variantId);
          editVariant({ data });
        } else {
          set(data, 'variantId', dataUpdate.variantId);
          set(data, 'variantValueId', dataUpdate.variantValueId);
          editVariantValue({ data });
        }
      } else if (activeTab.id === 'variant') {
        addVariant({ data });
      } else {
        set(data, 'variantId', variantAddNewValue.variantId);
        addVariantValue({ data });
      }
      handleCancelUpdate();
    }
  };

  const handleCancelUpdate = () => {
    setOpenSideBottom(false);
    setValidate({});
    setDataUpdate(dataEmpty);
    setEditMode(false);
  };

  const handleOnChangeDataField = name => event => {
    const result = { ...dataUpdate, ...{ [name]: event.target.value } };
    setDataUpdate(result);
  };

  const onConfirmCancelRemove = () => {
    setRemoveId(0);
  };

  const onConfirmRemove = () => {
    if (activeTab.id === 'variant') {
      if (variantAddNewValue && variantAddNewValue.variantId === removeId) {
        setVariantAddNewValue();
      }
      deleteVariant({ id: removeId });
    } else {
      deleteVariantValue({ id: removeId });
    }
    setRemoveId(0);
  };

  const variantContent = () => {
    const editAction = id => (
      <Button
        key={`edit-${id}`}
        icon="edit"
        fontSize="small"
        type="iconButton"
        onClick={() => {
          const result = variantList.find(item => item.variantId === id);
          setDataUpdate(result);
          setEditMode(true);
          setOpenSideBottom(true);
        }}
      />
    );

    const deleteAction = id => (
      <Button
        icon="delete"
        fontSize="small"
        type="iconButton"
        key={`delete-${id}`}
        onClick={() => {
          setRemoveId(id);
        }}
      />
    );
    const headerRows = [
      {
        id: 'name',
        type: 'text',
        label: 'Tên',
      },
      {
        id: 'action',
        type: 'actions',
        actions: [editAction, deleteAction],
        align: 'right',
      },
    ];

    const actions = [
      <div key={1} style={{ flexGrow: 1 }} />,
      <Button
        key={2}
        icon="add"
        fontSize="small"
        onClick={() => setOpenSideBottom(true)}
      />,
    ];

    return (
      <TableAdvance
        columnKey="variantId"
        rows={variantList}
        headerRows={headerRows}
        options={{
          allowSelection: true,
          showPaging: false,
          showTextRowsSelected: false,
          clickRowToSelect: true,
        }}
        actions={actions}
        selectedList={variantSelectedList}
        onSelectionChange={rows => setVariantSelected(rows)}
      />
    );
  };

  const variantValueContent = () => {
    const editAction = id => (
      <Button
        key={`edit-${id}`}
        icon="edit"
        type="iconButton"
        fontSize="small"
        onClick={() => {
          const result = variantAddNewValue.variantValues.find(
            item => item.variantValueId === id,
          );
          setDataUpdate(result);
          setEditMode(true);
          setOpenSideBottom(true);
        }}
      />
    );

    const deleteAction = id => (
      <Button
        key={`delete-${id}`}
        icon="delete"
        fontSize="small"
        type="iconButton"
        onClick={() => {
          setRemoveId(id);
        }}
      />
    );
    const headerRows = [
      {
        id: 'name',
        type: 'text',
        label: 'Giá trị',
      },
      {
        id: 'action',
        type: 'actions',
        actions: [editAction, deleteAction],
        align: 'right',
      },
    ];

    const actions = [
      <Grid container key={1}>
        <Grid item sm={8}>
          <ComboBox
            key={1}
            nameLabel="Thuộc tính"
            dataSource={variantList}
            dataTextField="name"
            dataValueField="variantId"
            selectedValue={
              variantAddNewValue && `${variantAddNewValue.variantId}`
            }
            onSelectedChange={item => setVariantAddNewValue(item)}
            disabledPadding
          />
        </Grid>
        <Grid item xs />
        <Grid item>
          <Button
            icon="add"
            fontSize="small"
            key={3}
            onClick={() => setOpenSideBottom(true)}
            disabled={!variantAddNewValue}
          />
        </Grid>
      </Grid>,
    ];

    return (
      <TableAdvance
        columnKey="variantValueId"
        rows={variantAddNewValue ? variantAddNewValue.variantValues : []}
        headerRows={headerRows}
        options={{
          showPaging: false,
        }}
        actions={actions}
      />
    );
  };

  const renderContentTab = itemData => {
    if (itemData.id === 'variant') {
      return variantContent();
    }
    return variantValueContent();
  };

  return (
    <>
      <Dialog
        open={open}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{intl.formatMessage(messages.header)}</DialogTitle>
        <DialogContent dividers>
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
          <SideView
            open={openSideBottom}
            size={100}
            onClose={handleCancelUpdate}
          >
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <TextField
                      required
                      variant="outlined"
                      label={activeTab.id === 'variant' ? 'Tên' : 'Giá trị'}
                      fullWidth
                      value={dataUpdate.name}
                      onChange={handleOnChangeDataField('name')}
                      error={validate.name && validate.name.error}
                      helperText={
                        validate.name &&
                        intl.formatMessage(messages[validate.name.helperText])
                      }
                      inputProps={{ maxLength: '32' }}
                    />
                  </Grid>
                  <Grid container item xs={4} justify="center">
                    <Grid item>
                      <Button icon="save" onClick={handleSave} />
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </SideView>
        </DialogContent>
        <DialogActions>
          <Button
            icon="cancel"
            options={{ showIcon: false }}
            onClick={onCancel}
            color="default"
          />
          <Button
            icon="agree"
            options={{ showIcon: false }}
            onClick={handleAgreeAction}
            disabled={activeTab && activeTab.id === 2}
          />
        </DialogActions>
      </Dialog>
      <AlertDialog
        open={removeId > 0}
        description={intl.formatMessage(messages.confirmDelete)}
        onCancel={onConfirmCancelRemove}
        onConfirm={onConfirmRemove}
      />
    </>
  );
}

VariantDialog.propTypes = {
  intl: intlShape,
  open: PropTypes.bool,
  onCancel: PropTypes.func,
  variantList: PropTypes.array,
  variantSelectedList: PropTypes.array,
  onAgree: PropTypes.func,
  addVariant: PropTypes.func,
  editVariant: PropTypes.func,
  deleteVariant: PropTypes.func,
  addVariantValue: PropTypes.func,
  editVariantValue: PropTypes.func,
  deleteVariantValue: PropTypes.func,
  refreshData: PropTypes.func,
  refresh: PropTypes.bool,
  didRefresh: PropTypes.func,
  variantAddValue: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  refresh: makeSelectRefresh(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    addVariant: payload => dispatch(addRequest(payload)),
    editVariant: payload => dispatch(editRequest(payload)),
    deleteVariant: payload => dispatch(deleteRequest(payload)),
    addVariantValue: payload => dispatch(addValueRequest(payload)),
    editVariantValue: payload => dispatch(editValueRequest(payload)),
    deleteVariantValue: payload => dispatch(deleteValueRequest(payload)),
    didRefresh: () => dispatch(didRefreshAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(injectIntl(VariantDialog));
