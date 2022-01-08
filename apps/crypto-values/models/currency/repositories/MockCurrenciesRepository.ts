import axios from 'axios'
import { IRepository, Singleton } from '@crypto-values/react-query-crud'
import { ICurrency } from '../ICurrency'
import { IResponse } from '@crypto-values/react-query-crud'

@Singleton
export class MockCurrenciesRepository
  implements IRepository<ICurrency, unknown>
{
  readonly name = 'crypto-currencies-mock'
  readonly baseURL = '/api/mock-crypto-currencies'
  readonly axiosClient = axios.create({ baseURL: this.baseURL })

  getList = async (): Promise<ICurrency[]> => {
    const { data } = await this.axiosClient.get<IResponse & Error>(null)
    return data.data
  }

  getListCustomPeriod = async (): Promise<ICurrency[]> => {
    const { data } = await this.axiosClient.get<IResponse & Error>(null)
    return data.data
  }
}
