import { TextWrapper } from "./styles/TextWrapper";

export function Text({ children, variant, tag, color, align }) {
  return (
    <TextWrapper color={color} align={align} as={tag} variant={variant}>
      {children}
    </TextWrapper>
  )
}