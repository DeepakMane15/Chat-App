// import './style.css';
import React, {useEffect, useState,useRef} from 'react';
import Header from '../header/header';
import { db, auth } from '../firebase'
import SendMessage from '../sendMessage/sendMessage';
import './style.css';
import SignOut from '../signout/signout';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useAuth } from '../privateRoutes';
import { useHistory } from 'react-router-dom';



const Home = () => {
    const scroll = useRef()
    // const [user] = useAuthState(auth)
    const [messages, setMessages] = useState([])
const {user} = useAuth();
const history = useHistory();

    useEffect(() => {
        if(!user){
            history.push('/');
        }
        db.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
    }, [user,history])

    return (
        <>
       
        <div>
        <Header /> 
            <SignOut/>
            <div className="msgs">
                {messages.map(({ id, text, photoURL, uid }) => (
                    <div>
                        <div key={id} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                            <img src={photoURL} alt="" />
                            <p>{text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <SendMessage scroll={scroll} />
            <div ref={scroll}></div>
        </div>
        </>
        // {isUser}
    )
}
export default Home;