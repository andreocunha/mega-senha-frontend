import { InputWrapper } from "./styles/InputWrapper";

export function Input({ children, placeholder, value, onChange }) {
  return (
    <InputWrapper
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    >
      {children}
    </InputWrapper>
  );
}
