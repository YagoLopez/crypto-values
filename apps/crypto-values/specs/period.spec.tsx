import React from 'react'
import { render } from '@testing-library/react'
import Period from '../pages/period/[period]'
import { QueryClient, QueryClientProvider } from 'react-query'

describe('Test Period Page', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <QueryClientProvider client={new QueryClient()}>
        <Period period={'24h'} table_dimension={6} />
      </QueryClientProvider>
    )
    expect(baseElement).toBeTruthy()
  })
})
