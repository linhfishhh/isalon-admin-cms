/**
 *
 * ProductReviewList
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid } from '@material-ui/core';

import TableAdvance from 'components/TableAdvance';
import AlertDialog from 'components/AlertDialog';
import Button from 'components/Button';
import Header from 'components/Header';
import ReviewStars from 'components/ReviewStars';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectLoading } from 'utils/injectLoading';
import { useInjectToast } from 'utils/injectToast';

import ReplyProductReview from './ReplyProductReview';
import {
  makeSelectProductReviewList,
  makeSelectProductReview,
  makeSelectRefreshData,
  makeSelectPaging,
  makeSelectProduct,
} from './selectors';
import {
  getListRequest,
  addRequest,
  getRequest,
  editRequest,
  approveRequest,
  deleteRequest,
  updateDataField,
  cleanDataAction,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { CONTEXT, LOADING_ACTION_TYPES, TOAST_ACTION_TYPES } from './constants';

export function ProductReviewList(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTION_TYPES);
  useInjectToast(TOAST_ACTION_TYPES);

  const {
    intl,
    productReviewList,
    paging,
    getProductReviewList,
    productReview,
    getProductReview,
    approveProductReview,
    addProductReview,
    editProductReview,
    deleteProductReview,
    refreshData,
    setDataField,
    cleanData,
    product,
  } = props;

  const [productReviewRemove, setProductReviewRemove] = useState(0);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getProductReviewList({});
  }, []);

  useEffect(() => {
    if (get(productReview, 'productReviewMessage.productReviewMessageId')) {
      setEditMode(true);
    }
  }, [productReview]);

  useEffect(() => {
    if (refreshData) {
      handleCancelDialog();
    }
  }, [refreshData]);

  const replyAction = id => (
    <Button
      key={`reply-${id}`}
      icon="reply"
      type="iconButton"
      onClick={() => {
        getProductReview({ id });
        setOpenUpdateDialog(true);
      }}
    />
  );

  const deleteAction = id => (
    <Button
      key={`delete-${id}`}
      icon="delete"
      type="iconButton"
      onClick={() => setProductReviewRemove(id)}
    />
  );

  const customizeRateCell = dataRow => (
    <ReviewStars value={dataRow.rate || 0} />
  );

  const handleApproveReview = (id, value) => {
    const data = { productReviewId: id, isAvailable: value };
    approveProductReview({ data });
  };

  const headerRows = [
    {
      id: 'productReviewId',
      type: 'text',
      label: 'ID',
    },
    {
      id: 'profile.fullName',
      type: 'text',
      label: 'Khách hàng',
    },
    {
      id: 'title',
      type: 'text',
      label: 'Tiêu đề',
    },
    {
      id: 'rate',
      type: 'customize',
      customize: customizeRateCell,
      label: 'Đánh giá',
    },
    {
      id: 'numLikes',
      type: 'number',
      label: 'Yêu thích',
      align: 'right',
    },
    {
      id: 'isAvailable',
      type: 'switch',
      label: 'Phê duyệt',
      onChange: handleApproveReview,
      align: 'center',
    },
    {
      id: 'createdAt',
      type: 'dateTime',
      label: 'Ngày tạo',
    },
    {
      id: 'action',
      type: 'actions',
      actions: [replyAction, deleteAction],
      align: 'right',
    },
  ];

  const handleOnChange = name => event => {
    let dataField;
    switch (name) {
      default:
        dataField = {
          productReviewMessage: {
            ...productReview.productReviewMessage,
            [name]: event.target.value,
          },
        };
        break;
    }
    setDataField(dataField);
  };

  const fetchDataForPage = payload => {
    const { page, limit } = payload;
    getProductReviewList({ page, limit });
  };

  const onConfirmCancelRemove = () => {
    setProductReviewRemove(0);
  };

  const onConfirmRemove = () => {
    deleteProductReview({ id: productReviewRemove });
    setProductReviewRemove(0);
  };

  const handleCancelDialog = () => {
    setOpenUpdateDialog(false);
    setEditMode(false);
    cleanData();
  };

  const handleAgreeAction = () => {
    const { productReviewId } = productReview;
    const data = {
      message: get(productReview, 'productReviewMessage.message'),
      productReviewId,
    };
    if (get(productReview, 'productReviewMessage.productReviewMessageId')) {
      data.productReviewMessageId = get(
        productReview,
        'productReviewMessage.productReviewMessageId',
      );
      editProductReview({ data });
    } else {
      addProductReview({ data });
    }
  };

  return (
    <div>
      <Helmet>
        <title>{intl.formatMessage(messages.header)}</title>
        <meta name="description" content="Description of ProductReviewList" />
      </Helmet>

      <Header title={intl.formatMessage(messages.header)} />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableAdvance
            columnKey="productReviewId"
            rows={productReviewList}
            headerRows={headerRows}
            paging={paging}
            fetchDataForPage={fetchDataForPage}
            refreshData={refreshData}
          />
        </Grid>
      </Grid>
      <ReplyProductReview
        intl={intl}
        open={openUpdateDialog}
        editMode={editMode}
        productReview={productReview}
        onChangeDataField={handleOnChange}
        onCancel={handleCancelDialog}
        onAgree={handleAgreeAction}
        product={product}
      />
      <AlertDialog
        open={productReviewRemove !== 0}
        description={intl.formatMessage(messages.confirmDelete)}
        onCancel={onConfirmCancelRemove}
        onConfirm={onConfirmRemove}
      />
    </div>
  );
}

ProductReviewList.propTypes = {
  intl: intlShape,
  productReviewList: PropTypes.array,
  paging: PropTypes.object,
  getProductReviewList: PropTypes.func,
  productReview: PropTypes.object,
  getProductReview: PropTypes.func,
  product: PropTypes.object,
  approveProductReview: PropTypes.func,
  addProductReview: PropTypes.func,
  editProductReview: PropTypes.func,
  deleteProductReview: PropTypes.func,
  refreshData: PropTypes.bool,
  setDataField: PropTypes.func,
  cleanData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  productReviewList: makeSelectProductReviewList(),
  productReview: makeSelectProductReview(),
  refreshData: makeSelectRefreshData(),
  paging: makeSelectPaging(),
  product: makeSelectProduct(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getProductReviewList: payload => dispatch(getListRequest(payload)),
    addProductReview: payload => dispatch(addRequest(payload)),
    getProductReview: payload => dispatch(getRequest(payload)),
    editProductReview: payload => dispatch(editRequest(payload)),
    deleteProductReview: payload => dispatch(deleteRequest(payload)),
    approveProductReview: payload => dispatch(approveRequest(payload)),
    setDataField: payload => dispatch(updateDataField(payload)),
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
)(injectIntl(ProductReviewList));
