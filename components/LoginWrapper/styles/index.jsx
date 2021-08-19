import styled from "styled-components";
import { breakpointsMedia } from "../../../utils/breakpointsMedia";

export const LoginWrapper = styled.div`
  display: flex;
  align-items: center;

  min-height: 100vh;

  ${breakpointsMedia({
    sm: `
      flex-direction: column;
    `,
  })}
`;