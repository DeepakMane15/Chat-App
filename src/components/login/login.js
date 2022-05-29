import './style.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { auth } from '../firebase.js'
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, setPersistence, signInWithRedirect, inMemoryPersistence, GoogleAuthProvider } from "firebase/auth";


const Login = () => {

        const cookies = new Cookies();

        const [email, setEmail] = useState();
        const [pwd, setPwd] = useState();


        const [emailError, setEmailError] = useState("");
        const [passwordError, setPasswordError] = useState("");
        const [hasAccount, setHasAccount] = useState(true);
        const history = useHistory();

        const handlelogin = () => {
          clearErrors();
            firebase
                .auth()
                .signInWithEmailAndPassword(email, pwd)
                .then(response => {
                  console.log(response);
                  history.push('/home');

                })
                .catch((err) => {
                    switch (err.code) {
                        case "auth/invalid-email":
                        case "auth/user-disabled":
                        case "auth/user-not-found":
                            setEmailError(err.message);
                            break;
                        case "auth/wrong-password":
                            setPasswordError(err.message);
                            break;
                    }
                });
              }

            const handlesignup = () => {
              clearErrors();
              firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, pwd)
                    .then(response => {
                      console.log(response);
                    })
                    .catch((err) => {
                        switch (err.code) {
                            case "auth/email-already-in-use":
                            case "auth/invalid-email":
                                setEmailError(err.message);
                                break;
                            case "auth/weak-password":
                                setPasswordError(err.message);
                                break;
                        };
                    });
            };

            const clearErrors = () => {
              setEmailError("");
              setPasswordError("");
              
            }

            const signup = async(e) => {

                const data = {
                    email: email,
                    password: pwd
                }

                console.log('data', data);
                await axios.post('http://localhost:5000/signin', data)
                    .then(async function(response) {
                        console.log(response);
                        cookies.set('user', response.data);
                        await history.push("/home");
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }

            async function signInWithGoogle() {
                await setPersistence(auth, inMemoryPersistence)
                    .then(async() => {
                        const provider = new firebase.auth.GoogleAuthProvider()
                        await auth.signInWithPopup(provider);

                        history.push('/home');
                        // return signInWithRedirect(auth, provider);
                    })
            }

            return ( <div classNameName = "App" >
                <section className = "background-radial-gradient " >

                <div className = "container px-4 py-5 px-md-5 text-center text-lg-start my-5" >
                <div className = "row gx-lg-5 align-items-center mb-5" >
                <div className = "col-lg-6 mb-5 mb-lg-0"
                style = {
                    { zIndex: "10" }
                } >
                <h1 className = "my-5 display-5 fw-bold ls-tight"
                style = {
                    { color: "hsl(218, 81%, 95%)" }
                } >
                The best offer <br/>
                <span style = {
                    { color: "hsl(218, 81%, 75%)" }
                } >
                  for your business </span> 
                  </h1> 
                <p className = "mb-4 opacity-70"
                style = {
                    { color: "hsl(218, 81%, 85%)" }
                } >
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.Temporibus, expedita iusto veniam atque, magni tempora mollitia dolorum consequatur nulla, neque debitis eos reprehenderit quasi ab ipsum nisi dolorem modi.Quos ?
                </p> </div> 
                <div className = "col-lg-6 mb-5 mb-lg-0 " >
                <div id = "radius-shape-1"
                className = "position-absolute rounded-circle shadow-5-strong" > </div> 
                <div id = "radius-shape-2"
                className = "position-absolute shadow-5-strong" > </div>

                <div className = "card bg-glass" >
                <div className = "card-body px-4 py-5 px-md-5" >
                <h3> Login </h3>
                 <form style = {
                    { padding: 20 }
                } >
                <div className = "form-outline mb-4" >
                <input type = "email"
                value = { email }
                onChange = {
                    (e) => setEmail(e.target.value)
                }
                className = "form-control"/>
                <label className = "form-label"
                for = "form3Example3" > Email address </label> 
                </div>


                <div className = "form-outline mb-4" >
                <input type = "password"
                value = { pwd }
                onChange = {
                    (e) => setPwd(e.target.value)
                }
                className = "form-control" / >
                <label className = "form-label"
                for = "form3Example4" > Password </label> 
                </div>

                <button type = "button"
                className = "btn btn-primary btn-block mb-4"
                onClick = {(hasAccount)? handlelogin : handlesignup } >
                {(hasAccount) ? 'Login' : 'Sign up'} 
                </button> 
                <p >
                don 't have an account? <a onClick={() => setHasAccount(!hasAccount)}> {(hasAccount) ? 'signup' : 'login'} here!</a> 
                </p> 
                <div style = {
                    { display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }
                }>
                <button type = 'button'
                style = {
                    { padding: '30px', fontSize: '20px', borderRadius: '0', fontWeight: '600' }
                }
                onClick = { signInWithGoogle } > Sign In With Google </button> 
                </div>

                </form> 
                </div > </div> </div > </div> </div >

                </section>

                </div>
            );

        }
        
        export default Login;