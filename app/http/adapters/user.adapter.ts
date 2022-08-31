import HttpAdapter from "http/base-adapter";
import useHttpAdapter from "http/useHttpAdapter";

const UserAdapters = Object.freeze({
    SignIn: () => useHttpAdapter<
        {
            name: string;
            email: string;
            image: string;
            password: string;
        },
        null
    >(new HttpAdapter("/api/user/sign-in", 'POST')),

    AddAccount: () => useHttpAdapter<
        {
            account_label: string;
            username: string;
            password: string;
            account_url: string;
            master_password: string;
        },
        null
    >(new HttpAdapter("/api/account/add", 'POST')),

    Get: () => useHttpAdapter(new HttpAdapter("/api/user", 'GET')),

    DecryptAccount: () => useHttpAdapter<
        {
            encrypted_password: string;
            master_password: string;
            account_id: string;
        },
        null
    >(new HttpAdapter("/api/account/decrypt", 'POST')),
});

export default UserAdapters;