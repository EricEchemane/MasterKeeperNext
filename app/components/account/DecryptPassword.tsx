import { Button } from '@mui/material';
import GetMasterPasswordModal from 'components/home/GetMasterPasswordModal';
import { IAccount } from 'entities/account.entity';
import useNotification from 'hooks/useNotification';
import UserAdapters from 'http/adapters/user.adapter';
import React, { useEffect, useState } from 'react';

export default function DecryptPassword(props: {
    account: IAccount;
}) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [decrypted, setDecrypted] = useState(false);
    const [decryptedPassword, setDecryptedPassword] = useState<string>();
    const decryptAdapter = UserAdapters.DecryptAccount();
    const notify = useNotification();

    const decrypt = async (password: string) => {
        const data = await decryptAdapter.execute({
            payload: {
                account_id: props.account._id || '',
                encrypted_password: props.account.password,
                master_password: password
            }
        });
        if (data) {
            setDecryptedPassword(data.data);
            setDecrypted(true);
            setModalIsOpen(false);
        }
    };
    const openModal = () => {
        if (decrypted) {
            setDecrypted(false);
            return;
        }
        if (decryptedPassword) {
            setDecrypted(true);
            return;
        }
        setModalIsOpen(true);
    };

    useEffect(() => {
        if (!decryptAdapter.error) return;
        notify(decryptAdapter.error.message || 'Something went wrong', 'error');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [decryptAdapter.error]);

    return <>
        {decrypted
            ? <Button onClick={openModal} size='small'> {decryptedPassword || 'decrypted'} </Button>
            : <Button onClick={openModal} size='small'> decrypt </Button>}
        <GetMasterPasswordModal
            onPasswordSubmitted={decrypt}
            open={modalIsOpen}
            onClose={() => setModalIsOpen(false)} />
    </>;
}
