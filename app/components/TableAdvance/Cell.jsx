import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { TableCell, Switch, Avatar, Typography } from '@material-ui/core';
import {
  Cancel as CancelIcon,
  CheckCircleOutline as DoneIcon,
  AccountCircle as AvatarIcon,
} from '@material-ui/icons';

import { datetimeFormat } from 'utils/datetime';
import { numberFormat, currencyFormat } from 'utils/stringFormat';
import Img from 'components/Img';
import styles, { TypeLabel } from './styles';

function Cell(props) {
  const { header, dataRow, columnKey } = props;

  const classes = styles();
  const align = header.align || 'left';
  const type = header.type || 'text';
  let row;
  switch (type) {
    case 'avatar':
      row = (
        <TableCell align={align} key={header.id}>
          {get(dataRow, header.id) ? (
            <Avatar
              className={classes.avatar}
              src={get(dataRow, header.id)}
              alt={get(dataRow, header.alt) || 'thumbnail'}
            />
          ) : (
            <Avatar className={classes.avatar}>
              <AvatarIcon />
            </Avatar>
          )}
        </TableCell>
      );
      break;
    case 'image': {
      const dataCell = get(dataRow, header.id) || get(dataRow, header.subId);
      row = (
        <TableCell align={align} key={header.id}>
          <Img
            className={classes.thumb}
            src={dataCell}
            alt={get(dataRow, header.alt) || 'thumbnail'}
          />
        </TableCell>
      );
      break;
    }
    case 'number': {
      const dataCell = get(dataRow, header.id) || get(dataRow, header.subId);
      row = (
        <TableCell align={align} key={header.id}>
          <Typography className={classes.currency}>
            {numberFormat(dataCell)}
          </Typography>
        </TableCell>
      );
      break;
    }
    case 'currency': {
      const dataCell = get(dataRow, header.id) || get(dataRow, header.subId);
      row = (
        <TableCell align={align} key={header.id}>
          <Typography className={classes.currency}>
            {currencyFormat(dataCell)}
          </Typography>
        </TableCell>
      );
      break;
    }
    case 'typeOf': {
      const dataCell = get(dataRow, header.id);
      row = (
        <TableCell align={align} key={header.id}>
          {header.typeList ? (
            <TypeLabel
              color={get(header.typeList.typeFromString(dataCell), 'color')}
            >
              {get(header.typeList.typeFromString(dataCell), 'name')}
            </TypeLabel>
          ) : (
            get(dataRow, header.id)
          )}
        </TableCell>
      );
      break;
    }
    case 'dateTime':
      row = (
        <TableCell align={align} key={header.id}>
          {datetimeFormat(get(dataRow, header.id), header.format)}
        </TableCell>
      );
      break;
    case 'checked': {
      const { hidden } = header;
      row = (
        <TableCell align={align} key={header.id}>
          {get(dataRow, header.id) ? (
            <>{hidden !== 1 && <DoneIcon color="primary" />}</>
          ) : (
            <>{hidden !== 0 && <CancelIcon color="error" />}</>
          )}
        </TableCell>
      );
      break;
    }
    case 'switch': {
      const dataCell = get(dataRow, header.id);
      row = (
        <TableCell align={align} key={header.id}>
          <Switch
            checked={dataCell}
            onChange={() => header.onChange(dataRow[columnKey], !dataCell)}
            color="primary"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </TableCell>
      );
      break;
    }
    case 'actions':
      row = (
        <TableCell align={align} key={header.id}>
          {header.actions.map(action => action(dataRow[columnKey], dataRow))}
        </TableCell>
      );
      break;
    case 'customize':
      row = (
        <TableCell align={align} key={header.id}>
          {header.customize(dataRow)}
        </TableCell>
      );
      break;
    default:
      row = (
        <TableCell align={align} key={header.id}>
          {get(dataRow, header.id) || get(dataRow, header.subId)}
        </TableCell>
      );
      break;
  }
  return row;
}

Cell.propTypes = {
  header: PropTypes.object,
  dataRow: PropTypes.object,
  columnKey: PropTypes.string,
};

export default memo(Cell);
