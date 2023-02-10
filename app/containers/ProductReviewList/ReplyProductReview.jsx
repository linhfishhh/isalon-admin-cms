/**
 *
 * ReplyProductReview Dialog
 *
 */
import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { intlShape } from 'react-intl';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
  TextField,
  Card,
  CardContent,
} from '@material-ui/core';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Button from 'components/Button';
import ReviewStars from 'components/ReviewStars';
import Img from 'components/Img';
import { path, createPath } from 'routers/path';

import validation from 'utils/validation';
import { datetimeFormat } from 'utils/datetime';

import messages from './messages';

const ImageListWrapper = styled.div`
  img {
    width: 100px;
    height: 100px;
    margin: 3px;
    border: solid 1px #ddd;
  }
`;

const useStyles = makeStyles(theme => ({
  productImage: {
    width: 80,
    height: 80,
    objectFit: 'contain',
    border: 'solid 1px #eee',
  },
  productLink: {
    color: theme.palette.primary.light,
  },
}));

function ReplyProductReview(props) {
  const {
    intl,
    open,
    editMode,
    productReview,
    onChangeDataField,
    onCancel,
    onAgree,
    product,
  } = props;
  const classes = useStyles();

  const [validate, setValidate] = useState({});

  const validateField = () => {
    const option = [
      {
        type: 'empty',
        model: productReview.productReviewMessage,
        keys: ['message'],
      },
    ];
    const result = validation(option);
    setValidate(result);
    return isEmpty(result);
  };

  const handleCancelEdit = () => {
    setValidate({});
    onCancel();
  };

  const handleAgreeAction = () => {
    const noValidate = validateField();
    if (noValidate) {
      setValidate({});
      onAgree();
    }
  };

  const getProductReviewImages = () => {
    if (productReview.images) {
      return productReview.images.map(item => (
        <Img key={item.imageId} src={item.imageSource} />
      ));
    }
    return '';
  };

  const productLink = () => {
    if (!isEmpty(product)) {
      return createPath(path.productDetail, { productId: product.productId });
    }
    return '';
  };

  return (
    <Dialog
      open={open}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="scroll-dialog-title">
        {editMode
          ? intl.formatMessage(messages.edit)
          : intl.formatMessage(messages.add)}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          {productReview.images && productReview.images.length > 0 && (
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <ImageListWrapper>
                    {getProductReviewImages()}
                  </ImageListWrapper>
                </CardContent>
              </Card>
            </Grid>
          )}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={3}>
                    <Typography>Sản phẩm</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Grid container alignItems="center" spacing={3}>
                      <Img
                        src={product.imageSource}
                        className={classes.productImage}
                      />
                      <Grid item xs>
                        <NavLink
                          to={productLink()}
                          className={classes.productLink}
                          target="_blank"
                        >
                          {product.name}
                        </NavLink>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Tiêu đề</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography>{productReview.title}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Nhận xét</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography>{productReview.comment}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Đánh giá</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <ReviewStars value={productReview.rate} />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Yêu thích</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography>{productReview.numLikes || 0}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Ngày tạo</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography>
                      {datetimeFormat(productReview.createdAt)}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <TextField
                  required
                  multiline
                  rows="4"
                  id="message"
                  label="Nội dung trả lời"
                  variant="outlined"
                  value={
                    productReview.productReviewMessage
                      ? productReview.productReviewMessage.message
                      : ''
                  }
                  fullWidth
                  onChange={onChangeDataField('message')}
                  error={validate.message && validate.message.error}
                  helperText={
                    validate.message &&
                    intl.formatMessage(messages[validate.message.helperText])
                  }
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          icon="cancel"
          options={{ showIcon: false }}
          onClick={handleCancelEdit}
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

ReplyProductReview.propTypes = {
  intl: intlShape,
  open: PropTypes.bool,
  editMode: PropTypes.bool,
  productReview: PropTypes.object,
  product: PropTypes.object,
  onChangeDataField: PropTypes.func,
  onCancel: PropTypes.func,
  onAgree: PropTypes.func,
};

export default memo(ReplyProductReview);
