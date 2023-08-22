import React, { createContext, ReactNode, useState } from "react";
import { userLogin } from '../../Api/apiClient'
import  { Redirect } from 'react-router-dom'

export const LoginContext = createContext({
    userBase: "",
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
    const [admin, setAdmin] = useState(false);
    const [base, setBase] = useState("");

    async function logIn(submittedUserBase: string) {
        const response = await userLogin(submittedUserBase);
        if (!response.ok) {
            setLoggedIn(false);
            if(response.status === 401)
            {
                //make the toaster
            }
            return <Redirect to='/login'  />
        } else{
            var responseBody = await response.json();
            console.log(responseBody)
            if(responseBody && responseBody.role === 1)
            {
                setAdmin(true);
            }
            setBase(submittedUserBase);
            setLoggedIn(true);
        }
    }

    function logOut() {
        setBase("");
        setAdmin(false);
        setLoggedIn(false);
    }

    const context = {
        userBase: base,
        isLoggedIn: loggedIn,
        isAdmin: admin,
        logIn: logIn,
        logOut: logOut,
    };

    return (
        <LoginContext.Provider value={context}>
            {props.children}
        </LoginContext.Provider>
    );
}