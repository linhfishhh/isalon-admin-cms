/**
 *
 * Setting
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Switch,
  Divider,
  TextField,
} from '@material-ui/core';
import Header from 'components/Header';
import Btn from 'components/Button';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectToast } from 'utils/injectToast';
import { CONTEXT, TOAST_ACTION_TYPES } from './constants';
import { makeSelectSetting, makeSelectShopSetting } from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getCfgRequest,
  updateCfgRequest,
  getShopCfgRequest,
  updateShopCfgRequest,
} from './actions';

import AffiliateCfg from './views/AffiliateCfg';
import ShipFeeCfg from './views/ShipFeeCfg';
import CoinUsageCfg from './views/CoinUsageCfg';

import userLocationReducer from 'containers/UserLocation/reducer';
import userLocationSaga from 'containers/UserLocation/saga';
import { CONTEXT as LOCATION_CTX } from 'containers/UserLocation/constants';
import { getProvinceListRequest } from 'containers/UserLocation/actions';
import { makeSelectProvinces } from 'containers/UserLocation/selectors';

export function Setting(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectReducer({ key: LOCATION_CTX, reducer: userLocationReducer });
  useInjectSaga({ key: LOCATION_CTX, saga: userLocationSaga });

  useInjectToast(TOAST_ACTION_TYPES);

  const {
    settings,
    getCfg,
    updateCfg,
    getProvinces,
    provinces,
    shopSettings,
    getShopCfg,
    updateShopCfg,
  } = props;

  React.useEffect(() => {
    getCfg();
    getShopCfg();
    getProvinces();
  }, []);

  const onSaveSetting = settings => {
    updateCfg({ settings });
  };

  const onSaveShopSetting = settings => {
    updateShopCfg({ settings });
  };

  return (
    <div>
      <Helmet>
        <title>Setting</title>
        <meta name="description" content="Description of Setting" />
      </Helmet>

      <Header title="Cài đặt" />

      <Grid container direction="column" spacing={3}>
        <Grid item xs={12}>
          <AffiliateCfg cfg={settings} onSave={onSaveSetting} />
        </Grid>
        <Grid item xs={12}>
          <ShipFeeCfg
            cfg={shopSettings}
            onSave={onSaveShopSetting}
            provinces={provinces}
          />
        </Grid>
        <Grid item xs={12}>
          <CoinUsageCfg cfg={settings} onSave={onSaveSetting} />
        </Grid>
      </Grid>
    </div>
  );
}

Setting.propTypes = {
  settings: PropTypes.array,
  getCfg: PropTypes.func,
  updateCfg: PropTypes.func,
  shopSettings: PropTypes.array,
  getShopCfg: PropTypes.func,
  updateShopCfg: PropTypes.func,
  provinces: PropTypes.array,
  getProvices: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  settings: makeSelectSetting(),
  shopSettings: makeSelectShopSetting(),
  provinces: makeSelectProvinces(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getCfg: () => dispatch(getCfgRequest()),
    updateCfg: params => dispatch(updateCfgRequest(params)),
    getShopCfg: () => dispatch(getShopCfgRequest()),
    updateShopCfg: params => dispatch(updateShopCfgRequest(params)),
    getProvinces: () => dispatch(getProvinceListRequest()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Setting);
