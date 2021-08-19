import styled, { css } from "styled-components";

const VariantMap = {
  title: css`
    color: #0250be;
    font-weight: bold;
    font-size: 24px;
  `,
  inputText: css`
    color: #959595;
    font-size: 18px;
  `,
  auxText: css`
    color: rgba(0, 0, 0, 0.3);
    font-size: 18px;
  `,
};

export const TextWrapper = styled.span`
  ${({ variant }) => VariantMap[variant]}
  text-align: ${({ center }) => center ? 'center' : 'start' };
`;
