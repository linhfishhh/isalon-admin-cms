/**
 *
 * Category
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import Header from 'components/Header';
import Button from 'components/Button';
import { Grid } from '@material-ui/core';
import TableAdvance from 'components/TableAdvance';
import AlertDialog from 'components/AlertDialog';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectLoading } from 'utils/injectLoading';
import { useInjectToast } from 'utils/injectToast';

import UpdateDialog from './UpdateDialog';
import {
  makeSelectCategory,
  makeSelectCategoryList,
  makeSelectPaging,
  makeSelectRefreshData,
  makeSelectCategoryParentList,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  getListRequest,
  getListParentRequest,
  getRequest,
  addRequest,
  editRequest,
  deleteRequest,
  cleanDataEdit as cleanDataEditAction,
  updateDataField,
} from './actions';
import { CONTEXT, LOADING_ACTION_TYPES, TOAST_ACTION_TYPES } from './constants';

export function Category(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTION_TYPES);
  useInjectToast(TOAST_ACTION_TYPES);

  const {
    intl,
    dispatch,
    category,
    categoryList,
    parentList,
    paging,
    setDataField,
    getCategoryList,
    getCategoryParentList,
    getCategory,
    addCategory,
    editCategory,
    deleteCategory,
    cleanDataEdit,
    refreshData,
  } = props;

  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);
  const [idRemove, setIdRemove] = useState(0);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getCategoryList({});
    getCategoryParentList({ limit: 100 });
  }, []);

  useEffect(() => {
    if (refreshData) {
      handleCancelUpdate();
    }
  }, [refreshData]);

  const editAction = id => (
    <Button
      key={`edit-${id}`}
      icon="edit"
      type="iconButton"
      onClick={() => {
        getCategory({ id });
        setEditMode(true);
        setOpenDialogUpdate(true);
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

  const productInCategory = id => (
    <Button
      variant="outlined"
      key={`detail-${id}`}
      icon="detail"
      name="Danh sách sản phẩm"
      type="iconButton"
      onClick={() => {
        dispatch(push(`category/${id}/products`));
      }}
    />
  );

  const headerRows = [
    {
      id: 'categoryId',
      type: 'text',
      label: 'ID',
    },
    {
      id: 'imageSource',
      type: 'image',
      label: `Ảnh đại diện`,
    },
    {
      id: 'name',
      type: 'text',
      label: `${intl.formatMessage(messages.name)}`,
    },
    {
      id: 'parent.name',
      type: 'text',
      label: `${intl.formatMessage(messages.parents)}`,
    },
    {
      id: 'action',
      type: 'actions',
      actions: [productInCategory, editAction, deleteAction],
      align: 'right',
    },
  ];

  const handleOnChange = name => event => {
    let dataField;
    switch (name) {
      case 'categoryId': {
        if (event) {
          dataField = {
            parentId: event[name],
          };
        } else {
          dataField = { removeField: 'parentId' };
        }
        break;
      }
      case 'images': {
        dataField = { [name]: event };
        break;
      }
      default:
        dataField = { [name]: event.target.value };
        break;
    }
    setDataField(dataField);
  };

  const handleOnSave = () => {
    if (editMode) {
      editCategory();
    } else {
      addCategory();
    }
  };

  const handleCancelUpdate = () => {
    setEditMode(false);
    setOpenDialogUpdate(false);
    cleanDataEdit();
  };

  const onConfirmCancelRemove = () => {
    setIdRemove(0);
  };

  const onConfirmRemove = () => {
    deleteCategory({ id: idRemove });
    setIdRemove(0);
  };

  return (
    <div>
      <Helmet>
        <title>{intl.formatMessage(messages.header)}</title>
        <meta name="description" content="Description of Category" />
      </Helmet>

      <Header title={intl.formatMessage(messages.header)}>
        <Button icon="add" onClick={() => setOpenDialogUpdate(true)} />
      </Header>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableAdvance
            name={intl.formatMessage(messages.list)}
            columnKey="categoryId"
            headerRows={headerRows}
            rows={categoryList}
            paging={paging}
            fetchDataForPage={getCategoryList}
            refreshData={refreshData}
          />
        </Grid>
      </Grid>
      <UpdateDialog
        open={openDialogUpdate}
        editMode={editMode}
        category={category}
        parentList={parentList}
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
    </div>
  );
}

Category.propTypes = {
  intl: intlShape,
  dispatch: PropTypes.func,
  category: PropTypes.object,
  categoryList: PropTypes.array,
  parentList: PropTypes.array,
  paging: PropTypes.object,
  getCategoryList: PropTypes.func,
  getCategoryParentList: PropTypes.func,
  getCategory: PropTypes.func,
  addCategory: PropTypes.func,
  editCategory: PropTypes.func,
  deleteCategory: PropTypes.func,
  setDataField: PropTypes.func,
  cleanDataEdit: PropTypes.func,
  refreshData: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  category: makeSelectCategory(),
  categoryList: makeSelectCategoryList(),
  parentList: makeSelectCategoryParentList(),
  paging: makeSelectPaging(),
  refreshData: makeSelectRefreshData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getCategoryList: payload => dispatch(getListRequest(payload)),
    getCategoryParentList: payload => dispatch(getListParentRequest(payload)),
    getCategory: payload => dispatch(getRequest(payload)),
    addCategory: () => dispatch(addRequest()),
    editCategory: () => dispatch(editRequest()),
    deleteCategory: payload => dispatch(deleteRequest(payload)),
    cleanDataEdit: () => dispatch(cleanDataEditAction()),
    setDataField: payload => dispatch(updateDataField(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(injectIntl(Category));
