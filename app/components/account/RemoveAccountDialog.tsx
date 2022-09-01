import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function RemoveAccountDialog(props: {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}) {

    const handleClose = () => {
        props.onClose();
    };

    return (
        <div>
            <Dialog
                maxWidth='xs'
                fullWidth
                open={props.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title"> Confirm </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to remove this account?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>cancel</Button>
                    <Button onClick={props.onConfirm} autoFocus>
                        confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
