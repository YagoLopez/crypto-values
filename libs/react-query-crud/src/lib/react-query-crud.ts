// todo: separate files and fix imports
// export function reactQueryCrud(): string {
//   return 'react-query-crud'
// }

import { useMutation, useQuery, useQueryClient } from 'react-query'

export interface IRepository<T, TError> {
  readonly name: string
  readonly baseURL: string
  getList(): Promise<T[] | TError>
  getList2(period?: string, currency?: string): Promise<T[] | TError>
  getById(id: Id): Promise<T | TError | null>
  create(model: T): Promise<T | TError | null>
  updateById(model: T): Promise<T | TError | null>
  deleteById(id: Id): Promise<T | TError | null>
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
    // this will hijack the constructor
    construct(target: Singleton<T>, argsList, newTarget) {
      // we should skip the proxy for children of our target class
      if (target.prototype !== newTarget.prototype) {
        return Reflect.construct(target, argsList, newTarget)
      }
      // if our target class does not have an instance, create it
      if (!target[SINGLETON_KEY]) {
        target[SINGLETON_KEY] = Reflect.construct(target, argsList, newTarget)
      }
      // return the instance we created!
      return target[SINGLETON_KEY]
    },
  })

export const useRepository = <T, Error>(repository: IRepository<T, Error>) => {
  const queryClient = useQueryClient()

  const config = {
    staleTime: 0,
    enabled: true,
    //Keep refetching every 5 seconds while we don't stop it
    refetchInterval: 10000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: false,
  }

  const onSuccess = () => queryClient.invalidateQueries(repository.name)

  const useGetList = () =>
    useQuery([repository.name], repository.getList, config)

  const useGetList2 = (period: string = '24h', currency: string = 'USD') =>
    useQuery(
      [repository.name, period, currency],
      () => repository.getList2(period, currency),
      config
    )

  const useGetById = (id: Id) =>
    useQuery([repository.name, id], () => repository.getById(id), config)

  const useCreate = () =>
    useMutation((model: T) => repository.create(model), { onSuccess })

  const useDelete = () =>
    useMutation((id: Id) => repository.deleteById(id), { onSuccess })

  const useUpdate = () =>
    useMutation((model: T) => repository.updateById(model), { onSuccess })

  return {
    useGetList,
    useGetList2,
    useGetById,
    useCreate,
    useDelete,
    useUpdate,
  }
}
