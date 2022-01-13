import axios from 'axios'
import { ICurrency } from '../ICurrency'
import { getTimestampFromDate } from '../../../utils/dates'
import {
  IRepository,
  IResponse,
  Singleton,
} from '@crypto-values/react-query-crud'
import { Period } from '../../Period'

@Singleton
export class CurrenciesRepository implements IRepository<ICurrency, IResponse> {
  readonly name = 'crypto-currencies'
  readonly baseURL = '/api/crypto-currencies'
  readonly axiosClient = axios.create({ baseURL: this.baseURL })

  private getData = async (queryString: string) => {
    const { data } = await this.axiosClient.get<IResponse & Error>(queryString)
    return data.data
  }

  getList = async (period: Period, currency: string): Promise<ICurrency[]> => {
    const currentDate = new Date()
    const updatesFrom = getTimestampFromDate(currentDate.toDateString())
    const queryString = `?currency=${currency}&updates_from=${updatesFrom}&period=${period}&no_charts=true`
    return this.getData(queryString)
  }

  getListCustomPeriod = async (
    start: number,
    end: number,
    currency: string
  ): Promise<ICurrency[]> => {
    const queryString = `/?currency=${currency}&period=custom&start=${start}&end=${end}&no_charts=true`
    return this.getData(queryString)
  }
}
