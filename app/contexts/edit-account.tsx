import EditAccountDialog from "components/account/EditAccountDialog";
import { IAccount } from "entities/account.entity";
import { createContext, useContext, useState } from "react";

const EditAccountContext = createContext<any>(null);

const useEditAccount = () => useContext<{
    openModal: () => void;
    setAccount: (account: IAccount) => void;
}>(EditAccountContext);

export default useEditAccount;

export function EditAccountProvider(props: { children: JSX.Element; }) {
    const [open, setOpen] = useState(false);
    const [account, setAccount] = useState<IAccount>();
    const closeModal = () => {
        setOpen(false);
    };
    const openModal = () => {
        setOpen(true);
    };
    return <>
        <EditAccountContext.Provider value={{ openModal, setAccount }}>
            {props.children}
            <EditAccountDialog
                open={open}
                account={account}
                close={closeModal}
            />
        </EditAccountContext.Provider>
    </>;
}