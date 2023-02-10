/**
 *
 * Update Dialog
 *
 */
import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { injectIntl, intlShape } from 'react-intl';
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
import validation from 'utils/validation';
import Button from 'components/Button';
import ImagesUpload from 'components/ImagesUpload';
import ComboBox from 'components/ComboBox';
import messages from './messages';

const emptyBanner = { url: '', images: [] };

function UpdateDialog(props) {
  const {
    intl,
    open,
    editMode,
    types,
    categoryList,
    spotLightItem,
    onChangeDataField,
    onCancel,
    onAgree,
  } = props;
  const [validate, setValidate] = useState({});
  const [validateBanner, setValidateBanner] = useState({});
  const [banner, setBanner] = useState(emptyBanner);

  const validateField = () => {
    const keys = ['name', 'type'];
    if (needCategory) keys.push('category');
    const option = [
      {
        type: 'empty',
        model: spotLightItem,
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

  const handleOnChangeDataField = name => event => {
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
    onCancel();
  };

  const handleAgreeAction = () => {
    const noValidate = validateField();
    if (noValidate) {
      setValidate({});
      onAgree();
    }
  };

  const addBanner = () => {
    const noValidate = validateBannerField(banner);
    if (noValidate) {
      const banners = [...spotLightItem.banners];
      banners.push(banner);
      const onAddBanner = onChangeDataField('banners');
      onAddBanner(banners);
      setBanner(emptyBanner);
      setValidateBanner({});
    }
  };

  const removeBanner = index => {
    const banners = [...spotLightItem.banners];
    banners.splice(index, 1);
    const onAddBanner = onChangeDataField('banners');
    onAddBanner(banners);
  };

  const updateBannerDatafield = (name, index) => event => {
    const banners = [...spotLightItem.banners];
    if (name === 'url') {
      banners[index].url = event.target.value;
    }
    if (name === 'images') {
      banners[index].images = event;
    }
    const onAddBanner = onChangeDataField('banners');
    onAddBanner(banners);
  };

  const isBanner = spotLightItem.type === 'banner';
  const needCategory =
    ['category', 'list', 'group'].indexOf(spotLightItem.type) > -1;

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
                      value={spotLightItem.name}
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
                      selectedValue={spotLightItem.type}
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
                            spotLightItem.category
                              ? `${spotLightItem.category.categoryId}`
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
                      {spotLightItem.banners.length > 0 &&
                        spotLightItem.banners.map((item, index) => (
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
                      {spotLightItem.banners.length < 10 && (
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
                                onChange={handleOnChangeDataField('url')}
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
                                onChangeImage={handleOnChangeDataField(
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

UpdateDialog.propTypes = {
  intl: intlShape,
  open: PropTypes.bool,
  types: PropTypes.array,
  editMode: PropTypes.bool,
  spotLightItem: PropTypes.object,
  categoryList: PropTypes.array,
  onChangeDataField: PropTypes.func,
  onCancel: PropTypes.func,
  onAgree: PropTypes.func,
};

export default memo(injectIntl(UpdateDialog));
