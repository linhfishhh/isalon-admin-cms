import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { isEmpty } from 'lodash';

import {
  removeMiddleware,
  addMiddleware,
} from 'utils/Middlewares/dynamicMiddlewares';
import toastMiddleware from 'utils/Middlewares/toastMiddleware';

export default actionTypes => WrappedComponent => {
  class InjectToast extends React.Component {
    static WrappedComponent = WrappedComponent;

    static contextTypes = {
      store: PropTypes.object.isRequired,
    };

    static displayName = `withToast(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;

    injectedToastMiddleware = toastMiddleware(actionTypes);

    componentWillMount() {
      if (actionTypes && !isEmpty(actionTypes))
        addMiddleware(this.injectedToastMiddleware);
    }

    componentWillUnmount() {
      if (actionTypes && !isEmpty(actionTypes))
        removeMiddleware(this.injectedToastMiddleware);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(InjectToast, WrappedComponent);
};

const useInjectToast = actionTypes => {
  React.useEffect(() => {
    const injectedToastMiddleware = toastMiddleware(actionTypes);
    if (actionTypes && !isEmpty(actionTypes)) {
      addMiddleware(injectedToastMiddleware);
    }

    return () => {
      if (actionTypes && !isEmpty(actionTypes)) {
        removeMiddleware(injectedToastMiddleware);
      }
    };
  }, []);
};

export { useInjectToast };
