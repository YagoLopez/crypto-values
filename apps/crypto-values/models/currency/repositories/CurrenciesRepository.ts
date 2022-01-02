// todo: review methods
import axios from 'axios'
import { Id, IRepository, Singleton } from '@crypto-values/react-query-crud'
import { ICurrency } from '../ICurrency'

interface apiResponse {
  max: Record<string, unknown>
  min: Record<string, unknown>
  data: ICurrency[]
  global: Record<string, unknown>
  protocols: Record<string, unknown>
  categories: Record<string, unknown>
  subtypes: Record<string, unknown>
  timestamp: number
}

@Singleton
export class CurrenciesRepository implements IRepository<ICurrency, unknown> {
  readonly name = 'crypto-currencies'
  readonly baseURL = '/api/crypto-currencies'
  readonly axiosClient = axios.create({ baseURL: this.baseURL })

  getList = async (): Promise<ICurrency[]> => {
    const { data } = await this.axiosClient.get<apiResponse>(
      '?currency=USD&updates_from=1629894793&period=24h&no_charts=true'
    )
    return data.data
  }

  getList2 = async (
    period: 'string',
    currency: string,
    updatesFrom: number
  ): Promise<ICurrency[]> => {
    const urlRequest = `?currency=${currency}&updates_from=${updatesFrom}&period=${period}&no_charts=true`
    console.log('urlRequest', urlRequest)
    const { data } = await this.axiosClient.get<apiResponse & Error>(urlRequest)
    return data.data
  }

  getListCustomPeriod = async (
    start: number,
    end: number,
    currency: string
  ): Promise<ICurrency[]> => {
    const urlRequest = `/?currency=${currency}&period=custom&start=${start}&end=${end}&no_charts=true`
    const { data } = await this.axiosClient.get<apiResponse & Error>(urlRequest)
    return data.data
  }

  getById = async (id: Id): Promise<ICurrency | undefined> => {
    if (!id) return
    const { data } = await this.axiosClient.get<ICurrency>(
      `/${this.name}/${id}`
    )
    return data
  }

  create = async (currency: ICurrency): Promise<ICurrency> => {
    const { data } = await this.axiosClient.post<ICurrency>(
      `/${this.name}/`,
      currency
    )
    return data
  }

  deleteById = async (id: Id): Promise<ICurrency | null> => {
    if (!id) return null
    const { data } = await this.axiosClient.delete<ICurrency>(
      `${this.name}/${id}`
    )
    return data
  }

  updateById = async (currency: ICurrency): Promise<ICurrency> => {
    throw new Error('Not implemented')
    // const { data } = await this.axiosClient.put<ICurrency>(
    //   `${this.name}/${currency.id}`,
    //   currency
    // )
    // return data
  }
}
