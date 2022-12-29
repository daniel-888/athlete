// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box, Button,
  Typography,
} from '@mui/material';

// assets
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import useAuth from "../../../../hooks/useAuth";
import React from "react";

// ==============================|| LOCALIZATION ||============================== //

const LogoutSection = () => {
  const theme = useTheme();
  const { logout } = useAuth();

  return (
    <Box
      sx={{
        mr: 1,
        [theme.breakpoints.down('md')]: {
          ml: 1
        },
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Button
        onClick={logout}
        disableElevation
        variant="outlined"
        color="secondary"
      >
        Logout
      </Button>
    </Box>
  );
};

export default LogoutSection;
