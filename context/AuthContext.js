import {createContext, useContext, useEffect, useState} from "react";
import {onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {auth} from '../config/firebase'

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if(user){
                setUser({
                    uid: user.uid,
                    email: user.email,
                    name: user.displayName
                })
            }
            setLoading(false)
        })
    }, [])

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = async () => {
        setUser(null)
        await signOut(auth);
    }

    return (
        <AuthContext.Provider value={{user, signUp, login, logout}}>
            {!loading && children}
        </AuthContext.Provider>
    )
}