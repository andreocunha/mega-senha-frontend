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
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Match() {
  const { players, isLoggedIn, word, nickname, setPlayer, player } = usePlayer();
  const router = useRouter();
  const [input, setInput] = useState('');
  const isGuessing = player?.status === 'guessing';
  const isHinting = player?.status === 'hinting';
  const isSpectating = player?.status === 'spectating';

  useEffect(() => {
    if (!isLoggedIn) {
      return router.push("/login");
    }

    const player = players.find((player) => player.nickname === nickname);

    setPlayer(player);
  }, []);

  const [tips, setTips] = useState([
    "bolo",
    "Testing",
    "bolo",
    "Testing",
    "bolo",
    "Testing",
    "bolo",
    "Testing",
  ]);

  const [kicks, setKicks] = useState([
    "bolo",
    "Testing",
    "bolo",
    "Testing",
    "bolo",
    "Testing",
    "bolo",
    "Testing",
  ]);

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
    const word = input;

    if (isGuessing) {
      setKicks([...kicks, word]);
    } else if (isHinting) {
      setTips([...tips, word]);
    }
  }

  return (
    <MatchWrapper>
      <RankingMatch>
        <Text tag="h1" variant="title" align="start" color="white">
          Ranking
        </Text>
        {players.map((player) => {
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
        <Text tag="p" variant="title" align="center">
          00: 30
        </Text>

        {!isGuessing &&
          <Text tag="p" variant="title" align="center">
          A palavra secreta é: {word}
          </Text>
        }

        <PlayersPlaying>
          <Guess>
            <Text tag="h2" variant="title">
              Dando dicas
            </Text>
            <Player score={getGuessingPlayer()?.score}>
              {getGuessingPlayer().nickname}
            </Player>
          </Guess>

          <Hiting>
            <Text tag="h2" variant="title" align="end">
              Adivinhando
            </Text>
            <Player score={getHintingPlayer()?.score}>
              {getHintingPlayer().nickname}
            </Player>
          </Hiting>
        </PlayersPlaying>

        <TipsAndKicksWrapper>
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

        {!isSpectating &&
          <Chat >
            <InputChat value={input} onChange={(e) => setInput(e.target.value)} />
            <SendButton onClick={handleSendWord}>Enviar</SendButton>
          </Chat>
        }
      </MatchPlaying>
    </MatchWrapper>
  );
}
