import styled from 'styled-components';

const OverlaySideView = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.3);
`;

const WrapperSideView = styled.div`
  height: ${props => props.size}px;
  width: 100%;
  position: absolute;
  z-index: 10;
  bottom: 0;
  left: 0;
  background-color: #fff;
  border-top: solid 1px #ccc;
  box-shadow: 0 0 4px 0 #ccc;
  overflow-x: hidden;
  transition: 0.5s;
`;

const ButtonClose = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`;

export { OverlaySideView, WrapperSideView, ButtonClose };
