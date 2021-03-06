import styled from "styled-components";
import { breakpointsMedia } from "../../../utils/breakpointsMedia";

export const LoginImage = styled.aside`
  background: url("/login-image.png") no-repeat center/cover;
  width: 50%;
  height: 100vh;

  ${breakpointsMedia({
    sm: `
      display: none;
    `,
  })}
`;