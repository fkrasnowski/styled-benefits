import { withProps, variant } from '../.'

test('variant returns selector string', () => {
  const props = { variant: 'dark' }

  expect(variant).toBeDefined()
  expect(variant('dark')(props)).toBe('&')
  expect(variant('light')(props)).toBe('_')
})

test('withProps checks props', () => {
  const props = { color: 'red', bg: 'pink', type: 'range' }
  expect(withProps).toBeDefined()
  expect(withProps({ color: 'red' })(props)).toBe('&')
  expect(withProps({ color: 'red', bg: 'blue' })(props)).toBe('_')
  expect(withProps('color', 'bg', 'type')(props)).toBe('&')
  expect(withProps('color', 'isCool')(props)).toBe('_')
})
