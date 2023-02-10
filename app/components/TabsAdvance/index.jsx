/**
 *
 * TabsAdvance
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import TabPanel from './TabPanel';

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  panel: {
    overflowX: 'scroll',
  },
  tab: {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
  },
}));

function TabsAdvance(props) {
  const {
    dataSource,
    dataTextField,
    dataValueField,
    contentTab,
    selectedTab,
    onSelectedTabChange,
  } = props;
  const classes = useStyles();

  const activeTab = selectedTab
    ? dataSource
        .map(item => item[dataValueField])
        .indexOf(selectedTab[dataValueField])
    : 0;
  function handleChange(event, newValue) {
    onSelectedTabChange(dataSource[newValue]);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={activeTab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {dataSource.map((item, index) => (
            <Tab
              className={classes.tab}
              key={item[dataValueField]}
              label={item[dataTextField]}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </AppBar>

      {dataSource.map((item, index) => (
        <TabPanel
          key={item[dataValueField]}
          value={activeTab}
          index={index}
          className={classes.panel}
        >
          {contentTab(item)}
        </TabPanel>
      ))}
    </div>
  );
}

TabsAdvance.propTypes = {
  dataSource: PropTypes.array.isRequired,
  dataTextField: PropTypes.string.isRequired,
  dataValueField: PropTypes.string.isRequired,
  contentTab: PropTypes.func.isRequired,
  selectedTab: PropTypes.object,
  onSelectedTabChange: PropTypes.func,
};

export default memo(TabsAdvance);
