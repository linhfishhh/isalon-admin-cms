/**
 *
 * SpotlightItemList
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Grid, Typography } from '@material-ui/core';

import Button from 'components/Button';
import AlertDialog from 'components/AlertDialog';
import DnDListItem from 'components/DnDListItem';

import messages from './messages';

function SpotlightItemList(props) {
  const {
    intl,
    spotlightId,
    spotlightItemList,
    addSpotlightItem,
    editSpotlightItem,
    deleteSpotlightItem,
    changeOrderSpotlightItem,
  } = props;

  const [idRemove, setIdRemove] = useState(0);

  const handlerDidChangeOrder = listNewOrder => {
    const orders = listNewOrder.map(item => item.spotlightItemId);
    changeOrderSpotlightItem({ data: { orders }, listNewOrder, spotlightId });
  };

  const onConfirmCancelRemove = () => {
    setIdRemove(0);
  };

  const onConfirmRemove = () => {
    deleteSpotlightItem({ id: idRemove });
    setIdRemove(0);
  };

  const renderSpotlightItem = item => (
    <Grid container>
      <Grid item xs={5} container alignItems="center">
        <Typography variant="subtitle1" color="primary" noWrap>
          {item.name}
        </Typography>
      </Grid>
      <Grid item xs container alignItems="center" />
      <Grid item>
        <Button
          icon="edit"
          type="iconButton"
          onClick={() => editSpotlightItem(item.spotlightItemId)}
        />
        <Button
          icon="delete"
          type="iconButton"
          onClick={() => {
            setIdRemove(item.spotlightItemId);
          }}
        />
      </Grid>
    </Grid>
  );

  return (
    <>
      <DnDListItem
        items={spotlightItemList}
        renderChild={renderSpotlightItem}
        onOrderChange={handlerDidChangeOrder}
      />
      <Grid container justify="center">
        <Grid item>
          <Button icon="add" onClick={() => addSpotlightItem(spotlightId)} />
        </Grid>
      </Grid>
      <AlertDialog
        open={idRemove !== 0}
        description={intl.formatMessage(messages.confirmDelete)}
        onCancel={onConfirmCancelRemove}
        onConfirm={onConfirmRemove}
      />
    </>
  );
}
SpotlightItemList.propTypes = {
  intl: intlShape,
  spotlightId: PropTypes.number,
  spotlightItemList: PropTypes.array,
  addSpotlightItem: PropTypes.func,
  editSpotlightItem: PropTypes.func,
  deleteSpotlightItem: PropTypes.func,
  changeOrderSpotlightItem: PropTypes.func,
};

export default memo(SpotlightItemList);
