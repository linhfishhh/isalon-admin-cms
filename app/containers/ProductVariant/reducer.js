/*
 *
 * ProductVariant reducer
 *
 */
import produce from 'immer';
import { get, unset, forEach } from 'lodash';
import {
  GET_VARIANT_LIST_SUCCESS,
  GET_VARIANT_LIST_FAIL,
  GET_PRODUCT_VARIANT_SUCCESS,
  GET_PRODUCT_VARIANT_FAIL,
  UPDATE_DATA_FIELD,
  SET_VARIANT_SELECTED,
  REMOVE_VARIANT_VALUE,
  CLEAN_DATA,
  REFRESH_DATA,
} from './constants';

export const initialState = {
  productVariant: {
    images: [],
    sku: '',
    quantity: '',
    price: {},
    color: '',
    isDefault: false,
    variantValues: [],
  },
  variantSelectedList: [],
  variantList: [],
  refresh: true,
  error: {},
};

const updateVariantSelected = (selectedList, variantList) => {
  const variants = selectedList.map(item => item.variantId);
  const result = variantList.filter(item => variants.includes(item.variantId));
  return result;
};

const getVariantSelected = (variantValues, variantList) => {
  const variants = variantValues.map(item => item.variantId);
  const result = variantList.filter(item => variants.includes(item.variantId));
  return result;
};

const updateVariantValue = (selectedList, variantValues) => {
  const variants = selectedList.map(item => item.variantId);
  const valuesID = variantId => {
    const values = selectedList.find(item => item.variantId === variantId);
    return values.variantValues.map(item => item.variantValueId);
  };
  const result = variantValues.filter(
    value =>
      variants.includes(value.variantId) &&
      valuesID(value.variantId).includes(value.variantValueId),
  );
  return result;
};

const productVariantReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_VARIANT_LIST_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.variantList = get(action, 'payload.data');
        cloneDraft.variantSelectedList = updateVariantSelected(
          cloneDraft.variantSelectedList,
          cloneDraft.variantList,
        );
        cloneDraft.productVariant.variantValues = updateVariantValue(
          cloneDraft.variantSelectedList,
          cloneDraft.productVariant.variantValues,
        );
        cloneDraft.refresh = false;
        break;
      }
      case GET_VARIANT_LIST_FAIL: {
        const cloneDraft = draft;
        cloneDraft.error = get(action, 'payload');
        break;
      }
      case GET_PRODUCT_VARIANT_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.productVariant = get(action, 'payload.data');
        cloneDraft.variantSelectedList = getVariantSelected(
          cloneDraft.productVariant.variantValues,
          cloneDraft.variantList,
        );
        break;
      }
      case GET_PRODUCT_VARIANT_FAIL: {
        const cloneDraft = draft;
        cloneDraft.error = get(action, 'payload');
        break;
      }
      case UPDATE_DATA_FIELD: {
        const cloneDraft = draft;
        const removeField = get(action, 'payload.removeField');
        const dataField = get(action, 'payload.dataField');
        if (removeField.length) {
          forEach(removeField, field =>
            unset(cloneDraft.productVariant, field),
          );
        }
        if (dataField) {
          cloneDraft.productVariant = {
            ...cloneDraft.productVariant,
            ...dataField,
          };
        }
        break;
      }
      case SET_VARIANT_SELECTED: {
        const cloneDraft = draft;
        cloneDraft.variantSelectedList = get(action, 'payload');
        cloneDraft.productVariant.variantValues = updateVariantValue(
          cloneDraft.variantSelectedList,
          cloneDraft.productVariant.variantValues,
        );
        break;
      }
      case REMOVE_VARIANT_VALUE: {
        const { id } = get(action, 'payload');
        const cloneDraft = draft;
        cloneDraft.productVariant.variantValues = cloneDraft.productVariant.variantValues.filter(
          item => item.variantId !== id,
        );
        cloneDraft.variantSelectedList = cloneDraft.variantSelectedList.filter(
          item => item.variantId !== id,
        );
        break;
      }
      case CLEAN_DATA: {
        const cloneDraft = draft;
        cloneDraft.productVariant = initialState.productVariant;
        break;
      }
      case REFRESH_DATA: {
        const cloneDraft = draft;
        cloneDraft.refresh = true;
        break;
      }
      default:
        break;
    }
  });

export default productVariantReducer;
