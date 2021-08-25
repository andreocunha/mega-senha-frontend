import styled from "styled-components";
import { breakpointsMedia } from "../../utils/breakpointsMedia";

export const PlayersPlaying = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  width: 70vw;

  ${breakpointsMedia({
    md: `
      flex-direction: column;
      width: 100vw;
    `,
  })}
`;
