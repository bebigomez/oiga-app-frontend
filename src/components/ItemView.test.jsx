import { render, screen } from '@testing-library/react'
import ItemView from './ItemView'
import { BrowserRouter } from 'react-router-dom'

test('renders item name', () => {
  const item = {
    id: 1,
    name: 'Shirt',
    price: 1999,
    images: ['https://example.com/shirt.jpg'],
  }

  render(
    <BrowserRouter>
      <ItemView item={item} />
    </BrowserRouter>
  )

  const element = screen.getByText('Shirt')

  screen.debug(element)

  expect(element).toBeDefined()
})
