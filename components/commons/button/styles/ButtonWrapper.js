import styled, { css } from "styled-components";

export const ButtonWrapper = styled.button`
  background: #0250be;
  font-family: "Inter", sans-serif;
  font-size: 24px;
  line-height: 29.05px;
  padding: 17.5px;
  width: 360px;
  border-radius: 8px;

  transition: box-shadow .2s;

  &:hover {
    box-shadow: 0px 57px 86px rgba(2, 80, 190, 0.12), 0px 23.8132px 35.9287px rgba(2, 80, 190, 0.0862625), 0px 12.7317px 19.2092px rgba(2, 80, 190, 0.0715329), 0px 7.13728px 10.7685px rgba(2, 80, 190, 0.06), 0px 3.79056px 5.71909px rgba(2, 80, 190, 0.0484671), 0px 1.57734px 2.37984px rgba(2, 80, 190, 0.0337375);
  }

  ${({ disabled }) => {
    if (disabled) {
      return css`
        pointer-events: none;
        opacity: 0.5;
      `
    } else {
      return css`
        pointer-events: all;
        opacity: 1;
      `;
    }
  }}
`;
