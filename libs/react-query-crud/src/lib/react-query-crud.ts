// todo: separate files and fix imports
// export function reactQueryCrud(): string {
//   return 'react-query-crud'
// }

import { useQuery, useQueryClient } from 'react-query'

export interface IRepository<T, TError> {
  readonly name: string
  readonly baseURL: string
  getList(period?: string, currency?: string): Promise<T[] | TError>
  getListCustomPeriod(
    periodStart: number,
    periodEnd: number,
    currency: string
  ): Promise<T[] | TError>
}

export type Id = string | number

export const SINGLETON_KEY = Symbol()

export type Singleton<T extends new (...args: unknown[]) => unknown> = T & {
  [SINGLETON_KEY]: T extends new (...args: unknown[]) => infer I ? I : never
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Singleton = <T extends new (...args: unknown[]) => unknown>(
  type: T
) =>
  new Proxy(type, {
    construct(target: Singleton<T>, argsList, newTarget) {
      if (target.prototype !== newTarget.prototype) {
        return Reflect.construct(target, argsList, newTarget)
      }
      if (!target[SINGLETON_KEY]) {
        target[SINGLETON_KEY] = Reflect.construct(target, argsList, newTarget)
      }
      return target[SINGLETON_KEY]
    },
  })

export const useRepository = <T, Error>(
  repository: IRepository<T, Error>,
  refetchInterval: number = 0
) => {
  const queryClient = useQueryClient()

  const config = {
    staleTime: 0,
    refetchInterval,
    refetchIntervalInBackground: true,
    // refetchOnWindowFocus: false,
  }

  const onSuccess = () => queryClient.invalidateQueries(repository.name)

  const useGetList = (
    period: string = '24h',
    currency: string = 'USD'
    // updatestFrom: number = 1629894793
  ) =>
    useQuery(
      [repository.name, period, currency],
      () => repository.getList(period, currency),
      config
    )

  const useGetListCustomPeriod = (
    periodStart: number,
    periodEnd: number,
    currency: string = 'USD'
  ) =>
    useQuery(
      [repository.name, periodStart, periodEnd, currency],
      () => repository.getListCustomPeriod(periodStart, periodEnd, currency),
      config
    )

  return {
    useGetList,
    useGetListCustomPeriod,
  }
}
