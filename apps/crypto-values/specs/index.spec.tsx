import React from 'react'
import { render } from '@testing-library/react'

import Index from '../pages/index'
import { QueryClient, QueryClientProvider } from 'react-query'

describe('Test Index Page', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <QueryClientProvider client={new QueryClient()}>
        <Index />
      </QueryClientProvider>
    )
    expect(baseElement).toBeTruthy()
  })
})
