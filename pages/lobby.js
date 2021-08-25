import { useRouter } from "next/router";
import { useEffect } from "react";
import Button from "../components/commons/button";
import { Player } from "../components/commons/player";
import { Text } from "../components/commons/text";
import { LobbyWrapper } from "../components/LobbyWrapper";
import { usePlayer } from "../hooks/usePlayer";
import socket from "../services/socketio";

export default function Lobby() {
  const router = useRouter();
  const { isLoggedIn, players } = usePlayer();
  const playersExists = players.length !== 0;

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }

    socket.on('word', () => {
      router.push("/match");
    })
  }, [isLoggedIn]);

  function handleStartGame() {

    if (players.length < 2) {
      return alert('É necessário ter no minímo dois jogadores para iniciar uma partida.')
    } 

    socket.emit('startGame');
  }

  return (
    <LobbyWrapper>
      <Text center tag="h1" variant="title">
        Jogadores na sala
      </Text>

      {playersExists ?
        (
          players.map((player) => {
            return <Player key={player.id}>{player.nickname}</Player>;
          })
        ) :
        (
          <Text as="p" align="center" variant="auxText">
            Nenhum player na partida
          </Text>
      )}
      <Button disabled={!playersExists} onClick={() => handleStartGame()}>
        Iniciar partida
      </Button>
    </LobbyWrapper>
  );
}
