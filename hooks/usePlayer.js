import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"

export function usePlayer() {

  const context = useContext(GlobalContext)

  return context
}