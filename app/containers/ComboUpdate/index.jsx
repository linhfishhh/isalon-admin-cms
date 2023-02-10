/**
 *
 * ComboUpdate
 *
 */

import React, { memo, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, isEmpty, debounce } from 'lodash';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  Grid,
  TextField,
} from '@material-ui/core';
import CKEditor from 'ckeditor4-react';

import TableAdvance from 'components/TableAdvance';
import AlertDialog from 'components/AlertDialog';
import Header from 'components/Header';
import Button from 'components/Button';
import NumberFormatInput from 'components/NumberFormatInput';

import validation from 'utils/validation';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectLoading } from 'utils/injectLoading';
import { useInjectToast } from 'utils/injectToast';

import UpdateProductDialog from './UpdateProductDialog';
import {
  makeSelectCombo,
  makeSelectShouldUpdate,
  makeSelectProductList,
  makeSelectPaging,
  makeSelectProductComboList,
  makeSelectProductComboPaging,
  makeSelectRefresh,
} from './selectors';
import {
  getProductListRequest,
  getProductComboListRequest,
  addRequest,
  getRequest,
  editRequest,
  updateDataField,
  addProductRequest,
  removeProductRequest,
  cleanDataAction,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { CONTEXT, LOADING_ACTION_TYPES, TOAST_ACTION_TYPES } from './constants';

export function ComboUpdate(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTION_TYPES);
  useInjectToast(TOAST_ACTION_TYPES);

  const {
    match,
    dispatch,
    intl,
    combo,
    setDataField,
    addCombo,
    editCombo,
    getCombo,
    shouldUpdate,
    productList,
    getProductList,
    paging,
    productComboList,
    getProductComboList,
    productComboPaging,
    addProduct,
    removeProduct,
    refreshData,
    cleanData,
  } = props;

  const [validate, setValidate] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [openCancelConfirm, setOpenCancelConfirm] = useState(false);
  const [productId, setProductId] = useState(0);
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);
  const [searchKey, setSearchKey] = useState('');

  const comboId = get(match, 'params.comboId');

  useEffect(() => {
    getProductList({});
    if (comboId) {
      getCombo({ id: comboId });
    }
    return () => {
      cleanData();
    };
  }, []);

  useEffect(() => {
    if (shouldUpdate) {
      setEditMode(true);
    }
  }, [shouldUpdate]);

  useEffect(() => {
    if (refreshData) {
      setOpenDialogUpdate(false);
    }
  }, [refreshData]);

  useEffect(() => {
    if (editMode) {
      getProductComboList({
        id: combo.productComboId,
      });
    }
  }, [editMode]);

  const fetchDataTable = payload => {
    const { page, limit } = payload;
    if (editMode) {
      getProductComboList({ id: combo.productComboId, page, limit });
    } else {
      getProductList({ page, limit, search: searchKey });
    }
  };

  const validateField = () => {
    const option = [
      {
        type: 'empty',
        model: combo,
        keys: ['name'],
      },
    ];
    const result = validation(option);
    setValidate(result);
    return isEmpty(result);
  };

  const handleOnChangeDataField = name => event => {
    let dataField;
    switch (name) {
      case 'productIds': {
        dataField = { [name]: event };
        break;
      }
      case 'description': {
        dataField = { [name]: event.editor.getData() };
        break;
      }
      default:
        dataField = { [name]: event.target.value };
        break;
    }
    setDataField(dataField);
  };

  const deleteAction = id => (
    <Button
      style={{ display: editMode ? 'inline-flex' : 'none' }}
      key={`delete-${id}`}
      icon="delete"
      type="iconButton"
      onClick={() => setProductId(id)}
    />
  );

  const headerRows = [
    {
      id: 'productId',
      type: 'text',
      label: 'ID',
    },
    {
      id: 'imageSource',
      type: 'image',
      label: 'Ảnh đại diện',
    },
    {
      id: 'name',
      type: 'text',
      label: 'Tên',
    },
    {
      id: 'brand.name',
      type: 'text',
      label: 'Thương hiệu',
    },
    {
      id: 'isAvailable',
      type: 'checked',
      label: 'Sẵn sàng bán',
      align: 'center',
    },
    {
      id: 'action',
      type: 'actions',
      actions: [deleteAction],
      align: 'right',
    },
  ];

  const actions = [
    <div key={1} style={{ flexGrow: 1 }} />,
    <Button
      style={{ display: editMode ? 'flex' : 'none' }}
      icon="add"
      name="Thêm sản phẩm vào combo"
      key={2}
      onClick={() => setOpenDialogUpdate(true)}
    />,
    <TextField
      key={3}
      style={{ width: 300, display: editMode ? 'none' : 'flex' }}
      margin="dense"
      value={searchKey}
      variant="outlined"
      id="product-search"
      label="Tìm kiếm sản phẩm"
      onChange={event => handleOnSearchProduct(event)}
    />,
  ];

  const onSaveCombo = () => {
    const noValidate = validateField();
    if (noValidate) {
      if (editMode) {
        editCombo();
      } else {
        addCombo();
      }
      setValidate({});
    }
  };

  const goToListCombo = () => {
    dispatch(push('/admin/combo'));
  };

  const onConfirmCancel = () => {
    setOpenCancelConfirm(false);
  };

  const onConfirm = () => {
    setOpenCancelConfirm(false);
    goToListCombo();
  };

  const onConfirmCancelRemove = () => {
    setProductId(0);
  };

  const onConfirmRemove = () => {
    removeProduct({
      productComboId: combo.productComboId,
      productIds: [productId],
    });
    setProductId(0);
  };

  const handleOnAddProduct = productSelect => {
    addProduct({
      productComboId: combo.productComboId,
      productIds: productSelect,
    });
  };

  const handleCancelAddProduct = () => {
    setOpenDialogUpdate(false);
  };

  const getListProductDebound = useCallback(
    debounce(textSearch => {
      getProductList({ search: textSearch });
    }, 2000),
    [],
  );

  const handleOnSearchProduct = event => {
    const textSearch = event.target.value;
    setSearchKey(textSearch);
    getListProductDebound(textSearch);
  };

  const onBeforeLoadEditor = editor => {
    const instanceEditor = editor;
    instanceEditor.config.height = 400;
    instanceEditor.disableAutoInline = true;
  };

  return (
    <div>
      <Helmet>
        <title>
          {editMode || comboId
            ? intl.formatMessage(messages.editHeader)
            : intl.formatMessage(messages.addHeader)}
        </title>
        <meta name="description" content="Description of ComboUpdate" />
      </Helmet>
      <Header
        title={
          editMode || comboId
            ? intl.formatMessage(messages.editHeader)
            : intl.formatMessage(messages.addHeader)
        }
      />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={<Typography variant="h6">Thông tin combo</Typography>}
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid container item xs={6} spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      variant="outlined"
                      fullWidth
                      value={combo.name}
                      id="name"
                      label={intl.formatMessage(messages.name)}
                      onChange={handleOnChangeDataField('name')}
                      error={validate.name && validate.name.error}
                      helperText={
                        validate.name &&
                        intl.formatMessage(messages[validate.name.helperText])
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="comboNumber"
                      label="Số lượng"
                      value={combo.comboNumber}
                      onChange={handleOnChangeDataField('comboNumber')}
                      InputProps={{
                        inputComponent: NumberFormatInput,
                        inputProps: {
                          maxLength: '11',
                          style: { textAlign: 'right' },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="comboPercent"
                      label="Phần trăm"
                      value={combo.comboPercent}
                      onChange={handleOnChangeDataField('comboPercent')}
                      InputProps={{
                        inputComponent: NumberFormatInput,
                        inputProps: {
                          maxLength: '2',
                          style: { textAlign: 'right' },
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={<Typography variant="h6">Mô tả</Typography>} />
            <CardContent>
              <CKEditor
                data={combo.description}
                onBeforeLoad={onBeforeLoadEditor}
                onChange={handleOnChangeDataField('description')}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <TableAdvance
            columnKey="productId"
            rows={editMode ? productComboList : productList}
            headerRows={headerRows}
            paging={editMode ? productComboPaging : paging}
            fetchDataForPage={fetchDataTable}
            options={{
              allowSelection: !editMode,
              selectedDataRow: false,
              clickRowToSelect: true,
            }}
            actions={actions}
            selectedList={combo.productIds}
            onSelectionChange={handleOnChangeDataField('productIds')}
            refreshData={refreshData}
          />
        </Grid>
        <Grid item container xs={12} justify="center">
          <Grid item>
            <Button
              name={editMode ? '' : 'Lưu và tiếp tục'}
              icon="save"
              onClick={onSaveCombo}
            />
            <Button
              icon="cancel"
              color="default"
              onClick={() => setOpenCancelConfirm(true)}
            />
          </Grid>
        </Grid>
      </Grid>
      <AlertDialog
        open={openCancelConfirm}
        description="Hủy lưu thông tin combo?"
        onCancel={onConfirmCancel}
        onConfirm={onConfirm}
      />
      <AlertDialog
        open={productId !== 0}
        description={intl.formatMessage(messages.confirmDelete)}
        onCancel={onConfirmCancelRemove}
        onConfirm={onConfirmRemove}
      />
      <UpdateProductDialog
        open={openDialogUpdate}
        searchKey={searchKey}
        getProductList={getProductList}
        paging={paging}
        productList={productList}
        onSearchChange={handleOnSearchProduct}
        onCancel={handleCancelAddProduct}
        onAgree={handleOnAddProduct}
      />
    </div>
  );
}

ComboUpdate.propTypes = {
  intl: intlShape,
  dispatch: PropTypes.func,
  match: PropTypes.any,
  combo: PropTypes.object,
  setDataField: PropTypes.func,
  addCombo: PropTypes.func,
  getCombo: PropTypes.func,
  editCombo: PropTypes.func,
  shouldUpdate: PropTypes.bool,
  productList: PropTypes.array,
  getProductList: PropTypes.func,
  paging: PropTypes.object,
  productComboList: PropTypes.array,
  getProductComboList: PropTypes.func,
  productComboPaging: PropTypes.object,
  addProduct: PropTypes.func,
  removeProduct: PropTypes.func,
  refreshData: PropTypes.bool,
  cleanData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  combo: makeSelectCombo(),
  shouldUpdate: makeSelectShouldUpdate(),
  productList: makeSelectProductList(),
  paging: makeSelectPaging(),
  productComboList: makeSelectProductComboList(),
  productComboPaging: makeSelectProductComboPaging(),
  refreshData: makeSelectRefresh(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getProductList: payload => dispatch(getProductListRequest(payload)),
    getProductComboList: payload =>
      dispatch(getProductComboListRequest(payload)),
    getCombo: payload => dispatch(getRequest(payload)),
    addCombo: () => dispatch(addRequest()),
    editCombo: () => dispatch(editRequest()),
    setDataField: payload => dispatch(updateDataField(payload)),
    addProduct: payload => dispatch(addProductRequest(payload)),
    removeProduct: payload => dispatch(removeProductRequest(payload)),
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
)(injectIntl(ComboUpdate));
