import { AppProps } from 'next/app'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'
import './styles.css'
import { useRouter } from 'next/router'

export default function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Head>
        <title>Crypto-values, by Yago López</title>
      </Head>
      <main className="app">
        <Component {...pageProps} key={router.asPath} />
      </main>
    </QueryClientProvider>
  )
}
