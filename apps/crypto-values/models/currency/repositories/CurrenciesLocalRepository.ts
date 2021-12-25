// todo: review methods
import axios from 'axios'
import { Id, IRepository, Singleton } from '@crypto-values/react-query-crud'
import { ICurrency } from '../ICurrency'

@Singleton
export class CurrenciesLocalRepository
  implements IRepository<ICurrency, unknown>
{
  readonly name = 'currencies'
  readonly baseURL = `http://${process.env.NEXT_PUBLIC_VERCEL_URL}/`
  readonly axiosClient = axios.create({ baseURL: this.baseURL })

  getList = async (): Promise<ICurrency[]> => {
    const { data } = await this.axiosClient.get<ICurrency[]>(`/db.json`)
    return data
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
