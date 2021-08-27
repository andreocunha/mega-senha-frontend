import styled from "styled-components";
import { breakpointsMedia } from "../../utils/breakpointsMedia";

export const RankingMatch = styled.aside`
  width: 30vw;
  height: 100vh;
  background: #0250be;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 30px;

  h1 {
    margin-bottom: 48px;
  }

  ${breakpointsMedia({
    md: `
      width: 100vw;
    `,
  })}
`;
