import { IAccount } from 'entities/account.entity';
import React from 'react';

export default function AccountsTab({ accounts }: { accounts: IAccount[]; }) {
    return <>
        {JSON.stringify(accounts, null, 4)}
    </>;
}
