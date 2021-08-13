import { createContext, useState } from 'react'

export const GlobalContext = createContext({});

export function PlayerContext({ children }) {
  const [nickname, setNickname] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <GlobalContext.Provider value={{
      nickname,
      isLoggedIn,
      setNickname,
      setIsLoggedIn
    }}>
      {children}
    </GlobalContext.Provider>
  )
}
