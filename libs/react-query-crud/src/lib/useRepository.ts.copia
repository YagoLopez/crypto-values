import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Id, IRepository } from './react-query-crud'

const useRepository = <T, Error>(repository: IRepository<T, Error>) => {
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

export default useRepository
