import { interactive } from '../.'
import styled from '@emotion/styled'
import { shallow, mount } from 'enzyme'
import React from 'react'

test('Interactive is defined', () => {
  expect(interactive).toBeDefined()
})

describe('Interactive Component;', () => {
  const Component = interactive(styled.div``)

  test('Interactive component should render correctly', () => {
    const component = shallow(<Component />)
    expect(component).toMatchSnapshot()
  })

  test('onClick handler should be called', () => {
    const clickFn = jest.fn()
    const component = mount(<Component onClick={clickFn} />)
    component.props().onClick()

    expect(clickFn).toHaveBeenCalledTimes(1)
    component.unmount()
  })

  test.todo('ref should reference to the DOM element')
})

test('Should access chained props', () => {
  expect(
    interactive(styled.div`
      ${props => {
        props.it[0].style().get()
        return ''
      }}
    `)
  ).not.toThrow()
})
