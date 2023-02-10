/**
 *
 * Spotlight
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
} from '@material-ui/core';

import Header from 'components/Header';
import SpotlightItem from 'containers/SpotlightItem';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectLoading } from 'utils/injectLoading';
import { useInjectToast } from 'utils/injectToast';

import SpotlightItemList from './SpotlightItemList';
import {
  makeSelectSpotlightList,
  makeSelectCategoryList,
  makeSelectSpotlightItemList,
  makeSelectRefeshData,
} from './selectors';
import {
  getListRequest,
  getCategoryListRequest,
  getItemListRequest,
  deleteRequest,
  changeOrderRequest,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { CONTEXT, LOADING_ACTION_TYPES, TOAST_ACTION_TYPES } from './constants';

export function Spotlight(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTION_TYPES);
  useInjectToast(TOAST_ACTION_TYPES);

  const {
    intl,
    spotlightList,
    getSpotlightList,
    categoryList,
    getCategoryList,
    getSpotlightItemList,
    spotlightItemList,
    deleteSpotlightItem,
    changeOrderSpotlightItem,
    refreshData,
  } = props;

  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [spotlightItemId, setSpotlightItemId] = useState(0);
  const [spotlightId, setSpotlightId] = useState(0);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getSpotlightList({});
    getCategoryList({ limit: 100 });
  }, []);

  useEffect(() => {
    reloadData();
  }, [spotlightList]);

  useEffect(() => {
    if (refreshData) {
      reloadData();
    }
  }, [refreshData]);

  const showAddSpotlightItemDialog = id => {
    setEditMode(false);
    setSpotlightId(id);
    setOpenUpdateDialog(true);
  };

  const showEditSpotlightItemDialog = id => {
    setEditMode(true);
    setSpotlightItemId(id);
    setOpenUpdateDialog(true);
  };

  const closeUpdateDialog = () => {
    setOpenUpdateDialog(false);
    setEditMode(false);
    setSpotlightId(0);
    setSpotlightItemId(0);
  };

  const reloadData = () => {
    spotlightList.forEach(element => {
      getSpotlightItemList({ id: element.spotlightId });
    });
  };

  return (
    <div>
      <Helmet>
        <title>{intl.formatMessage(messages.header)}</title>
        <meta name="description" content="Description of Spotlight" />
      </Helmet>

      <Header title={intl.formatMessage(messages.header)} />

      <Grid container spacing={3}>
        {spotlightList.map(spotlight => (
          <Grid item xs={12} key={spotlight.spotlightId}>
            <Card>
              <CardHeader
                title={<Typography variant="h6">{spotlight.name}</Typography>}
              />
              <CardContent>
                <SpotlightItemList
                  intl={intl}
                  spotlightId={spotlight.spotlightId}
                  spotlightItemList={spotlightItemList[spotlight.spotlightId]}
                  addSpotlightItem={showAddSpotlightItemDialog}
                  editSpotlightItem={showEditSpotlightItemDialog}
                  deleteSpotlightItem={deleteSpotlightItem}
                  changeOrderSpotlightItem={changeOrderSpotlightItem}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <SpotlightItem
        open={openUpdateDialog}
        editMode={editMode}
        spotlightId={spotlightId}
        spotlightItemId={spotlightItemId}
        categoryList={categoryList}
        onClose={closeUpdateDialog}
        reloadData={reloadData}
      />
    </div>
  );
}

Spotlight.propTypes = {
  intl: intlShape,
  spotlightList: PropTypes.array,
  getSpotlightList: PropTypes.func,
  categoryList: PropTypes.array,
  getCategoryList: PropTypes.func,
  spotlightItemList: PropTypes.object,
  getSpotlightItemList: PropTypes.func,
  deleteSpotlightItem: PropTypes.func,
  changeOrderSpotlightItem: PropTypes.func,
  refreshData: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  spotlightList: makeSelectSpotlightList(),
  categoryList: makeSelectCategoryList(),
  spotlightItemList: makeSelectSpotlightItemList(),
  refreshData: makeSelectRefeshData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getSpotlightList: payload => dispatch(getListRequest(payload)),
    getCategoryList: payload => dispatch(getCategoryListRequest(payload)),
    getSpotlightItemList: payload => dispatch(getItemListRequest(payload)),
    deleteSpotlightItem: payload => dispatch(deleteRequest(payload)),
    changeOrderSpotlightItem: payload => dispatch(changeOrderRequest(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(injectIntl(Spotlight));
