import { DarkModeOutlined, LightModeOutlined, LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { Divider, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import { signOut } from 'next-auth/react';
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useThemeContext from 'contexts/theme';

export default function AppHeaderMenu() {
    const { theme, toggleTheme } = useThemeContext();
    const isDarkMode = theme === 'dark';
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const changeTheme = () => {
        toggleTheme();
        handleClose();
    };
    const signUserOut = () => {
        signOut();
        handleClose();
    };

    return (
        <div>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                aria-label='menu'>
                <MenuOutlined />
            </IconButton>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}>
                <MenuItem onClick={changeTheme}>
                    <ListItemIcon>
                        {isDarkMode ? <LightModeOutlined fontSize="small" /> : <DarkModeOutlined fontSize="small" />}
                    </ListItemIcon>
                    <ListItemText> {isDarkMode ? 'Light theme' : 'Dark theme'} </ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={signUserOut}>
                    <ListItemIcon>
                        <LogoutOutlined />
                    </ListItemIcon>
                    <ListItemText> Sign out </ListItemText>
                </MenuItem>
            </Menu>
        </div>
    );
}
