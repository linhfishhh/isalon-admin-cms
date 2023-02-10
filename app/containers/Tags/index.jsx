/**
 *
 * Tags
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, remove } from 'lodash';
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
import ComboBox from 'components/ComboBox';
import SideView from 'components/SideView';
import TableAdvance from 'components/TableAdvance';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectLoading } from 'utils/injectLoading';
import validation from 'utils/validation';
import { makeSelectTagsList, makeSelectRefreshData } from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getListRequest,
  addRequest,
  editRequest,
  deleteRequest,
} from './actions';
import { CONTEXT, LOADING_ACTION_TYPES } from './constants';

import messages from './messages';

export function Tags(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTION_TYPES);

  const dataEmpty = { tag: '' };

  const {
    intl,
    type,
    nameLabel,
    getTagsList,
    tagsList,
    selectedTags,
    refreshData,
    onChange,
    addTags,
    editTags,
    deleteTags,
  } = props;

  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [validate, setValidate] = useState({});
  const [openSideBottom, setOpenSideBottom] = useState(false);
  const [removeId, setRemoveId] = useState(0);
  const [dataUpdate, setDataUpdate] = useState(dataEmpty);
  const [newSelectedTag, setNewSelectedTag] = useState([]);

  useEffect(() => {
    getTagsList({ limit: 100, type });
  }, []);

  useEffect(() => {
    if (refreshData) {
      getTagsList({ limit: 100, type });
    }
    if (removeId) {
      remove(newSelectedTag, id => id === `${removeId}`);
      setNewSelectedTag(newSelectedTag);
      const checked = tagsList.filter(item =>
        newSelectedTag.includes(`${item.productTagId}`),
      );
      onChange(checked);
      setRemoveId(0);
    }
  }, [refreshData]);

  useEffect(() => {
    setNewSelectedTag(selectedTags);
  }, [selectedTags]);

  const validateField = model => {
    const option = [
      {
        type: 'empty',
        model,
        keys: ['tag'],
      },
    ];
    const result = validation(option);
    setValidate(result);
    return isEmpty(result);
  };

  const editAction = id => (
    <Button
      key={`edit-${id}`}
      icon="edit"
      type="iconButton"
      fontSize="small"
      onClick={() => {
        const result = tagsList.find(item => item.productTagId === id);
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
      type="iconButton"
      fontSize="small"
      onClick={() => setRemoveId(id)}
    />
  );

  const headerRows = [
    {
      id: 'tag',
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

  const handleCancelUpdate = () => {
    setOpenSideBottom(false);
    setValidate({});
    setDataUpdate(dataEmpty);
    setEditMode(false);
  };

  const handleSave = () => {
    const noValidate = validateField(dataUpdate);
    if (noValidate) {
      if (editMode) {
        editTags({ data: dataUpdate });
      } else {
        const data = { tag: dataUpdate.tag };
        data.type = type;
        addTags({ data });
      }
      handleCancelUpdate();
    }
  };

  const handleOnChangeDataField = name => event => {
    const result = { ...dataUpdate, ...{ [name]: event.target.value } };
    setDataUpdate(result);
  };

  const onConfirmCancelRemove = () => {
    setRemoveId(0);
  };

  const onConfirmRemove = () => {
    deleteTags({ id: removeId });
  };

  const handleCancelAction = () => {
    setOpenDialog(false);
  };

  const handleChangeSelected = selectedList => {
    const results = selectedList.map(item => `${item}`);
    setNewSelectedTag(results);
  };

  const handleAgreeAction = () => {
    const checked = tagsList.filter(item =>
      newSelectedTag.includes(`${item.productTagId}`),
    );
    onChange(checked);
    setOpenDialog(false);
  };

  return (
    <>
      <ComboBox
        multiple
        nameLabel={nameLabel}
        dataSource={tagsList}
        dataTextField="tag"
        dataValueField="productTagId"
        selectedValue={selectedTags}
        onSelectedChange={onChange}
        addMoreOption={() => setOpenDialog(true)}
      />
      <Dialog
        open={openDialog}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{nameLabel}</DialogTitle>
        <DialogContent dividers>
          <TableAdvance
            name={`Danh sách ${nameLabel.toLowerCase()}`}
            columnKey="productTagId"
            rows={tagsList}
            headerRows={headerRows}
            options={{
              showPaging: false,
              allowSelection: true,
              selectedDataRow: false,
              showTextRowsSelected: false,
              clickRowToSelect: true,
            }}
            selectedList={
              selectedTags ? selectedTags.map(item => Number(item)) : []
            }
            actions={actions}
            onSelectionChange={handleChangeSelected}
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
                      label="Tên"
                      fullWidth
                      value={dataUpdate.tag}
                      onChange={handleOnChangeDataField('tag')}
                      error={validate.tag && validate.tag.error}
                      helperText={
                        validate.tag &&
                        intl.formatMessage(messages[validate.tag.helperText])
                      }
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
            onClick={handleCancelAction}
            color="default"
          />
          <Button
            icon="agree"
            options={{ showIcon: false }}
            onClick={handleAgreeAction}
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

Tags.propTypes = {
  intl: intlShape,
  type: PropTypes.string,
  nameLabel: PropTypes.string,
  tagsList: PropTypes.array,
  getTagsList: PropTypes.func,
  selectedTags: PropTypes.array,
  refreshData: PropTypes.bool,
  onChange: PropTypes.func,
  addTags: PropTypes.func,
  editTags: PropTypes.func,
  deleteTags: PropTypes.func,
};

const mapStateToProps = (state, props) =>
  createStructuredSelector({
    tagsList: makeSelectTagsList(props.type),
    refreshData: makeSelectRefreshData(),
  });

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getTagsList: payload => dispatch(getListRequest(payload)),
    addTags: payload => dispatch(addRequest(payload)),
    editTags: payload => dispatch(editRequest(payload)),
    deleteTags: payload => dispatch(deleteRequest(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(injectIntl(Tags));
