import { IUser } from "entities/user.entity";

export type userActions = "set_user";

export function reducer(
    state: IUser,
    { type, payload }: { type: userActions; payload: any; }
): IUser {
    switch (type) {
        case "set_user":
            return payload;
        default:
            return state;
    }
}

export const initialUserState: IUser = {
    email: '',
    name: '',
    image: '',
    accounts: [],
    password: '',
};