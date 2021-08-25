import { ButtonWrapper } from "./styles/ButtonWrapper";

export default function Button({ children, disabled, onClick }) {
  return <ButtonWrapper disabled={disabled} onClick={onClick}>{children}</ButtonWrapper>;
}