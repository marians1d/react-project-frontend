import { createContext, useContext} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({
    children
}) => {
    const [auth, setAuth] = useLocalStorage('auth', {});

    const loginUser = (userData) => {
        setAuth(userData);
    }

    const logoutUser = () => {
        setAuth({});
    }

    return (
        <AuthContext.Provider value={{
            user: auth,
            loginUser,
            logoutUser,
            isAuthenticated: !!auth.accessToken
        }} >
            {children}
        </AuthContext.Provider>
    )
}