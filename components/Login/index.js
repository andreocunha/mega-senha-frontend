import styles from '../../styles/components/Login.module.css';

export function Login({ nickname, setNickname, setIsLoggedIn }){
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
                onClick={() => setIsLoggedIn(true)}
            >Login</button>
        </div>
    )
}