import { interactive } from '../lib/interactive'
import styled from '@emotion/styled'
const React = require('react')

test('Interactive is instance of Function', () => {
  expect(interactive).toBeDefined()
  expect(interactive(styled.div()) instanceof Function).toBe(true)
})
