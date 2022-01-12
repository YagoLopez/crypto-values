import { IRepository, IResponse } from '@crypto-values/react-query-crud'
import { ICurrency } from './currency/ICurrency'

export interface IPageProps {
  currenciesRepository: IRepository<ICurrency, IResponse>
}
