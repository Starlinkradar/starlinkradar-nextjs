import '../styles/global.css'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@material-ui/styles'
import theme from '../lib/theme';

export default function App({ Component, pageProps }: AppProps) {
  return <ThemeProvider theme={theme}><Component {...pageProps} /></ThemeProvider>;
}
