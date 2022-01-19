import React from 'react'
import { render } from '@testing-library/react'
import PeriodPage from '../pages/period/[time]'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MockCurrenciesRepository } from '../models/currency/repositories/MockCurrenciesRepository'
jest.mock('next/router', () => require('next-router-mock'))

describe('Test Period Page', () => {
  console.log = jest.fn()
  console.error = jest.fn()

  /**
   * Since FE is decoupled from BE we're able to pass a mock repository to the page component
   * that returns mock data coming from a json file for testing purposes
   */
  it('should render without errors', () => {
    const { baseElement } = render(
      <QueryClientProvider client={new QueryClient()}>
        <PeriodPage currenciesRepository={new MockCurrenciesRepository()} />
      </QueryClientProvider>
    )
    expect(baseElement).toBeTruthy()
  })

  it('should throw if repository is null', () => {
    let error
    try {
      render(
        <QueryClientProvider client={new QueryClient()}>
          <PeriodPage currenciesRepository={null} />
        </QueryClientProvider>
      )
      expect(true).toBe(false)
    } catch (e) {
      console.log('TESTING FORCED EXCEPTION')
      error = e
    }
    expect(error).toBeTruthy()
  })
})
