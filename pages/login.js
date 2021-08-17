import { useRouter } from 'next/router'
import styles from '../styles/Login.module.css';
import socket from '../services/socketio';
import { usePlayer } from '../hooks/usePlayer';
import Button from '../components/commons/button';

export default function Login(){
  const router = useRouter();
  const { nickname, setNickname, setIsLoggedIn } = usePlayer();

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

            <Button
                onClick={() => handleLogin()}
            >Entrar</Button>
        </div>
    )
}