import { ButtonWrapper } from "./styles/ButtonWrapper";

export default function Button({ children, disabled }) {
  return <ButtonWrapper disabled={disabled}>{children}</ButtonWrapper>;
}