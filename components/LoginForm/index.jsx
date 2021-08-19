import Button from "../commons/button";
import { Input } from "../commons/input";
import { Text } from "../commons/text";
import { LoginField } from "./styles/LoginField";
import { LoginFormWrapper } from "./styles/LoginFormWrapper";
import Image from 'next/image';
import Logo from '../../public/logo.svg';

export function LoginForm({ handleLogin, nickname, setNickname }) {
  return (
    <LoginFormWrapper>
      <Image src={Logo} alt="Scuba Senha" />
      <LoginField>
        <Text variant="title" tag="h2">
          Escolha um nickname
        </Text>
        <Input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="geremias_novinha_killer"
        />
        <Button onClick={handleLogin}>Entrar</Button>
      </LoginField>
    </LoginFormWrapper>
  );
}
