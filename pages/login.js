import { useRouter } from "next/router";
import socket from "../services/socketio";
import { usePlayer } from "../hooks/usePlayer";
import { LoginWrapper } from "../components/LoginWrapper/styles";
import { LoginImage } from "../components/LoginImage/styles";
import { LoginForm } from "../components/LoginForm";
import Swal from "sweetalert2";

export default function Login() {
  const router = useRouter();
  const { nickname, setNickname, setIsLoggedIn } = usePlayer();

  function handleLogin(e) {
    e.preventDefault();

    if (!nickname) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Insira um nickname para entrar no lobby :D",
      });
    } else {
      socket.emit("newPlayer", nickname);
      setIsLoggedIn(true);

      router.push("/lobby");
    }
  }

  return (
    <LoginWrapper>
      <LoginImage />
      <LoginForm
        handleLogin={handleLogin}
        nickname={nickname}
        setNickname={setNickname}
      />
    </LoginWrapper>
  );
}
