import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../components/commons/button";
import { Player } from "../components/commons/player";
import { Text } from "../components/commons/text";
import { LobbyWrapper } from "../components/LobbyWrapper";
import { usePlayer } from "../hooks/usePlayer";
import socket from "../services/socketio";

export default function Lobby() {

  const [players, setPlayers] = useState([]);
  const router = useRouter();
  const { isLoggedIn } = usePlayer();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }

    socket.on("allplayers", (players) => {
      setPlayers(players);
    });
  }, [isLoggedIn]);

  return (
    <LobbyWrapper>
      <Text center tag="h1" variant="title">
        Jogadores na sala
      </Text>

      {players.length ? players.map((player) => {
        return <Player key={player.id}>{player.nickname}</Player>;
      }) : <Text as="p" center variant="auxText">Nenhum player na partida</Text>}

      <Button disabled={ players.length === 0 }>Iniciar partida</Button>
    </LobbyWrapper>
  );

  
}