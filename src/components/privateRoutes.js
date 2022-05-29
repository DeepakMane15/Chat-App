import React, {Children, useContext, useEffect, useState} from 'react'
import Cookies from 'universal-cookie';
import { useAuthState } from 'react-firebase-hooks/auth'
import {Redirect, Route} from 'react-router-dom'
import { useHistory } from 'react-router-dom';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {db,auth} from './firebase';

const cookies = new Cookies();

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext); 

export const PrivateRoute = ({children}) => {
const [user,setUser] = useState({});
const [loading,setLoading] = useState(false);
const history = useHistory();

useEffect(() => {
auth.onAuthStateChanged(user => {
setUser(user);
setLoading(false);
if(user)
history.push('/home');
})
},[user,history])

const value = {user};

return (
    <AuthContext.Provider value = {value}>
        {!loading && children}
    </AuthContext.Provider>
)

}
