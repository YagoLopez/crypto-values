import { ICurrency } from '../../../../apps/crypto-values/models/currency/ICurrency'

export interface IResponse {
  max: Record<string, unknown>
  min: Record<string, unknown>
  data: ICurrency[]
  global: Record<string, unknown>
  protocols: Record<string, unknown>
  categories: Record<string, unknown>
  subtypes: Record<string, unknown>
  timestamp: number
}
