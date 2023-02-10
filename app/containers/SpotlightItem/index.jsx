/**
 *
 * SpotlightItem
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { isEmpty } from 'lodash';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
  CardContent,
  Grid,
  TextField,
} from '@material-ui/core';

import Button from 'components/Button';
import ImagesUpload from 'components/ImagesUpload';
import ComboBox from 'components/ComboBox';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectLoading } from 'utils/injectLoading';
import { useInjectToast } from 'utils/injectToast';
import validation from 'utils/validation';

import {
  getRequest,
  addRequest,
  editRequest,
  cleanDataEditAction,
  updateDataField,
} from './actions';
import {
  makeSelectSpotlightItemList,
  makeSelectSpotlightItem,
  makeSelectRefreshData,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { CONTEXT, LOADING_ACTION_TYPES, TOAST_ACTION_TYPES } from './constants';

const types = [
  {
    type: 'banner',
    name: 'Ảnh bìa',
  },
  {
    type: 'category',
    name: 'Danh mục sản phẩm',
  },
  {
    type: 'flashsale',
    name: 'FlashSale',
  },
  {
    type: 'targetedProduct',
    name: 'Dành riêng cho bạn',
  },
  {
    type: 'bestSelling',
    name: 'Sản phẩm bán chạy',
  },
  {
    type: 'list',
    name: 'Danh sách',
  },
  {
    type: 'group',
    name: 'Nhóm',
  },
];

const emptyBanner = { url: '', images: [] };

export function SpotlightItem(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTION_TYPES);
  useInjectToast(TOAST_ACTION_TYPES);

  const {
    intl,
    open,
    editMode,
    spotlightId,
    spotlightItemId,
    categoryList,
    spotlightItem,
    getSpotlightItem,
    addSpotlightItem,
    editSpotlightItem,
    setDataField,
    cleanDataEdit,
    refreshData,
    onClose,
    reloadData,
  } = props;

  useEffect(() => {
    if (spotlightItemId) {
      getSpotlightItem({ id: spotlightItemId });
    }
  }, [spotlightItemId]);

  useEffect(() => {
    if (refreshData) {
      handleCancelEdit();
      reloadData();
    }
  }, [refreshData]);

  const onChangeDataField = name => event => {
    let dataField;
    let removeField = [];
    switch (name) {
      case 'categoryId':
        if (event) {
          dataField = {
            category: { [name]: event[name] },
            name: isEmpty(spotlightItem.name) ? event.name : spotlightItem.name,
          };
        } else {
          removeField = ['category'];
        }
        break;
      case 'banners':
        dataField = {
          [name]: event,
        };
        break;
      case 'type':
        if (event) {
          dataField = {
            [name]: event[name],
          };
        } else {
          removeField = [name];
        }
        break;
      default:
        dataField = { [name]: event.target.value };
        break;
    }
    setDataField({ dataField, removeField });
  };

  const [validate, setValidate] = useState({});
  const [validateBanner, setValidateBanner] = useState({});
  const [banner, setBanner] = useState(emptyBanner);

  const validateField = () => {
    const keys = ['name', 'type'];
    if (needCategory) keys.push('category');
    const option = [
      {
        type: 'empty',
        model: spotlightItem,
        keys,
      },
    ];
    const result = validation(option);
    setValidate(result);
    return isEmpty(result);
  };

  const validateBannerField = model => {
    const option = [
      {
        type: 'empty',
        model,
        keys: ['url'],
      },
    ];
    const result = validation(option);
    setValidateBanner(result);
    return isEmpty(result);
  };

  const handleOnChangeBannerDataField = name => event => {
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
    setBanner({ ...banner, ...dataField });
  };

  const handleCancelEdit = () => {
    setValidate({});
    setValidateBanner({});
    cleanDataEdit();
    onClose();
  };

  const handleAgreeAction = () => {
    const noValidate = validateField();
    if (noValidate) {
      setValidate({});
      if (editMode) {
        editSpotlightItem();
      } else {
        addSpotlightItem({ spotlightId });
      }
    }
  };

  const addBanner = () => {
    const noValidate = validateBannerField(banner);
    if (noValidate) {
      const banners = [...spotlightItem.banners];
      banners.push(banner);
      const onAddBanner = onChangeDataField('banners');
      onAddBanner(banners);
      setBanner(emptyBanner);
      setValidateBanner({});
    }
  };

  const removeBanner = index => {
    const banners = [...spotlightItem.banners];
    banners.splice(index, 1);
    const onAddBanner = onChangeDataField('banners');
    onAddBanner(banners);
  };

  const updateBannerDatafield = (name, index) => event => {
    const banners = [...spotlightItem.banners];
    if (name === 'url') {
      banners[index].url = event.target.value;
    }
    if (name === 'images') {
      banners[index].images = event;
    }
    const onAddBanner = onChangeDataField('banners');
    onAddBanner(banners);
  };

  const isBanner = spotlightItem.type === 'banner';
  const needCategory =
    ['category', 'list', 'group'].indexOf(spotlightItem.type) > -1;

  return (
    <Dialog
      open={open}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      fullWidth
      maxWidth="md"
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
                <Grid container spacing={3} alignItems="flex-start">
                  <Grid item xs={6}>
                    <TextField
                      required
                      id="name"
                      label={intl.formatMessage(messages.name)}
                      variant="outlined"
                      value={spotlightItem.name}
                      fullWidth
                      onChange={onChangeDataField('name')}
                      error={validate.name && validate.name.error}
                      helperText={
                        validate.name &&
                        intl.formatMessage(messages[validate.name.helperText])
                      }
                      InputProps={{
                        inputProps: {
                          maxLength: '64',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <ComboBox
                      nameLabel="Kiểu hiển thị *"
                      dataSource={types}
                      dataTextField="name"
                      dataValueField="type"
                      selectedValue={spotlightItem.type}
                      onSelectedChange={onChangeDataField('type')}
                      error={validate.type && validate.type.error}
                      helperText={
                        validate.type &&
                        intl.formatMessage(messages[validate.type.helperText])
                      }
                    />
                  </Grid>

                  {needCategory && (
                    <>
                      <Grid item xs={6}>
                        <ComboBox
                          nameLabel="Nhóm sản phẩm *"
                          dataSource={categoryList}
                          dataTextField="name"
                          dataValueField="categoryId"
                          selectedValue={
                            spotlightItem.category
                              ? `${spotlightItem.category.categoryId}`
                              : ''
                          }
                          onSelectedChange={onChangeDataField('categoryId')}
                          error={validate.category && validate.category.error}
                          helperText={
                            validate.category &&
                            intl.formatMessage(
                              messages[validate.category.helperText],
                            )
                          }
                        />
                      </Grid>
                      <Grid item xs={6} />
                    </>
                  )}
                  {isBanner && (
                    <>
                      {spotlightItem.banners.length > 0 &&
                        spotlightItem.banners.map((item, index) => (
                          <Grid
                            key={item.spotlightBannerId || index}
                            item
                            xs={12}
                            container
                            spacing={2}
                          >
                            <Grid item xs={6}>
                              <TextField
                                required
                                id="url"
                                label={intl.formatMessage(messages.url)}
                                variant="outlined"
                                value={item.url}
                                fullWidth
                                onChange={updateBannerDatafield('url', index)}
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <ImagesUpload
                                id={`upload-${index}`}
                                images={item.images}
                                onChangeImage={updateBannerDatafield(
                                  'images',
                                  index,
                                )}
                                type="button"
                                width={200}
                                height={60}
                              />
                            </Grid>
                            <Grid container item xs={2} alignItems="center">
                              <Button
                                icon="delete"
                                color="default"
                                options={{ showIcon: false }}
                                onClick={() => removeBanner(index)}
                              />
                            </Grid>
                          </Grid>
                        ))}
                      {spotlightItem.banners.length < 10 && (
                        <>
                          <Grid item xs={12} container spacing={2}>
                            <Grid item xs={6}>
                              <TextField
                                required
                                id="url"
                                label={intl.formatMessage(messages.url)}
                                variant="outlined"
                                value={banner.url}
                                fullWidth
                                onChange={handleOnChangeBannerDataField('url')}
                                error={
                                  validateBanner.url && validateBanner.url.error
                                }
                                helperText={
                                  validateBanner.url &&
                                  intl.formatMessage(
                                    messages[validateBanner.url.helperText],
                                  )
                                }
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <ImagesUpload
                                images={banner.images}
                                onChangeImage={handleOnChangeBannerDataField(
                                  'images',
                                )}
                                type="button"
                                width={200}
                                height={60}
                              />
                            </Grid>
                            <Grid container item xs={2} alignItems="center">
                              <Button
                                name="Thêm banner"
                                icon="add"
                                options={{ showIcon: false }}
                                onClick={addBanner}
                              />
                            </Grid>
                          </Grid>
                        </>
                      )}
                    </>
                  )}
                </Grid>
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

SpotlightItem.propTypes = {
  intl: intlShape,
  open: PropTypes.bool,
  editMode: PropTypes.bool,
  spotlightId: PropTypes.number,
  spotlightItemId: PropTypes.number,
  categoryList: PropTypes.array,
  spotlightItem: PropTypes.object,
  refreshData: PropTypes.bool,
  getSpotlightItem: PropTypes.func,
  addSpotlightItem: PropTypes.func,
  editSpotlightItem: PropTypes.func,
  setDataField: PropTypes.func,
  cleanDataEdit: PropTypes.func,
  onClose: PropTypes.func,
  reloadData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  spotlightItemList: makeSelectSpotlightItemList(),
  spotlightItem: makeSelectSpotlightItem(),
  refreshData: makeSelectRefreshData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getSpotlightItem: payload => dispatch(getRequest(payload)),
    addSpotlightItem: payload => dispatch(addRequest(payload)),
    editSpotlightItem: () => dispatch(editRequest()),
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
)(injectIntl(SpotlightItem));
