import React, { useMemo, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, Container, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';

// project imports
import Header from './Header';
import MainBg from 'assets/images/main-bg1.jpg';
// styles
const Main = styled('main')(({ theme }) => ({
  ...theme.typography.mainContent,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  marginLeft: '0px',
  width: `100%`,
  marginRight: '0px',
  backgroundImage: `url(${MainBg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();

  const header =  (
    <Toolbar sx={{ p: '10px' }}>
      <Header />
    </Toolbar>
  )
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
      >
        {header}
      </AppBar>

      <Main theme={theme}>
        <Container maxWidth={'xl'}>
          <Outlet />
        </Container>
      </Main>
    </Box>
  );
};

export default MainLayout;
