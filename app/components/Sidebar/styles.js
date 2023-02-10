import styled from 'styled-components';
import {
  ListItem,
  Typography,
  Drawer as MuiDrawer,
  ListItemText,
  List as MuiList,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { darken, rgba } from 'polished';
import PerfectScrollbar from 'react-perfect-scrollbar';

const Drawer = styled(MuiDrawer)`
  border-right: 0;
  > div {
    border-right: 0;
  }
`;
const Brand = styled(ListItem)`
  font-size: ${props => props.theme.typography.h5.fontSize};
  font-weight: ${props => props.theme.typography.fontWeightMedium};
  color: ${props => props.theme.sidebar.header.color};
  background-color: ${props => props.theme.sidebar.header.background};
  font-family: ${props => props.theme.typography.fontFamily};
  min-height: 56px;

  ${props => props.theme.breakpoints.up('sm')} {
    min-height: 64px;
  }
`;

const SidebarFooter = styled.div`
  background-color: ${props =>
    props.theme.sidebar.footer.background} !important;
  padding: ${props => props.theme.spacing(3)}px
    ${props => props.theme.spacing(4)}px;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

const SidebarFooterText = styled(Typography)`
  color: ${props => props.theme.sidebar.footer.color};
`;
const Dot = styled.span`
  width: 12px;
  height: 12px;
  margin-right: 4px;
  background-color: ${props => props.theme.sidebar.footer.online.background};
  display: inline-block;
  border-radius: 50%;
  margin-bottom: -0.5px;
`;

//
const CategoryText = styled(ListItemText)`
  margin: 0;
  span {
    color: ${props => props.theme.sidebar.color};
    font-size: ${props => props.theme.typography.body1.fontSize};
    padding: 0 16px;
  }
`;

const LinkText = styled(ListItemText)`
  color: ${props => props.theme.sidebar.color};
  span {
    font-size: ${props => props.theme.typography.body1.fontSize};
  }
  margin-top: 0;
  margin-bottom: 0;
`;

const Link = styled(ListItem)`
  padding-left: ${props => props.theme.spacing(12)}px;
  padding-top: ${props => props.theme.spacing(2)}px;
  padding-bottom: ${props => props.theme.spacing(2)}px;

  span {
    color: ${props => rgba(props.theme.sidebar.color, 0.7)};
  }

  &:hover span {
    color: ${props => rgba(props.theme.sidebar.color, 0.9)};
  }

  &.${props => props.activeClassName} {
    background-color: ${props => darken(0.06, props.theme.sidebar.background)};

    span {
      color: ${props => props.theme.sidebar.color};
    }
  }
`;

const Category = styled(ListItem)`
  padding: ${props => props.theme.spacing(3)}px;

  svg {
    color: ${props => props.theme.sidebar.color};
    font-size: 20px;
    width: 20px;
    height: 20px;
    opacity: 0.5;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.08);
  }

  &.${props => props.activeClassName} {
    background-color: ${props => darken(0.05, props.theme.sidebar.background)};

    span {
      color: ${props => props.theme.sidebar.color};
    }
  }
`;

const CategoryIconLess = styled(ExpandLess)`
  color: ${props => rgba(props.theme.sidebar.color, 0.5)};
`;

const CategoryIconMore = styled(ExpandMore)`
  color: ${props => rgba(props.theme.sidebar.color, 0.5)};
`;

const Scrollbar = styled(PerfectScrollbar)`
  background-color: ${props => props.theme.sidebar.background};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

const List = styled(MuiList)`
  background-color: ${props => props.theme.sidebar.background};
`;

const Items = styled.div`
  padding-top: ${props => props.theme.spacing(2.5)}px;
  padding-bottom: ${props => props.theme.spacing(2.5)}px;
`;

export {
  Drawer,
  Brand,
  Dot,
  SidebarFooter,
  SidebarFooterText,
  CategoryText,
  LinkText,
  Link,
  Category,
  CategoryIconLess,
  CategoryIconMore,
  Scrollbar,
  List,
  Items,
};
