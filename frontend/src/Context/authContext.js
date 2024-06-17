import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
      })
    const [registerUser, setRegisterUser] = useState({
        username: '',
        email: '',
        password: ''
      });
      // Check if user exists before logging
      if (user) {
        console.log('User:');
        if (user.username) {
          console.log('Username:', user.username);
        }
        if (user.email) {
          console.log('Email:', user.email);
        }
        // Similarly, check and log other properties as needed
      } else {
        console.log('User not logged in');
      }

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