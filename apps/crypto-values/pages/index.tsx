// todo: error control level api and component
// todo: add tests

import { CurrenciesMockRepository } from '../models/currency/repositories/CurrenciesMockRepository'
import { useRepository } from '@crypto-values/react-query-crud'

export default function Index() {
  const currenciesRepository = new CurrenciesMockRepository()
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

// todo: remove
// export async function getStaticProps() {
//   console.log(process.env)
//   return {
//     props: {
//       products: [],
//     },
//   }
// }
