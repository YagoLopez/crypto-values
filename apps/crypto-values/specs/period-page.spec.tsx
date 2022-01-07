import React from 'react'
import { render } from '@testing-library/react'
// todo: review
// import PeriodPage from '../pages/period/[time]'
import Period from '../pages/mock-data/[time]'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MockCurrenciesRepository } from '../models/currency/repositories/MockCurrenciesRepository'
jest.mock('next/router', () => require('next-router-mock'))

describe('Test Period Page', () => {
  console.log = jest.fn()
  console.error = jest.fn()

  it('should render ok with table dimension equals to 6', () => {
    const { baseElement } = render(
      <QueryClientProvider client={new QueryClient()}>
        <Period currenciesRepository={new MockCurrenciesRepository()} />
      </QueryClientProvider>
    )
    expect(baseElement).toBeTruthy()
  })

  it('should throw if repository is null', () => {
    try {
      render(
        <QueryClientProvider client={new QueryClient()}>
          <Period currenciesRepository={null} />
        </QueryClientProvider>
      )
      expect(true).toBe(false)
    } catch (e) {
      console.log('TESTING FORCED EXCEPTION')
      expect(e.message).toBe("Cannot read property 'name' of null")
    }
  })
})
