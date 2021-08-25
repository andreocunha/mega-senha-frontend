import styled from "styled-components";
import { breakpointsMedia } from "../../utils/breakpointsMedia";

export const MatchWrapper = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;

  ${breakpointsMedia({
    md: `
      flex-direction: column;
    `,
  })}
`;