import { AppProps } from 'next/app'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useRouter } from 'next/router'
import CssBaseline from '@mui/material/CssBaseline'
import TopAppBar from '../components/TopAppBar/TopAppBar'
import './styles.css'

export default function CryptoValuesApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Head>
        <title>Crypto-values, by Yago López</title>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content="Crypto currencies comparator" />
        <link rel="icon" type="image/svg+xml" href="/favicon.png" />
      </Head>
      <main className="app">
        <CssBaseline />
        <TopAppBar />
        <Component {...pageProps} key={router.asPath} />
      </main>
    </QueryClientProvider>
  )
}
