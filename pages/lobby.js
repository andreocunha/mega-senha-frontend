import { useRouter } from "next/router";
import { useEffect } from "react";
import Swal from "sweetalert2";
import Button from "../components/commons/button";
import { Player } from "../components/commons/player";
import { Text } from "../components/commons/text";
import { LobbyWrapper } from "../components/LobbyWrapper";
import { usePlayer } from "../hooks/usePlayer";
import socket from "../services/socketio";

export default function Lobby() {
  const router = useRouter();
  const { isLoggedIn, players } = usePlayer();
  const hasPlayers = players.length !== 0;
  const hasMinPlayers = players.length >= 2;

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }

    socket.on("word", () => {
      router.push("/match");
    });

    socket.emit("status");

    socket.on("statusGame", (status) => {
      if (status) {
        router.push("/match");
      }
    });
  }, []);

  function handleStartGame() {
    if (!hasMinPlayers) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "É necessário ter no mínimo dois jogadores para iniciar uma partida! Chame alguns amigos :D",
      });
    }

    socket.emit("startGame");
  }

  return (
    <LobbyWrapper>
      <Text center tag="h1" variant="title">
        Jogadores na sala
      </Text>

      {hasPlayers ? (
        players.map((player) => {
          return <Player key={player.id}>{player.nickname}</Player>;
        })
      ) : (
        <Text as="p" align="center" variant="auxText">
          Nenhum player na partida
        </Text>
      )}

      <Button disabled={!hasPlayers} onClick={() => handleStartGame()}>
        Iniciar partida
      </Button>
    </LobbyWrapper>
  );
}
