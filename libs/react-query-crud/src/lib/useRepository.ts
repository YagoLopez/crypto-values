import { IRepository } from './IRepository'
import { useQuery } from 'react-query'
import { Period } from '../../../../apps/crypto-values/models/Period'

export const useRepository = <T, TError>(
  repository: IRepository<T, TError>,
  refetchInterval = 0
) => {
  const config = {
    staleTime: 0,
    refetchInterval,
    refetchIntervalInBackground: true,
  }

  const useGetList = (period: Period = '24h', currency = 'USD') =>
    useQuery(
      [repository.name, period, currency],
      () => repository.getList(period, currency),
      config
    )

  const useGetListCustomPeriod = (
    periodStart: number,
    periodEnd: number,
    currency = 'USD'
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
