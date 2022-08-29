import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import { TextField } from '@mui/material';
import { useState } from 'react';
import useForm from 'hooks/useForm';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
};

export default function GetMasterPasswordModal(props: {
    open: boolean;
    onClose: () => void;
    onPasswordSubmitted: (p: string) => void;
}) {
    const [hasError, setHasError] = useState(false);
    const { values, handleChange } = useForm({ password: '' });
    const _continue = () => {
        if (values.password.toString().trim() === '') {
            setHasError(true);
            return;
        }
        props.onPasswordSubmitted(values.password.toString());
        setHasError(false);
        values.password = '';
    };

    return (
        <Modal
            style={{ width: 'min(95vw, 450px)', margin: 'auto' }}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={props.open}
            onClose={props.onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={props.open}>
                <Box sx={style}>
                    <Stack spacing={3}>
                        <Typography id="transition-modal-title" variant="h6">
                            Please enter your master password
                        </Typography>
                        <TextField
                            autoFocus
                            type='password'
                            error={hasError}
                            helperText={hasError && 'Please enter your master password'}
                            name='password'
                            value={values.password}
                            onChange={handleChange}
                            label='Master password' />
                        <Button onClick={_continue}> continue </Button>
                    </Stack>
                </Box>
            </Fade>
        </Modal>
    );
}
