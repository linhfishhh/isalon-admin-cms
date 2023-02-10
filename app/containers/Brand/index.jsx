/**
 *
 * Brand
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectLoading } from 'utils/injectLoading';
import { useInjectToast } from 'utils/injectToast';
import Header from 'components/Header';
import Button from 'components/Button';
import { Grid } from '@material-ui/core';
import TableAdvance from 'components/TableAdvance';
import AlertDialog from 'components/AlertDialog';
import UpdateDialog from './UpdateDialog';
import {
  makeSelectBrand,
  makeSelectBrandList,
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
  updateDataField,
  cleanDataEdit as cleanDataEditAction,
} from './actions';
import { CONTEXT, LOADING_ACTION_TYPES, TOAST_ACTION_TYPES } from './constants';

export function Brand(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTION_TYPES);
  useInjectToast(TOAST_ACTION_TYPES);

  const {
    intl,
    brand,
    brandList,
    paging,
    setDataField,
    getBrandList,
    getBrand,
    addBrand,
    editBrand,
    deleteBrand,
    cleanDataEdit,
    refreshData,
  } = props;

  const [idRemove, setIdRemove] = useState(0);
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getBrandList({});
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
        getBrand({ id });
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
      id: 'brandId',
      type: 'text',
      label: 'ID',
    },
    {
      id: 'imageSource',
      type: 'image',
      label: 'Logo',
    },
    {
      id: 'name',
      type: 'text',
      label: `${intl.formatMessage(messages.name)}`,
    },
    {
      id: 'action',
      type: 'actions',
      actions: [editAction, deleteAction],
      align: 'right',
    },
  ];

  const handleOnChange = name => event => {
    let dataField;
    switch (name) {
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
      editBrand();
    } else {
      addBrand();
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
    deleteBrand({ id: idRemove });
    setIdRemove(0);
  };

  return (
    <div>
      <Helmet>
        <title>{intl.formatMessage(messages.header)}</title>
        <meta name="description" content="Description of Brand" />
      </Helmet>

      <Header title={intl.formatMessage(messages.header)}>
        <Button icon="add" onClick={() => setOpenDialogUpdate(true)} />
      </Header>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableAdvance
            name={intl.formatMessage(messages.list)}
            columnKey="brandId"
            headerRows={headerRows}
            rows={brandList}
            paging={paging}
            fetchDataForPage={getBrandList}
            refreshData={refreshData}
          />
        </Grid>
      </Grid>
      <UpdateDialog
        open={openDialogUpdate}
        editMode={editMode}
        brand={brand}
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

Brand.propTypes = {
  intl: intlShape,
  brand: PropTypes.object,
  brandList: PropTypes.array,
  paging: PropTypes.object,
  getBrandList: PropTypes.func,
  getBrand: PropTypes.func,
  addBrand: PropTypes.func,
  editBrand: PropTypes.func,
  deleteBrand: PropTypes.func,
  setDataField: PropTypes.func,
  cleanDataEdit: PropTypes.func,
  refreshData: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  brand: makeSelectBrand(),
  brandList: makeSelectBrandList(),
  paging: makeSelectPaging(),
  refreshData: makeSelectRefreshData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getBrandList: payload => dispatch(getListRequest(payload)),
    getBrand: payload => dispatch(getRequest(payload)),
    addBrand: () => dispatch(addRequest()),
    editBrand: () => dispatch(editRequest()),
    deleteBrand: payload => dispatch(deleteRequest(payload)),
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
)(injectIntl(Brand));
