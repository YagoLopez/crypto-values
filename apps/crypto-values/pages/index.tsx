// todo: error control level api and component
// todo: add tests

import { CurrenciesLocalRepository } from '../models/currency/repositories/CurrenciesLocalRepository'
import { useRepository } from '@crypto-values/react-query-crud'

export default function Index() {
  const currenciesRepository = new CurrenciesLocalRepository()
  const { useGetList } = useRepository(currenciesRepository)
  const { data: currencies, isLoading } = useGetList()
  return (
    <div>
      {isLoading ? (
        'Loading...'
      ) : (
        <pre>{JSON.stringify(currencies, null, 2)}</pre>
      )}
    </div>
  )
}

// export async function getStaticProps() {
//   console.log(process.env)
//   return {
//     props: {
//       products: [],
//     },
//   }
// }
