import { DeleteForeverOutlined, EditOutlined, MoreHoriz } from '@mui/icons-material';
import { Divider, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IAccount } from 'entities/account.entity';
import useEditAccount from 'contexts/edit-account';

export default function AccountMenu(props: { account: IAccount; }) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const { openModal } = useEditAccount();
    const edit = () => {
        handleClose();
        openModal(props.account);
    };

    return (
        <>
            <div>
                <IconButton
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    aria-label='menu'>
                    <MoreHoriz />
                </IconButton>

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}>
                    <MenuItem onClick={edit}>
                        <ListItemIcon>
                            <EditOutlined />
                        </ListItemIcon>
                        <ListItemText> Edit </ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ListItemIcon>
                            <DeleteForeverOutlined color='error' />
                        </ListItemIcon>
                        <ListItemText sx={{ color: '#ff5338' }}> Remove this account </ListItemText>
                    </MenuItem>
                </Menu>
            </div>
        </>
    );
}
