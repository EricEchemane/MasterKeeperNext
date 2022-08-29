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
        },
        null
    >(new HttpAdapter("/api/user/add-account", 'POST'))
});

export default UserAdapters;