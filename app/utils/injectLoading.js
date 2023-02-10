import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { isEmpty } from 'lodash';

import {
  removeMiddleware,
  addMiddleware,
} from 'utils/Middlewares/dynamicMiddlewares';
import loadingMiddleware from 'utils/Middlewares/loadingMiddleware';

export default actionTypes => WrappedComponent => {
  class InjectLoading extends React.Component {
    static WrappedComponent = WrappedComponent;

    static contextTypes = {
      store: PropTypes.object.isRequired,
    };

    static displayName = `withLoading(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;

    injectedLoadingMiddleware = loadingMiddleware(actionTypes);

    componentWillMount() {
      if (actionTypes && !isEmpty(actionTypes))
        addMiddleware(this.injectedLoadingMiddleware);
    }

    componentWillUnmount() {
      if (actionTypes && !isEmpty(actionTypes))
        removeMiddleware(this.injectedLoadingMiddleware);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(InjectLoading, WrappedComponent);
};

const useInjectLoading = actionTypes => {
  React.useEffect(() => {
    const injectedLoadingMiddleware = loadingMiddleware(actionTypes);
    if (actionTypes && !isEmpty(actionTypes)) {
      addMiddleware(injectedLoadingMiddleware);
    }

    return () => {
      if (actionTypes && !isEmpty(actionTypes)) {
        removeMiddleware(injectedLoadingMiddleware);
      }
    };
  }, []);
};

export { useInjectLoading };
