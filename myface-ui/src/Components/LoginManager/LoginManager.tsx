import React, { createContext, ReactNode, useState } from "react";
import { userLogin } from '../../Api/apiClient'

export const LoginContext = createContext({
    isLoggedIn: false,
    isAdmin: false,
    logIn: (userBase: string) => { },
    logOut: () => { },
});

interface LoginManagerProps {
    children: ReactNode
}

export function LoginManager(props: LoginManagerProps): JSX.Element {
    const [loggedIn, setLoggedIn] = useState(false);

    async function logIn(userBase: string) {
        const response = await userLogin(userBase);
        if (!response.ok) {
            setLoggedIn(false);
        } else{
            setLoggedIn(true);
        }
    }

    function logOut() {
        setLoggedIn(false);
    }

    const context = {
        isLoggedIn: loggedIn,
        isAdmin: loggedIn,
        logIn: logIn,
        logOut: logOut,
    };

    return (
        <LoginContext.Provider value={context}>
            {props.children}
        </LoginContext.Provider>
    );
}