import HttpAdapter from "http/base-adapter";
import useHttpAdapter from "http/useHttpAdapter";

const UserAdapters = Object.freeze({
    SignIn: () => useHttpAdapter<
        { name: string; email: string; image: string; password: string; },
        null>(new HttpAdapter("/api/user/sign-in", 'POST'))
});

export default UserAdapters;