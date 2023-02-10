import React, { memo } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import BounceLoader from 'react-spinners/BounceLoader';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';

import { useTheme } from '@material-ui/styles';
import { CONTEXT } from './constants';
import reducer from './reducer';
import { isLoadingSelector } from './selectors';
import Wrapper, { Container, LoadingTransition } from './Wrapper';

function LoadingInPage(props) {
  useInjectReducer({ key: CONTEXT, reducer });

  const { isLoading } = props;
  const theme = useTheme();

  const color = theme.palette.primary.main;

  return ReactDOM.createPortal(
    <LoadingTransition
      in={isLoading}
      classNames="loadinginpage"
      timeout={{ enter: 0, exit: 700 }}
      unmountOnExit
    >
      <Container>
        <Wrapper>
          <BounceLoader color={color} />
        </Wrapper>
      </Container>
    </LoadingTransition>,
    document.getElementById('loading-in-page'),
  );
}

LoadingInPage.propTypes = {
  isLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isLoading: isLoadingSelector(),
});

const withRedux = connect(mapStateToProps);

export default compose(
  withRedux,
  memo,
)(LoadingInPage);
