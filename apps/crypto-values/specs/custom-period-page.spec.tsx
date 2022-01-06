import React from 'react'
import { render } from '@testing-library/react'
import CustomPeriodPage from '../pages/custom-period/index'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MockCurrenciesRepository } from '../models/currency/repositories/MockCurrenciesRepository'

describe('Test CustomPeriod Page', () => {
  console.log = jest.fn()
  console.error = jest.fn()

  it('should render successfully', () => {
    const { baseElement } = render(
      <QueryClientProvider client={new QueryClient()}>
        <CustomPeriodPage
          currenciesRepository={new MockCurrenciesRepository()}
          start_date={1610443814}
          end_date={1624613414}
          table_dimension={undefined}
        />
      </QueryClientProvider>
    )
    expect(baseElement).toBeTruthy()
  })

  it('should throw if repository is null', () => {
    try {
      render(
        <QueryClientProvider client={new QueryClient()}>
          <CustomPeriodPage
            currenciesRepository={null}
            start_date={1610443814}
            end_date={1624613414}
            table_dimension={undefined}
          />
        </QueryClientProvider>
      )
      expect(true).toBe(false)
    } catch (e) {
      console.log('TESTING FORCED EXCEPTION')
      expect(e.message).toBe("Cannot read property 'name' of null")
    }
  })
})
