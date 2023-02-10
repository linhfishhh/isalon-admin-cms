/**
 *
 * ReplyProductFAQ Dialog
 *
 */
import React, { memo } from 'react';
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
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Button from 'components/Button';
import Img from 'components/Img';
import { path, createPath } from 'routers/path';

import { datetimeFormat } from 'utils/datetime';

import messages from './messages';

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

function AnswerProductFAQ(props) {
  const {
    intl,
    open,
    editMode,
    productFAQ,
    onChangeDataField,
    onCancel,
    onAgree,
    product,
  } = props;

  const classes = useStyles();

  const handleCancelEdit = () => {
    onCancel();
  };

  const handleAgreeAction = () => {
    onAgree();
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
                    <Typography>Người hỏi</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography>
                      {productFAQ.questionProfile &&
                        productFAQ.questionProfile.fullName}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Câu hỏi</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography>{productFAQ.question}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Ngày tạo</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography>
                      {datetimeFormat(productFAQ.createdAt)}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Ngày trả lời</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography>
                      {datetimeFormat(productFAQ.answerAt)}
                    </Typography>
                  </Grid>
                  <Grid item xs={3} />
                  <Grid item xs={9}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={productFAQ.isAvailable || false}
                          onChange={onChangeDataField('isAvailable')}
                          color="primary"
                        />
                      }
                      label="Phê duyệt"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <TextField
                  multiline
                  rows="4"
                  id="answer"
                  label="Nội dung trả lời"
                  variant="outlined"
                  value={productFAQ.answer ? productFAQ.answer : ''}
                  fullWidth
                  onChange={onChangeDataField('answer')}
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

AnswerProductFAQ.propTypes = {
  intl: intlShape,
  open: PropTypes.bool,
  editMode: PropTypes.bool,
  productFAQ: PropTypes.object,
  product: PropTypes.object,
  onChangeDataField: PropTypes.func,
  onCancel: PropTypes.func,
  onAgree: PropTypes.func,
};

export default memo(AnswerProductFAQ);
