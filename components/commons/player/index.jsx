import { Text } from '../text';
import { PlayerWrapper } from './styles/PlayerWrapper';

export function Player({ children, width, height, score }) {
  return (
    <PlayerWrapper width={width} height={height}>
      {children}
      {score ? <Text variant="title">{score}</Text> : <Text></Text>}
    </PlayerWrapper>
  );
}