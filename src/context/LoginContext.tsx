import { useState, type ReactNode } from "react";
import { createContext } from "react";
import type { User } from "../types/User";
import type { Family } from "../types/Family";

interface LoginContextType {
    isLogin: boolean;
    setIsLogin : Function;
    user: User | null;
    setUser : (user: User | null) => void;
    family : Family | null;
    setFamily : (family: Family | null) => void;
    
}

export const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider = ({ children } : { children : ReactNode }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [family, setFamily] = useState<Family | null>(null);

    return (
        <LoginContext.Provider value={{ isLogin, setIsLogin, user, setUser, family, setFamily }}>
            {children}
        </LoginContext.Provider>
    );
};