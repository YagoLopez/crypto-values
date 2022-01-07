import { IRepository } from '@crypto-values/react-query-crud'
import { ICurrency } from './currency/ICurrency'

export interface IPageProps {
  currenciesRepository?: IRepository<ICurrency, unknown>
}
