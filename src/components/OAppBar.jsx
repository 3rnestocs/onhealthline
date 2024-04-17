import React from 'react';
import { AppBar, Toolbar, IconButton, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

function OAppBar({ onMenuClick, onLoginClick, showLoginButton }) {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#10587e' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {!showLoginButton && (
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={onMenuClick}
                        >
                            <HomeIcon />
                        </IconButton>
                    )}
                    {showLoginButton && (
                        <div style={{ width: '24px' }} />
                    )}
                </div>
                {showLoginButton && (
                    <Button color="inherit" onClick={onLoginClick}>Login</Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default OAppBar;