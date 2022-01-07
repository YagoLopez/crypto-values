import React from 'react'
import { render } from '@testing-library/react'
import CustomPeriodPage from '../pages/custom-period/index'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MockCurrenciesRepository } from '../models/currency/repositories/MockCurrenciesRepository'
jest.mock('next/router', () => require('next-router-mock'))

describe('Test CustomPeriod Page', () => {
  console.log = jest.fn()
  console.error = jest.fn()

  /**
   * Since FE is decoupled from BE we're able to pass a mock repository to the page component
   * that returns mock data coming from a json file for testing purposes
   */
  it('should render successfully', () => {
    const { baseElement } = render(
      <QueryClientProvider client={new QueryClient()}>
        <CustomPeriodPage
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
          <CustomPeriodPage currenciesRepository={null} />
        </QueryClientProvider>
      )
      expect(true).toBe(false)
    } catch (e) {
      console.log('TESTING FORCED EXCEPTION')
      expect(e.message).toBe("Cannot read property 'name' of null")
    }
  })
})
