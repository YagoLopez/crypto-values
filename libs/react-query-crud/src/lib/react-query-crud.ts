// todo: separate files and fix imports
// export function reactQueryCrud(): string {
//   return 'react-query-crud'
// }

import { useMutation, useQuery, useQueryClient } from 'react-query'

export interface IRepository<T, Error> {
  readonly name: string
  readonly baseURL: string
  getList(): Promise<T[] | Error | null>
  getById(id: Id): Promise<T | Error | null>
  create(model: T): Promise<T | Error | null>
  updateById(model: T): Promise<T | Error | null>
  deleteById(id: Id): Promise<T | Error | null>
}

export type Id = string | number

export const SINGLETON_KEY = Symbol()

export type Singleton<T extends new (...args: any[]) => any> = T & {
  [SINGLETON_KEY]: T extends new (...args: any[]) => infer I ? I : never
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Singleton = <T extends new (...args: any[]) => any>(type: T) =>
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

  const config = { staleTime: 0 }

  const onSuccess = () => queryClient.invalidateQueries(repository.name)

  const useGetList = () =>
    useQuery([repository.name], repository.getList, config)

  const useGetById = (id: Id) =>
    useQuery([repository.name, id], () => repository.getById(id), config)

  const useCreate = () =>
    useMutation((model: T) => repository.create(model), { onSuccess })

  const useDelete = () =>
    useMutation((id: Id) => repository.deleteById(id), { onSuccess })

  const useUpdate = () =>
    useMutation((model: T) => repository.updateById(model), { onSuccess })

  return { useGetList, useGetById, useCreate, useDelete, useUpdate }
}
