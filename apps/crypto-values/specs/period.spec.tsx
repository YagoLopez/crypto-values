import React from 'react'
import { render } from '@testing-library/react'
import Period from '../pages/period/[period]'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MockCurrenciesRepository } from '../models/currency/repositories/MockCurrenciesRepository'

describe('Test Period Page', () => {
  it('should render ok with table dimension equals to 6', () => {
    const { baseElement } = render(
      <QueryClientProvider client={new QueryClient()}>
        <Period
          period={'24h'}
          table_dimension={6}
          currenciesRepository={new MockCurrenciesRepository()}
        />
      </QueryClientProvider>
    )
    expect(baseElement).toBeTruthy()
  })

  it('should render ok with table dimension equals to undefined', () => {
    const { baseElement } = render(
      <QueryClientProvider client={new QueryClient()}>
        <Period
          period={'24h'}
          table_dimension={undefined}
          currenciesRepository={new MockCurrenciesRepository()}
        />
      </QueryClientProvider>
    )
    expect(baseElement).toBeTruthy()
  })

  it('should throw if repository is null', () => {
    try {
      render(
        <QueryClientProvider client={new QueryClient()}>
          <Period
            period={'24h'}
            table_dimension={undefined}
            currenciesRepository={null}
          />
        </QueryClientProvider>
      )
      expect(true).toBe(false)
    } catch (e) {
      expect(e.message).toBe("Cannot read property 'name' of null")
    }
  })
})
