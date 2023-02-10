import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const styles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    // paddingTop: theme.spacing(3),
  },
  table: {
    // minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  header: {
    backgroundColor: '#fafafa',
  },
  headerText: {
    fontSize: theme.typography.fontSize,
    paddingTop: 10,
    paddingBottom: 10,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  thumb: {
    width: 80,
    height: 80,
    objectFit: 'contain',
    border: 'solid 1px #eee',
  },
  avatar: {
    width: 40,
    height: 40,
  },
  currency: {
    display: 'inline-block',
    whiteSpace: 'nowrap',
  },
  row: {
    cursor: 'pointer',
  },
}));

export const TypeLabel = styled.span`
  display: inline-block;
  white-space: nowrap;
  border-radius: 3px;
  color: ${props => props.color || 'inherit'};
  padding: 3px 8px 4px 8px;
  border: solid 1px ${props => props.color || 'inherit'};
`;

export default styles;
