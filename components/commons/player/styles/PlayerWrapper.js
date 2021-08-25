import styled, { css } from "styled-components";

export const PlayerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 23px;
  background: #f4f9ff;
  width: 360px;
  border-radius: 8px;
  font-size: 18px;
  color: #959595;
  margin-bottom: 16px;

  ${({width, height}) => {
  if (width) {
    return css`
      width: ${width};
    `
  }

  if (height) {
    return css`
      height: ${height};
    `;
  }
  }}
`;
