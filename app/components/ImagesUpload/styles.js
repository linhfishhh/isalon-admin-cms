import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    width: '100%',
  },
  title: {
    color: 'white',
    height: '100%',
  },
  titleBar: {
    background: 'transparent',
  },
  icon: {
    color: 'white',
    width: 60,
    height: 60,
  },
}));

const InputFile = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;
const Label = styled.label`
  max-width: 100%;
  font-size: ${props => props.theme.typography.body1.fontSize};
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  padding: 0.625rem 1.25rem;
  text-align: center;
  svg {
    vertical-align: middle;
    fill: currentColor;
    margin-top: -0.25em;
    margin-right: 0.25em;
  }
  figure {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: ${props => props.theme.palette.primary.main};
    display: block;
    padding: 20px;
    margin: 0 auto 10px;
  }
  span {
    min-height: 2em;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    vertical-align: top;
  }
`;

const DraggableWrapper = styled.div`
  display: flex;
  overflow: auto;
  max-width: ${props => props.width}px;
  width: ${props => props.width}px;
`;

const DraggableItem = styled.div`
  user-select: none;
  padding: 2px;
  min-width: 150px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;

const ImageStyle = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: solid 1px #ddd;
`;

export {
  useStyles,
  InputFile,
  Label,
  DraggableWrapper,
  DraggableItem,
  ImageStyle,
};
