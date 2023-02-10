import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

const Wrapper = styled.div`
  margin: 2em auto;
  position: relative;
`;

export const LoadingTransition = styled(CSSTransition)`
  &.loadinginpage-exit {
    opacity: 1;
  }

  &.loadinginpage-exit-active {
    opacity: 0.01;
    transition: opacity 700ms ease-out;
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.5);
`;

export default Wrapper;
