import Head from 'next/head'
import styles from '../styles/Home.module.css'
import socket from '../services/socketio';
import { useEffect, useState } from 'react';
import { Status } from '../../backend/Player';

export default function Home() {
  const [nickname, setNickname] = useState('');
  const [players, setPlayers] = useState([]);
  const [word, setWord] = useState('');
  const [guess, setGuess] = useState('');
  const [hints, setHints] = useState([]);
  const [sendWordHint, setSendWordHint] = useState('');
  const [isHinting, setIsHinting] = useState(false)
  const [isGuessing, setIsGuessing] = useState(false)


  useEffect(() => {
    socket.on('allplayers', data => {
      setPlayers(data);

      console.log(data);

      if(data.length > 0){
        let player = data.find(player => player.id === socket.id)
        player?.status === Status.HINTING ? setIsHinting(true) : setIsHinting(false)
        player?.status === Status.GUESSING ? setIsGuessing(true) : setIsGuessing(false) 
      }
    });

    socket.on('word', data => {
      setWord(data);
    });

    socket.on('allHints', data => {
      setHints(data);
    });

  },[])


  function login(){
    nickname && socket.emit('newPlayer', nickname);
  }

  function startGame(){
    setWord('')
    socket.emit('startGame'); 
  }


  function sendGuess(){
    socket.emit('guess', guess);
  }

  function sendHint(){
    socket.emit('hints', sendWordHint);
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>{word}</h1>

        <h3>Digite o nickname</h3>
        <input 
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />


        {
          isGuessing &&
        <>
          <h3>Digite a palavra secreta</h3>
          <input 
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />

          <button onClick={() => sendGuess()}>Enviar a palavra secreta</button>
          </>
        }


        { isHinting &&
          <>
            <h3>Digite até 3 dicas</h3>
            <input 
              value={sendWordHint}
              onChange={(e) => setSendWordHint(e.target.value)}
            />
    
            <button onClick={() => sendHint()}>Enviar dica</button>
          </>
        }


        <br></br>
        <br></br>
        <button onClick={() => login()}>Login</button>
        <button onClick={() => startGame()}>Start Game</button>


        <div>
          {
            players &&
            players.map((data, index) => {
              return (
                <p 
                  key={index}
                  className={ 
                    data.status === Status.HINTING && styles.givingHints ||
                    data.status === Status.GUESSING && styles.guessing
                  }
                >
                  {data.nickname} - {data.status === Status.HINTING && 'Dando a dica' || data.status === Status.GUESSING && 'Descobrindo a palavra'}
                </p>
              )
            })
          }

        </div>

          <div style={{ overflowY: 'scroll', height: 200, width: 300}}>
            {hints && hints.map((hint, index) => {
              return <p key={index}>{hint}</p>
            })}
          </div>

      </main>
    </div>
  )
}
