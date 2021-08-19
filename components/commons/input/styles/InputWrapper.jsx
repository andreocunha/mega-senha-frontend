import styled from "styled-components";

export const InputWrapper = styled.input`
  width: 360px;
  height: 64px;
  border-radius: 8px;
  background: none;
  border: 1px solid #dfdfdf;
  font-size: 18px;
  padding: 0 16px;

  &::placeholder {
    color: rgba(0, 0, 0, 0.3);
  }

  &:focus {
    outline: none;
    border: 1px solid #0250be;
  }
`;