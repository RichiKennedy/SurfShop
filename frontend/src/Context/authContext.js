import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('userData');
        return storedUser ? JSON.parse(storedUser).user : {
            username: '',
            email: '',
            password: ''
        };
    });

    const [registerUser, setRegisterUser] = useState({
        username: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('userData', JSON.stringify({ user }));
        } else {
            localStorage.removeItem('userData');
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            registerUser,
            setRegisterUser,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};
