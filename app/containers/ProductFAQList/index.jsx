/**
 *
 * ProductFAQList
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

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectLoading } from 'utils/injectLoading';
import { useInjectToast } from 'utils/injectToast';

import AnswerProductFAQ from './AnswerProductFAQ';
import {
  makeSelectProductFAQList,
  makeSelectProductFAQ,
  makeSelectRefreshData,
  makeSelectPaging,
  makeSelectProduct,
} from './selectors';
import {
  getListRequest,
  editRequest,
  getRequest,
  deleteRequest,
  updateDataField,
  cleanDataAction,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { CONTEXT, LOADING_ACTION_TYPES, TOAST_ACTION_TYPES } from './constants';

export function ProductFAQList(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTION_TYPES);
  useInjectToast(TOAST_ACTION_TYPES);

  const {
    intl,
    productFAQList,
    paging,
    getProductFAQList,
    productFAQ,
    getProductFAQ,
    answerProductFAQ,
    deleteProductFAQ,
    refreshData,
    setDataField,
    cleanData,
    product,
  } = props;

  const [productFAQRemove, setProductFAQRemove] = useState(0);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getProductFAQList({});
  }, []);

  useEffect(() => {
    if (get(productFAQ, 'answerProfileId')) {
      setEditMode(true);
    }
  }, [productFAQ]);

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
        getProductFAQ({ id });
        setOpenUpdateDialog(true);
      }}
    />
  );

  const deleteAction = id => (
    <Button
      key={`delete-${id}`}
      icon="delete"
      type="iconButton"
      onClick={() => setProductFAQRemove(id)}
    />
  );

  const headerRows = [
    {
      id: 'questionAnswerId',
      type: 'text',
      label: 'ID',
    },
    {
      id: 'questionProfile.fullName',
      type: 'text',
      label: 'Khách hàng',
    },
    {
      id: 'question',
      type: 'text',
      label: 'Câu hỏi',
    },
    {
      id: 'isAvailable',
      type: 'checked',
      label: 'Phê duyệt',
      align: 'center',
    },
    {
      id: 'createdAt',
      type: 'dateTime',
      label: 'Ngày tạo',
    },
    {
      id: 'answerAt',
      type: 'dateTime',
      label: 'Ngày trả lời',
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
      case 'isAvailable': {
        dataField = { [name]: event.target.checked };
        break;
      }
      default:
        dataField = {
          [name]: event.target.value,
        };
        break;
    }
    setDataField(dataField);
  };

  const fetchDataForPage = payload => {
    const { page, limit } = payload;
    getProductFAQList({ page, limit });
  };

  const onConfirmCancelRemove = () => {
    setProductFAQRemove(0);
  };

  const onConfirmRemove = () => {
    deleteProductFAQ({ id: productFAQRemove });
    setProductFAQRemove(0);
  };

  const handleCancelDialog = () => {
    setOpenUpdateDialog(false);
    setEditMode(false);
    cleanData();
  };

  const handleAgreeAction = () => {
    const { questionAnswerId } = productFAQ;
    const data = {
      answer: get(productFAQ, 'answer'),
      isAvailable: get(productFAQ, 'isAvailable'),
      questionAnswerId,
    };
    answerProductFAQ({ data });
  };

  return (
    <div>
      <Helmet>
        <title>{intl.formatMessage(messages.header)}</title>
        <meta name="description" content="Description of ProductFAQList" />
      </Helmet>

      <Header title={intl.formatMessage(messages.header)} />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableAdvance
            columnKey="questionAnswerId"
            rows={productFAQList}
            headerRows={headerRows}
            paging={paging}
            fetchDataForPage={fetchDataForPage}
            refreshData={refreshData}
          />
        </Grid>
      </Grid>
      <AnswerProductFAQ
        intl={intl}
        open={openUpdateDialog}
        editMode={editMode}
        productFAQ={productFAQ}
        onChangeDataField={handleOnChange}
        onCancel={handleCancelDialog}
        onAgree={handleAgreeAction}
        product={product}
      />
      <AlertDialog
        open={productFAQRemove !== 0}
        description={intl.formatMessage(messages.confirmDelete)}
        onCancel={onConfirmCancelRemove}
        onConfirm={onConfirmRemove}
      />
    </div>
  );
}

ProductFAQList.propTypes = {
  intl: intlShape,
  productFAQList: PropTypes.array,
  paging: PropTypes.object,
  getProductFAQList: PropTypes.func,
  productFAQ: PropTypes.object,
  getProductFAQ: PropTypes.func,
  product: PropTypes.object,
  answerProductFAQ: PropTypes.func,
  deleteProductFAQ: PropTypes.func,
  refreshData: PropTypes.bool,
  setDataField: PropTypes.func,
  cleanData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  productFAQList: makeSelectProductFAQList(),
  productFAQ: makeSelectProductFAQ(),
  refreshData: makeSelectRefreshData(),
  paging: makeSelectPaging(),
  product: makeSelectProduct(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getProductFAQList: payload => dispatch(getListRequest(payload)),
    answerProductFAQ: payload => dispatch(editRequest(payload)),
    getProductFAQ: payload => dispatch(getRequest(payload)),
    deleteProductFAQ: payload => dispatch(deleteRequest(payload)),
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
)(injectIntl(ProductFAQList));
