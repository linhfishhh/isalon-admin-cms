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
import endOfDay from 'date-fns/endOfDay';
import DatePicker from 'components/DatePicker';
import NumberFormatInput from 'components/NumberFormatInput';
import Btn from 'components/Button';

const AFFILIATE_START_DATE = 'AFFILIATE_START_DATE';
const AFFILIATE_END_DATE = 'AFFILIATE_END_DATE';
const AFFILIATE_ENABLED = 'AFFILIATE_ENABLED';
const INVITER_REWARD_AMOUNT = 'INVITER_REWARD_AMOUNT';
const INVITEE_REWARD_AMOUNT = 'INVITEE_REWARD_AMOUNT';

const findCfg = (cfgs, key, defaultValue) => {
  if (cfgs) {
    const r = cfgs.find(el => el.key === key);
    return get(r, 'value', defaultValue);
  }
  return defaultValue;
};

export default function AffiliateCfg(props) {
  const { cfg, onSave } = props;

  const [affiliateParams, setAffiliateParams] = React.useState({
    start: null,
    end: null,
  });

  React.useEffect(() => {
    const start = findCfg(cfg, AFFILIATE_START_DATE);
    const end = findCfg(cfg, AFFILIATE_END_DATE);
    setAffiliateParams({
      start: start ? new Date(Number(start)) : null,
      end: end ? new Date(Number(end)) : null,
      status: findCfg(cfg, AFFILIATE_ENABLED, 'false') === 'true',
      inviter: Number(findCfg(cfg, INVITER_REWARD_AMOUNT, '0')),
      invitee: Number(findCfg(cfg, INVITEE_REWARD_AMOUNT, '0')),
    });
  }, [cfg]);

  const onChangeDataField = name => event => {
    let newFilter;
    switch (name) {
      case 'start':
      case 'end': {
        newFilter = {
          ...affiliateParams,
          [name]: event,
        };
        break;
      }
      case 'inviter':
      case 'invitee': {
        newFilter = {
          ...affiliateParams,
          [name]: Number(event.target.value),
        };
        break;
      }
      case 'status': {
        newFilter = {
          ...affiliateParams,
          [name]: event.target.checked,
        };
        break;
      }
      default: {
        break;
      }
    }
    setAffiliateParams(newFilter);
  };

  const onSaveAffiliateSetting = () => {
    const settings = [];
    settings.push({
      key: AFFILIATE_START_DATE,
      value: affiliateParams.start
        ? `${affiliateParams.start.getTime()}`
        : null,
    });
    settings.push({
      key: AFFILIATE_END_DATE,
      value: affiliateParams.end
        ? `${endOfDay(affiliateParams.end).getTime()}` // 23:59:59
        : null,
    });
    settings.push({
      key: AFFILIATE_ENABLED,
      value: affiliateParams.status === true ? 'true' : 'false',
    });
    settings.push({
      key: INVITER_REWARD_AMOUNT,
      value: affiliateParams.inviter ? `${affiliateParams.inviter}` : null,
    });
    settings.push({
      key: INVITEE_REWARD_AMOUNT,
      value: affiliateParams.invitee ? `${affiliateParams.invitee}` : null,
    });
    onSave(settings);
  };

  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h5">Affiliate</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={2}>
              <Typography>Trạng thái</Typography>
            </Grid>
            <Grid item xs={10}>
              <Switch
                checked={get(affiliateParams, 'status', true)}
                onChange={onChangeDataField('status')}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography>Thời gian</Typography>
            </Grid>
            <Grid item xs={3}>
              <DatePicker
                label="Từ"
                value={affiliateParams.start}
                onChange={onChangeDataField('start')}
              />
            </Grid>
            <Grid item xs={3}>
              <DatePicker
                label="Đến"
                value={affiliateParams.end}
                onChange={onChangeDataField('end')}
              />
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={2}>
              <Typography>Số xu tặng người mời</Typography>
            </Grid>
            <Grid item xs={3}>
              <TextField
                margin="dense"
                name="inviter"
                label="Số lượng xu *"
                fullWidth
                variant="outlined"
                onChange={onChangeDataField('inviter')}
                value={get(affiliateParams, 'inviter')}
                InputProps={{
                  inputComponent: NumberFormatInput,
                  inputProps: {
                    maxLength: '12',
                  },
                }}
              />
            </Grid>
            <Grid item xs={7} />
            <Grid item xs={2}>
              <Typography>Số xu tặng người được mời</Typography>
            </Grid>
            <Grid item xs={3}>
              <TextField
                margin="dense"
                name="invitee"
                label="Số lượng xu *"
                fullWidth
                variant="outlined"
                onChange={onChangeDataField('invitee')}
                value={get(affiliateParams, 'invitee')}
                InputProps={{
                  inputComponent: NumberFormatInput,
                  inputProps: {
                    maxLength: '12',
                  },
                }}
              />
            </Grid>
          </Grid>
          <Btn
            color="primary"
            variant="contained"
            icon="save"
            onClick={onSaveAffiliateSetting}
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

AffiliateCfg.propTypes = {
  cfg: PropTypes.array,
  onSave: PropTypes.func,
};
