import HttpAdapter from "http/base-adapter";
import useHttpAdapter from "http/useHttpAdapter";

const UserAdapters = Object.freeze({
    FindByEmail: () => useHttpAdapter
        <null, { email: string; }>
        (new HttpAdapter('/api/user/:email', 'GET'))
});

export default UserAdapters;