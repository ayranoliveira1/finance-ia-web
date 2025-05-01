import { render, screen } from '@testing-library/react'
import { Button } from './button'

describe('Button', () => {
  it('should render', () => {
    render(<Button>Teste do button</Button>)

    screen.getByText('Teste do button')
  })
})
