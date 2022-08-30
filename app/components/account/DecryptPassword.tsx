import { Button } from '@mui/material';
import { IAccount } from 'entities/account.entity';
import React, { useState } from 'react';

export default function DecryptPassword(props: {
    account: IAccount;
}) {
    const [decrypted, setDecrypted] = useState(false);
    const [decryptedPassword, setDecryptedPassword] = useState<string>();

    const toggleDecryption = async () => {
        setDecrypted(d => !d);
    };

    return <>
        {decrypted
            ? <Button onClick={toggleDecryption} size='small'> {decryptedPassword || 'decrypted'} </Button>
            : <Button onClick={toggleDecryption} size='small'> decrypt </Button>}
    </>;
}
