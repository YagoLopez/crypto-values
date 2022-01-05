import React from 'react'
import { render } from '@testing-library/react'
import CustomPeriod from '../pages/custom-period/index'
import { QueryClient, QueryClientProvider } from 'react-query'

describe('Test CustomPeriod Page', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <QueryClientProvider client={new QueryClient()}>
        <CustomPeriod table_dimension={undefined} />
      </QueryClientProvider>
    )
    expect(baseElement).toBeTruthy()
  })
})
