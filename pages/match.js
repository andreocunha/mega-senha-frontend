import { Player } from "../components/commons/player";
import { Text } from "../components/commons/text";
import { MatchWrapper } from "../components/MatchWrapper";
import { Guess } from "../components/Guess";
import { Hiting } from "../components/Hiting";
import { PlayersPlaying } from "../components/PlayersPlaying";
import { MatchPlaying } from "../components/MatchPlaying";
import { RankingMatch } from "../components/RankingMatch";
import { Tip } from "../components/Tip";
import { Kick } from "../components/Kick";
import { TipsAndKicksWrapper } from "../components/TipsAndKicksWrapper";
import { TipsAndKicks } from "../components/TipsAndKicks";
import { Chat } from "../components/Chat";
import { InputChat } from "../components/InputChat";
import { SendButton } from "../components/SendButton";
import { usePlayer } from "../hooks/usePlayer";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import socket from "../services/socketio";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import congratulations from '../animations/congratulations.json';
import timer from '../animations/timer.json';
import { route } from "next/dist/next-server/server/router";

export default function Match() {
  const { players, isLoggedIn, word, nickname, setPlayer, player, setPlayers } =
    usePlayer();
  const [playersByScore, setPlayersByScore] = useState([]);
  const router = useRouter();
  const [input, setInput] = useState("");
  const tipsAndKicks = useRef(null);
  const [tips, setTips] = useState([]);
  const [kicks, setKicks] = useState([]);
  const isGuessing = player?.status === "guessing";
  const isHinting = player?.status === "hinting";
  const isSpectating = player?.status === "spectating";
  const hasMinPlayers = players.length >= 2;
  const [winner, setWinner] = useState('none');

  useEffect(() => {
    if (!isLoggedIn || !hasMinPlayers) {
      return router.push("/login");
    }

    const player = players.find((player) => player.nickname === nickname);

    setPlayer(player);
  }, []);

  useEffect(() => {
    const newPlayerByScore = players.sort((player, playerold) => {
      if (player.score > playerold.score) {
        return -1;
      }
      if (player.score < playerold.score) {
        return 1;
      }
    });
    setPlayersByScore(newPlayerByScore);
  }, [players]);

  useEffect(() => {
    socket.on("correct", (players) => {
      setPlayers(players);
      setWinner('block');
      Swal.fire({
        title: `Obaa! ${getGuessingPlayer()?.nickname} acertou a palavra secreta! Vamos jogar outra partida?`,
        showDenyButton: true,
        confirmButtonText: `Vamos :)`,
      }).then((result) => {
        if (result.isConfirmed) {
          setWinner('none');
          router.push('/lobby')
        }
      });
    });

    socket.on("endRound", () => {
      console.log("O jogo acabou!");

      Swal.fire({
        title: `Acabou o tempo... Vamos mais uma partida?`,
        showDenyButton: true,
        confirmButtonText: `Vamos :)`,
      }).then((result) => {
        if (result.isConfirmed) {
          setWinner('none');
          router.push('/lobby')
        }
        else {
          router.push('/lobby')
        }
      });

      // router.push('/lobby');
    });

    socket.on('word', (word) => {
      router.push('/');
    })
  }, []);

  useEffect(() => {
    socket.on("allHints", (hints) => {
      console.log("Hints", hints);

      setTips(hints);
    });

    socket.on("allGuess", (guess) => {
      console.log("Guess", guess);

      setKicks(guess);
    });
  }, [])

  useEffect(() => {
    if (tipsAndKicks) {
      const tipAndKick = tipsAndKicks.current;
      if (tipAndKick) {
        tipAndKick.scrollTop = tipAndKick.scrollHeight;
      }
    }
  }, [tips]);

  function getGuessingPlayer() {
    const guessingPlayer = players.filter(
      (player) => player.status === "guessing"
    );

    return guessingPlayer[0];
  }

  function getHintingPlayer() {
    const hintingPlayer = players.filter(
      (player) => player.status === "hinting"
    );

    return hintingPlayer[0];
  }

  function handleSendWord() {
    console.log('Enviei a mensagem.')
    const word = input;

    if (!word) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Escreva alguma palavra antes de enviar :D",
      });
    }

    if (isGuessing) {
      console.log('Chutando');
      socket.emit("guess", word);
      return setInput("");
    } else if (isHinting) {
      console.log('Dando dica');
      socket.emit("hints", word);
      return setInput("");
    }
  }

  return (
    <>
      {isLoggedIn && (
        <MatchWrapper>
          <RankingMatch>
            <Text tag="h1" variant="title" align="start" color="white">
              Ranking
            </Text>
            {playersByScore.map((player) => {
              return (
                <>
                  <Player width="100%" key={player.id} score={player.score}>
                    {player.nickname}
                  </Player>
                </>
              );
            })}
          </RankingMatch>
          <MatchPlaying>
            <Lottie animationData={timer}  />

            {!isGuessing && (
              <Text tag="p" variant="title" align="center">
                A palavra secreta é: {word}
              </Text>
            )}

            <PlayersPlaying>
              <Guess>
                <Text tag="h2" variant="title">
                  Dando dicas
                </Text>
                <Player score={getGuessingPlayer()?.score}>
                  {getHintingPlayer()?.nickname}
                </Player>
              </Guess>

              <Hiting>
                <Text tag="h2" variant="title" align="end">
                  Adivinhando
                </Text>
                <Player score={getHintingPlayer()?.score}>
                  {getGuessingPlayer()?.nickname}
                </Player>
              </Hiting>
            </PlayersPlaying>

            <TipsAndKicksWrapper ref={tipsAndKicks}>
              {tips.map((tip, index) => {
                return (
                  <TipsAndKicks key={index}>
                    <Tip>
                      <Text tag="p">Dica {index + 1}: </Text>
                      <Text tag="p">{tip}</Text>
                    </Tip>
                    <Kick>
                      <Text tag="p">Chute {index + 1}: </Text>
                      <Text tag="p">{kicks[index]}</Text>
                    </Kick>
                  </TipsAndKicks>
                );
              })}
            </TipsAndKicksWrapper>

            {!isSpectating && (
              <Chat>
                <InputChat
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <SendButton onClick={handleSendWord}>Enviar</SendButton>
              </Chat>
            )}
          </MatchPlaying>
        </MatchWrapper>
      )}
      <Lottie
        style={{
          position: "absolute",
          top: "0",
          width: "100%",
          height: "100%",
          display: `${winner}`,
        }}
        animationData={congratulations}
      />
    </>
  );
}
