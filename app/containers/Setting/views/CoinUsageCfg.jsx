import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Switch,
  Divider,
  TextField,
} from '@material-ui/core';
import get from 'lodash/get';
import find from 'lodash/find';
import NumberFormatInput from 'components/NumberFormatInput';
import Btn from 'components/Button';

const MAX_COIN_USAGE_VALUE = 'MAX_COIN_USAGE_VALUE';
const MAX_COIN_USAGE_PERCENT = 'MAX_COIN_USAGE_PERCENT';

const findCfg = (cfgs, key, defaultValue) => {
  if (cfgs) {
    const r = cfgs.find(el => el.key === key);
    return get(r, 'value', defaultValue);
  }
  return defaultValue;
};

export default function CoinUsageCfg(props) {
  const { cfg, onSave } = props;

  const [settingParams, setSettingParams] = React.useState({});

  React.useEffect(() => {
    setSettingParams({
      maxCoinUsageByPercent: Number(findCfg(cfg, MAX_COIN_USAGE_PERCENT, '0')),
      maxCoinUsageByValue: Number(findCfg(cfg, MAX_COIN_USAGE_VALUE, '0')),
    });
  }, [cfg]);

  const onChangeDataField = name => event => {
    let newFilter = { ...settingParams };
    switch (name) {
      case 'maxCoinUsageByPercent':
      case 'maxCoinUsageByValue': {
        newFilter[name] = Number(event.target.value);
        break;
      }
      default: {
        break;
      }
    }
    setSettingParams(newFilter);
  };

  const onSaveShopSettings = () => {
    const settings = [];
    settings.push({
      key: MAX_COIN_USAGE_VALUE,
      value: settingParams.maxCoinUsageByValue
        ? `${settingParams.maxCoinUsageByValue}`
        : null,
    });
    settings.push({
      key: MAX_COIN_USAGE_PERCENT,
      value: settingParams.maxCoinUsageByPercent
        ? `${settingParams.maxCoinUsageByPercent}`
        : null,
    });
    onSave(settings);
  };

  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h5">Xu tối đa được sử dụng</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item container spacing={3} xs={12} alignItems="center">
              <Grid item xs={2}>
                <Typography>Theo phần trăm</Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  margin="dense"
                  name="maxCoinUsageByPercent"
                  label="Theo phần trăm *"
                  fullWidth
                  variant="outlined"
                  onChange={onChangeDataField('maxCoinUsageByPercent')}
                  value={get(settingParams, 'maxCoinUsageByPercent')}
                  InputProps={{
                    inputComponent: NumberFormatInput,
                    inputProps: {
                      maxLength: '12',
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Grid item container spacing={3} xs={12} alignItems="center">
              <Grid item xs={2}>
                <Typography>Theo giá trị</Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  margin="dense"
                  name="maxCoinUsageByValue"
                  label="Theo giá trị *"
                  fullWidth
                  variant="outlined"
                  onChange={onChangeDataField('maxCoinUsageByValue')}
                  value={get(settingParams, 'maxCoinUsageByValue')}
                  InputProps={{
                    inputComponent: NumberFormatInput,
                    inputProps: {
                      maxLength: '12',
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Btn
            color="primary"
            variant="contained"
            icon="save"
            onClick={onSaveShopSettings}
            style={{
              marginTop: 16,
            }}
          >
            Lưu
          </Btn>
        </CardContent>
      </Card>
    </>
  );
}

CoinUsageCfg.propTypes = {
  cfg: PropTypes.array,
  onSave: PropTypes.func,
};
