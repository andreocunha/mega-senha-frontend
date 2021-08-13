import { PlayerContext } from '../context/GlobalContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return (
    <PlayerContext>
      <Component {...pageProps} />
    </PlayerContext>
  )
}

export default MyApp
