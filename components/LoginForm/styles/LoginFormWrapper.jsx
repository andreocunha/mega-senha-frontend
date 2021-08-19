import styled from "styled-components";
import { breakpointsMedia } from "../../../utils/breakpointsMedia";


export const LoginFormWrapper = styled.section`
  width: 50%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;

  h2 {
    margin-bottom: 23px;
  }

  button {
    margin-top: 48px;
  }

  ${breakpointsMedia({
    sm: `
      width: 100%;
    `,
  })}
`;