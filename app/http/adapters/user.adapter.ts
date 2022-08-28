import HttpAdapter from "http/base-adapter";

const UserAdapter = {
    findByEmail: new HttpAdapter('/api/user/:email', 'GET')
};

export default Object.freeze(UserAdapter);