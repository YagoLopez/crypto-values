import axios from 'axios'
import { Id, IRepository, Singleton } from '@crypto-values/react-query-crud'
import { ICurrency } from '../ICurrency'
import { getTimestampFromDate3 } from '../../../utils/dates'

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
  readonly baseURL = '/api/mock-crypto-currencies'
  // readonly baseURL = '/api/crypto-currencies'
  readonly axiosClient = axios.create({ baseURL: this.baseURL })

  getList = async (
    period: 'string',
    currency: string
  ): Promise<ICurrency[]> => {
    const currentDate = new Date()
    const updatesFrom = getTimestampFromDate3(currentDate.toDateString())
    const urlRequest = `?currency=${currency}&updates_from=${updatesFrom}&period=${period}&no_charts=true`
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
}
