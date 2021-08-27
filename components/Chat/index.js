import styled from "styled-components";
import { breakpointsMedia } from "../../utils/breakpointsMedia";

export const Chat = styled.form`
  width: 70vw;
  position: absolute;
  bottom: 0;

  display: flex;
  align-items: center;

  padding: 12px;

  ${breakpointsMedia({
    md: `
      width: 100vw;
      position: static;
      margin-top: 42px;
    `,
  })}
`;
