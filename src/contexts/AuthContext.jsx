import { createContext, useContext, useState } from "react";


const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [ isAuthenticated, setIsAuthenticated ] = useState(true)
    const [ isAdmin, setIsAdmin ] = useState(true)

    //user kanske inte används här sa Hasse;
    const [ user, setUser ] = useState(null)

    const signIn = async ({ email, password, isPersistent }) => {

    }

    const signUp = async ({ email }) => {

    }


    return (
        <AuthContext.Provider value={{isAuthenticated, isAdmin, user, signIn, signUp}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    const context = useContext(AuthContext)
    return context
}