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
import endOfDay from 'date-fns/endOfDay';
import DatePicker from 'components/DatePicker';
import NumberFormatInput from 'components/NumberFormatInput';
import Btn from 'components/Button';

const STORAGE_PROVINCE = 'STORAGE_PROVINCE';
const SHIP_FEE_THRESHOLD = 'SHIP_FEE_THRESHOLD';
const URBAN_SHIP_FEE = 'URBAN_SHIP_FEE';
const SUBURBAN_SHIP_FEE = 'SUBURBAN_SHIP_FEE';

const findCfg = (cfgs, key, defaultValue) => {
  if (cfgs) {
    const r = cfgs.find(el => el.key === key);
    return get(r, 'value', defaultValue);
  }
  return defaultValue;
};

export default function ShipFeeCfg(props) {
  const { cfg, onSave, provinces } = props;

  const [shipFeeParams, setShipFeeParams] = React.useState({});

  React.useEffect(() => {
    setShipFeeParams({
      threshold: Number(findCfg(cfg, SHIP_FEE_THRESHOLD, '0')),
      urbanFee: Number(findCfg(cfg, URBAN_SHIP_FEE, '0')),
      suburbanFee: Number(findCfg(cfg, SUBURBAN_SHIP_FEE, '0')),
    });
  }, [cfg]);

  const storageProvince = React.useMemo(() => {
    return find(
      provinces,
      p => p.provinceId === Number(findCfg(cfg, STORAGE_PROVINCE, '0')),
    );
  }, [cfg, provinces]);

  const onChangeDataField = name => event => {
    let newFilter = { ...shipFeeParams };
    switch (name) {
      case 'threshold':
      case 'urbanFee':
      case 'suburbanFee': {
        newFilter[name] = Number(event.target.value);
        break;
      }
      default: {
        break;
      }
    }
    setShipFeeParams(newFilter);
  };

  const onSaveShipFeeSettings = () => {
    const settings = [];
    settings.push({
      key: SHIP_FEE_THRESHOLD,
      value: shipFeeParams.threshold ? `${shipFeeParams.threshold}` : null,
    });
    settings.push({
      key: URBAN_SHIP_FEE,
      value: shipFeeParams.urbanFee ? `${shipFeeParams.urbanFee}` : null,
    });
    settings.push({
      key: SUBURBAN_SHIP_FEE,
      value: shipFeeParams.suburbanFee ? `${shipFeeParams.suburbanFee}` : null,
    });
    onSave(settings);
  };

  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h5">Ph?? v???n chuy???n</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item container spacing={3} xs={12} alignItems="center">
              <Grid item xs={2}>
                <Typography>Ng?????ng thu ph??</Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  margin="dense"
                  name="invitee"
                  label="Ng?????ng thu ph?? *"
                  fullWidth
                  variant="outlined"
                  onChange={onChangeDataField('threshold')}
                  value={get(shipFeeParams, 'threshold')}
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
                <Typography>Ph?? ship n???i th??nh</Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  margin="dense"
                  name="invitee"
                  label="Ph?? ship n???i th??nh *"
                  fullWidth
                  variant="outlined"
                  onChange={onChangeDataField('urbanFee')}
                  value={get(shipFeeParams, 'urbanFee')}
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
                <Typography>Ph?? ship ngo???i th??nh</Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  margin="dense"
                  name="invitee"
                  label="Ph?? ship ngo???i th??nh *"
                  fullWidth
                  variant="outlined"
                  onChange={onChangeDataField('suburbanFee')}
                  value={get(shipFeeParams, 'suburbanFee')}
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
                <Typography>Kho</Typography>
              </Grid>
              <Grid item xs>
                <Typography>
                  {get(storageProvince, 'name', 'Ch??a c??i ?????t')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Btn
            color="primary"
            variant="contained"
            icon="save"
            onClick={onSaveShipFeeSettings}
            style={{
              marginTop: 16,
            }}
          >
            L??u
          </Btn>
        </CardContent>
      </Card>
    </>
  );
}

ShipFeeCfg.propTypes = {
  cfg: PropTypes.array,
  onSave: PropTypes.func,
  provinces: PropTypes.array,
};
