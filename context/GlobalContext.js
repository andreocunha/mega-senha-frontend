import { createContext, useEffect, useState } from "react";
import socket from "../services/socketio";

export const GlobalContext = createContext({});

export function PlayerContext({ children }) {
  const [nickname, setNickname] = useState("");
  const [player, setPlayer] = useState({
    id: 0,
    nickname: '',
    status: '',
    score: 0,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [word, setWord] = useState("");
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.on("allplayers", (playersSocket) => {
      setPlayers(playersSocket);
    });

    socket.on("word", (word) => {
      setWord(word);
    });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        nickname,
        isLoggedIn,
        setNickname,
        setIsLoggedIn,
        players,
        setWord,
        setPlayers,
        word,
        player,
        setPlayer,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
