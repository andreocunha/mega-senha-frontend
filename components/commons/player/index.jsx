import { PlayerWrapper } from './styles/PlayerWrapper';

export function Player({ children }) {
  return (
    <PlayerWrapper>
      {children}
    </PlayerWrapper>
  )
}