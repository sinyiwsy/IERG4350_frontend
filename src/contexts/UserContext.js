import React, {useContext, useEffect, useState} from 'react';
import { authService } from "../Service";

const UserContext = React.createContext();
const UserUpdateContext = React.createContext();
const IsAdminContext = React.createContext();
const IsAdminUpdateContext = React.createContext();
const NonceContext = React.createContext();
const NonceUpdateContext = React.createContext();

export function useUser(){
    return useContext(UserContext);
}

export function useUserUpdate() {
    return useContext(UserUpdateContext);
}

export function useIsAdmin(){
    return useContext(IsAdminContext);
}

export function useIsAdminUpdate(){
    return useContext(IsAdminUpdateContext);
}

export function useNonce(){
    return useContext(NonceContext);
}

export function useNonceUpdate(){
    return useContext(NonceUpdateContext);
}

export function UserProvider({children}) {
    const [username, setUsername] = useState("Guest");
    const [isAdmin, setIsAdmin] = useState(false);
    const [userUpdated, setUserUpdated] = useState(false);
    const [nonce, setNonce] = useState(0);

    useEffect(() => {
        if (!userUpdated){
            setUserUpdated(true);
            authService().then(res => {
                if (res.data.success == 1){
                    setUsername(res.data["email"]);
                    setIsAdmin(res.data["isAdmin"] == 1 ? true : false);
                    setNonce(res.data["nonce"]);
                }
            });
        }
    });

    return (
        <UserContext.Provider value={username}>
            <UserUpdateContext.Provider value={setUsername}>
                <IsAdminContext.Provider value={isAdmin}>
                    <IsAdminUpdateContext.Provider value={setIsAdmin}>
                        <NonceContext.Provider value={nonce}>
                            <NonceUpdateContext.Provider value={setNonce}>
                                {children}
                            </NonceUpdateContext.Provider>
                        </NonceContext.Provider>
                    </IsAdminUpdateContext.Provider>
                </IsAdminContext.Provider>
            </UserUpdateContext.Provider>
        </UserContext.Provider>
    );
}