import styled from "styled-components";
import { breakpointsMedia } from "../../utils/breakpointsMedia";

export const MatchPlaying = styled.div`
  width: 70vw;
  margin-top: 50px;

  ${breakpointsMedia({
    md: `
      width: 100vw;
    `,
  })}
`;
