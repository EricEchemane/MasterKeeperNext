import { IUser } from "entities/user.entity";
import { createContext, useContext, useReducer } from "react";
import { initialUserState, reducer, userActions } from "./user.context.reducer";

const UserContext = createContext<any>(null);

export const UserProvider = (props: {
    children: JSX.Element;
}) => {
    const [state, dispatch] = useReducer(reducer, initialUserState);
    return <>
        <UserContext.Provider value={{ state, dispatch }}>
            {props.children}
        </UserContext.Provider>
    </>;
};

const useUserContext = () => useContext<{
    state: IUser;
    dispatch: ({ type, payload }: { type: userActions, payload: any; }) => {};
}>(UserContext);

export default useUserContext;