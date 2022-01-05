import axios from 'axios'
import { IRepository, Singleton } from '@crypto-values/react-query-crud'
import { ICurrency } from '../ICurrency'
import { getTimestampFromDate } from '../../../utils/dates'
import { IResponse } from '@crypto-values/react-query-crud'

@Singleton
export class CurrenciesRepository implements IRepository<ICurrency, unknown> {
  readonly name = 'crypto-currencies'
  // readonly baseURL = '/api/mock-crypto-currencies'
  readonly baseURL = '/api/crypto-currencies'
  readonly axiosClient = axios.create({ baseURL: this.baseURL })

  getList = async (
    period: 'string',
    currency: string
  ): Promise<ICurrency[]> => {
    const currentDate = new Date()
    const updatesFrom = getTimestampFromDate(currentDate.toDateString())
    const queryString = `?currency=${currency}&updates_from=${updatesFrom}&period=${period}&no_charts=true`
    const { data } = await this.axiosClient.get<IResponse & Error>(queryString)
    return data.data
  }

  getListCustomPeriod = async (
    start: number,
    end: number,
    currency: string
  ): Promise<ICurrency[]> => {
    const queryString = `/?currency=${currency}&period=custom&start=${start}&end=${end}&no_charts=true`
    const { data } = await this.axiosClient.get<IResponse & Error>(queryString)
    return data.data
  }
}
