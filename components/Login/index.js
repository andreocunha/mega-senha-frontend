import styles from '../../styles/components/Login.module.css';
import socket from '../../services/socketio';

export function Login({ nickname, setNickname, setIsLoggedIn }){

    function handleLogin(){
        if(nickname === ''){
            alert('Escreva um nickname!');
        }
        else{
            socket.emit('newPlayer', nickname);
            setIsLoggedIn(true);
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