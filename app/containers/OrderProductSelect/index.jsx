/**
 *
 * ProductList
 *
 */

import React, { memo, useMemo, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import Button from 'components/Button';
import TableAdvance from 'components/TableAdvance';
import TransitionUp from 'components/Transition/Up';
import NumberFormatInput from 'components/NumberFormatInput';
import ProductPrice from 'components/ProductPrice';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectLoading } from 'utils/injectLoading';

import {
  makeSelectProductList,
  makeSelectPaging,
  makeSelectProductVariantList,
} from './selectors';
import {
  getProductListRequest,
  getProductVariantListRequest,
  cleanDataAction,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import { CONTEXT, LOADING_ACTION_TYPES } from './constants';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: theme.spacing(1, 3),
  },
  content: {
    paddingTop: 0,
    display: 'flex',
  },
  table: {
    overflow: 'auto',
  },
  quantity: {
    marginRight: 50,
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  price: {
    fontFamily: theme.typography.fontMedium,
    display: 'inline',
    fontWeight: 'bold',
    fontSize: 14,
    color: theme.palette.primary.main,
    margin: 0,
  },
  originPrice: {
    textDecoration: 'line-through',
    fontSize: 14,
  },
}));

export function OrderProductSelect(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTION_TYPES);

  const {
    open,
    productList,
    paging,
    getProductList,
    productVariantList,
    getProductVariantList,
    cleanData,
    onClose,
    onAgree,
  } = props;
  const classes = useStyles();
  const [searchKey, setSearchKey] = useState('');
  const [product, setProduct] = useState();
  const [productVariant, setProductVariant] = useState();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!open) {
      setProduct();
      setProductVariant();
      cleanData();
    } else if (!productList || productList.length <= 0) {
      getProductList({});
    }
  }, [open]);

  useEffect(() => {
    if (product) {
      const { productId } = product;
      getProductVariantList({ productId });
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      const { defaultProductVariant } = product;
      setProductVariant(defaultProductVariant);
    }
  }, [productVariantList]);

  const headerRows = useMemo(
    () => [
      {
        id: 'productId',
        type: 'text',
        label: 'ID',
      },
      {
        id: 'imageSource',
        type: 'image',
        label: 'Ảnh',
      },
      {
        id: 'name',
        type: 'text',
        label: 'Tên',
        width: 200,
      },
      {
        id: 'brand.name',
        type: 'text',
        label: 'Thương hiệu',
      },
      {
        id: 'isAvailable',
        type: 'checked',
        align: 'center',
      },
    ],
    [],
  );

  const customizeCell = dataRow => {
    const { variantValues } = dataRow;
    if (variantValues) {
      const values = variantValues.map(item => item.name);
      return values.join(', ');
    }
    return '';
  };

  const priceCell = dataRow => (
    <ProductPrice product={product} variant={dataRow} />
  );

  const headerVariantRows = useMemo(
    () => [
      {
        id: 'productVariantId',
        type: 'text',
        label: 'ID',
      },
      {
        id: 'imageSource',
        type: 'image',
        label: 'Ảnh',
      },
      {
        id: 'sku',
        type: 'text',
        label: 'SKU',
      },
      {
        id: 'attribute',
        type: 'customize',
        label: 'Thuộc tính',
        customize: customizeCell,
      },
      {
        id: 'isDefault',
        type: 'checked',
        label: 'Mặc định',
        align: 'center',
        hidden: 0,
      },
      {
        id: 'color',
        type: 'text',
        label: 'Mã màu',
      },
      {
        id: 'price.retailPrice',
        type: 'customize',
        label: 'Giá',
        customize: priceCell,
      },
    ],
    [],
  );

  const fetchDataForPage = useCallback(payload => {
    getProductList({ ...payload, search: searchKey });
  }, []);

  const getListProductDebounce = useCallback(
    debounce(textSearch => {
      getProductList({ search: textSearch });
    }, 1500),
    [],
  );

  const handleOnSearchProduct = useCallback(event => {
    const textSearch = event.target.value;
    setSearchKey(textSearch);
    getListProductDebounce(textSearch);
  }, []);

  const handleSelectedProductChange = useCallback(selectedProduct => {
    if (selectedProduct.length > 0) {
      setProduct(selectedProduct[0]);
    }
  }, []);

  const handleSelectedProductVariantChange = useCallback(
    selectedProductVariant => {
      if (selectedProductVariant.length > 0) {
        setProductVariant(selectedProductVariant[0]);
      }
    },
    [],
  );

  const handleChangeQuantity = useCallback(event => {
    const { value } = event.target;
    setQuantity(isEmpty(value) ? 1 : Number(value));
  }, []);

  const handleCancelAction = useCallback(() => {
    onClose();
  }, []);

  const handleAgreeAction = useCallback(() => {
    onAgree(product, quantity, productVariant);
    onClose();
  }, [product, productVariant, quantity]);

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="lg"
      TransitionComponent={TransitionUp}
    >
      <DialogTitle disableTypography className={classes.title}>
        <Grid container alignItems="center">
          <Grid item xs={3}>
            Chọn sản phẩm
          </Grid>
          <Grid item xs={3}>
            <TextField
              style={{ width: 300 }}
              margin="dense"
              value={searchKey}
              variant="outlined"
              id="product-search"
              label="Tìm kiếm sản phẩm"
              onChange={event => handleOnSearchProduct(event)}
            />
          </Grid>
          <Grid item xs>
            Chọn biến thể
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent dividers className={classes.content}>
        <TableAdvance
          className={classes.table}
          columnKey="productId"
          rows={productList}
          headerRows={headerRows}
          paging={paging}
          fetchDataForPage={fetchDataForPage}
          options={{
            allowSelection: true,
            multipleSelection: false,
            stickyAction: true,
            clickRowToSelect: true,
          }}
          selectedList={product ? [product] : []}
          onSelectionChange={handleSelectedProductChange}
        />
        <TableAdvance
          className={classes.table}
          columnKey="productVariantId"
          rows={productVariantList}
          headerRows={headerVariantRows}
          options={{
            allowSelection: true,
            showPaging: false,
            multipleSelection: false,
            stickyAction: true,
            clickRowToSelect: true,
          }}
          selectedList={productVariant ? [productVariant] : []}
          onSelectionChange={handleSelectedProductVariantChange}
        />
      </DialogContent>
      <DialogActions>
        <div className={classes.quantity}>
          <TextField
            required
            margin="dense"
            variant="outlined"
            label="Số lượng"
            onChange={handleChangeQuantity}
            value={quantity}
            InputProps={{
              inputComponent: NumberFormatInput,
              inputProps: {
                maxLength: '13',
                style: { textAlign: 'right' },
              },
            }}
          />
        </div>
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
  );
}

OrderProductSelect.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  productList: PropTypes.array,
  getProductList: PropTypes.func,
  productVariantList: PropTypes.array,
  getProductVariantList: PropTypes.func,
  cleanData: PropTypes.func,
  paging: PropTypes.object,
  onAgree: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  productList: makeSelectProductList(),
  paging: makeSelectPaging(),
  productVariantList: makeSelectProductVariantList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getProductList: payload => dispatch(getProductListRequest(payload)),
    getProductVariantList: payload =>
      dispatch(getProductVariantListRequest(payload)),
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
)(OrderProductSelect);
