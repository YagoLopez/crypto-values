import { Period } from '../../../../apps/crypto-values/models/Period'

export interface IRepository<T, TError> {
  readonly name: string
  readonly baseURL: string
  getList(period: Period, currency: string): Promise<T[] | TError>
  getListCustomPeriod(
    periodStart: number,
    periodEnd: number,
    currency: string
  ): Promise<T[] | TError>
}
