import styled from 'styled-components';
import { spacing } from '@material-ui/system';
import { Paper as MuiPaper } from '@material-ui/core';
import Navbar from 'components/Navbar';

const drawerWidth = 250;

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Drawer = styled.div`
  ${props => props.theme.breakpoints.up('lg')} {
    width: ${drawerWidth}px;
    flex-shrink: 0;
  }
`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Paper = styled(MuiPaper)(spacing);

const MainContent = styled(Paper)`
  flex: 1;
  background: ${props => props.theme.body.background};
  padding: ${props => props.theme.spacing(4)}px;

  .MuiPaper-root {
    border: 1px solid #e6eaee;

    .MuiPaper-root {
      border: 0;
    }
  }
`;

const NavBar = styled(Navbar)`
  z-index: ${props => props.theme.zIndex.drawer + 1};
`;

const MainSinglePage = styled.div`
  flex: 1;
`;

export {
  drawerWidth,
  Root,
  AppContent,
  MainContent,
  Drawer,
  NavBar,
  MainSinglePage,
};
