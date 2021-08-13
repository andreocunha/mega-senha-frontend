import { useState } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [nickname, setNickname] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <GlobalContext.Provider value={{
      nickname,
      isLoggedIn,
      setNickname,
      setIsLoggedIn
    }}>
      <Component {...pageProps} />
    </GlobalContext.Provider>
  )
}

export default MyApp
