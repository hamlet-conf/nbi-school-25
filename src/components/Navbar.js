import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import History from '@mui/icons-material/History';
import Home from '@mui/icons-material/Home';

function Navbar({ onShowProfile, onLogout, onShowHistory, showProfileButton = true, isHistoryShown }) {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1a237e' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img src={`${process.env.PUBLIC_URL}/hamlet-square.png`} alt="Logo" style={{ height: 40, marginRight: 10 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            NBI PhD School Meet
          </Typography>
        </Box>
        <IconButton color="inherit" onClick={onShowHistory}>
          {isHistoryShown ? <Home /> : <History />}
        </IconButton>
        {showProfileButton && (
          <IconButton color="inherit" onClick={onShowProfile}>
            <AccountCircle />
          </IconButton>
        )}
        <IconButton color="inherit" onClick={onLogout}>
          <Logout />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;