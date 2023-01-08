import {createContext, useContext, useEffect, useState} from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth'
import {auth, secondaryAuth, database} from '../config/firebase'
import {ref, set} from "firebase/database";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext)

const writeUserData = async (user) => {
    const {uid: userId, displayName: name, email} = user
    await set(ref(database, 'users/' + userId), {
        username: name,
        email: email,
    });
}

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

    const signUp = async (email, password, username) => {
        const response = await createUserWithEmailAndPassword(secondaryAuth, email, password)
        await updateProfile(secondaryAuth.currentUser, {displayName: username})
        await writeUserData(response.user)
        await signOut(secondaryAuth);
        return response;
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