import { useContext } from 'react';
import { useRouter } from 'next/router'
import { GlobalContext } from '../context/GlobalContext'
import styles from '../styles/Login.module.css';
import socket from '../services/socketio';

export default function Login(){
  const router = useRouter();
  const { nickname, setNickname, setIsLoggedIn } = useContext(GlobalContext);

    function handleLogin(){
        if(nickname === ''){
            alert('Escreva um nickname!');
        }
        else{
            socket.emit('newPlayer', nickname);
            setIsLoggedIn(true);

            router.push('/');
        }
    }

    return(
        <div className={styles.container}>
            <h1>Digite o nickname</h1>

            <input
                type="text"
                className={styles.input}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
            />

            <button
                onClick={() => handleLogin()}
            >Login</button>
        </div>
    )
}