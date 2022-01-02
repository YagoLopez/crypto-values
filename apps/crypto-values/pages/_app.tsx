import { AppProps } from 'next/app'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'
import './styles.css'
import { useRouter } from 'next/router'

export default function CryptoValuesApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Head>
        <title>Crypto-values, by Yago López</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <main className="app">
        <Component {...pageProps} key={router.asPath} />
      </main>
    </QueryClientProvider>
  )
}
