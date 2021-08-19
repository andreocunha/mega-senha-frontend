import { TextWrapper } from "./styles/TextWrapper";

export function Text({ children, variant, tag, center }) {
  return (
    <TextWrapper center={center} as={tag} variant={variant}>
      {children}
    </TextWrapper>
  )
}