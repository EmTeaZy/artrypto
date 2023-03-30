import {createContext, useContext, useEffect, useState} from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, deleteUser} from 'firebase/auth'
import {auth, secondaryAuth, database} from '../config/firebase'
import {ref, set, child, get} from "firebase/database";
import crypto from 'crypto';
import {key, iv} from '../config/keys'

const AuthContext = createContext({});

const encrypt = text => {
    console.log({key, iv})
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = '';
    try {
        cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
    } catch (err) {
        console.error('Error decrypting data:', err.message);
    }
    return encrypted;
}

export const useAuth = () => useContext(AuthContext)

const writeUserData = async (user, password) => {
    const {uid: userId, displayName: name, email} = user
    console.log(encrypt(password))
    await set(ref(database, 'users/' + userId), {
        username: name,
        email: email,
        password: encrypt(password),
        role: "admin",
    });
}

const deleteAdminData = async (user) => {
    return set(ref(database,`users/${user.uid}`), null);
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

    const getAllAdmins = async () => {
        const snapshot = await get(child(ref(database), `users/`));
        return snapshot.exists() ? snapshot.val() : false;
    }

    const deleteAdmin = async (email, password) => {
        await signInWithEmailAndPassword(secondaryAuth, email, password);
        const user = secondaryAuth.currentUser;
        await deleteAdminData(user);
        return deleteUser(user);
    }

    const getUserRole = async () => {
        const uid = auth.currentUser.uid;
        const snapshot = await get(child(ref(database), `users/${uid}`));
        return snapshot.exists() ? await snapshot.val().role : false;
    }

    const getSingleUser = async (uid) => {
        const snapshot = await get(child(ref(database), `users/${uid}`));
        return snapshot.exists() ? snapshot.val() : false;
    }

    const signUp = async (email, password, username) => {
        const response = await createUserWithEmailAndPassword(secondaryAuth, email, password)
        await updateProfile(secondaryAuth.currentUser, {displayName: username})
        await writeUserData(response.user, password)
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
        <AuthContext.Provider value={{user, signUp, login, logout, getAllAdmins, deleteAdmin, getSingleUser, getUserRole}}>
            {!loading && children}
        </AuthContext.Provider>
    )
}