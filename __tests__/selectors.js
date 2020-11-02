import styled from '@emotion/styled'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import {
  withProps,
  variant,
  interactive,
  afterMouseHold,
  afterMouseHover,
  afterTap,
  afterClick,
  whileMouseHold,
  whileTap,
  whileHold,
  whileMouseHover,
} from '../.'
import React from 'react'

describe('regular selectors;', () => {
  const checked = ''
  const unchecked = '_'

  test('variant returns selector string', () => {
    const props = { variant: 'dark' }

    expect(variant).toBeDefined()
    expect(variant('dark')(props)).toBe(checked)
    expect(variant('light')(props)).toBe(unchecked)
  })

  test('withProps checks props', () => {
    const props = { color: 'red', bg: 'pink', type: 'range' }
    expect(withProps).toBeDefined()
    expect(withProps({ color: 'red' })(props)).toBe(checked)
    expect(withProps({ color: 'red', bg: 'blue' })(props)).toBe(unchecked)
    expect(withProps('color', 'bg', 'type')(props)).toBe(checked)
    expect(withProps('color', 'isCool')(props)).toBe(unchecked)
  })

  test('regular selectors check selector props', () => {
    let props = {
      tap: { get: () => true },
      mouseHover: { get: () => false },
      mouseHold: { get: () => true },
    }

    expect(whileTap(props)).toBe(checked)
    expect(whileMouseHover(props)).toBe(unchecked)
    expect(whileMouseHold(props)).toBe(checked)
    // whileHold = whileTap $$ whileMouseHold
    expect(whileHold(props)).toBe(`${checked}, ${checked}`)

    props = {
      tap: { get: () => false },
      mouseHover: { get: () => true },
      mouseHold: { get: () => false },
    }

    expect(whileTap(props)).toBe(unchecked)
    expect(whileMouseHover(props)).toBe(checked)
    expect(whileMouseHold(props)).toBe(unchecked)
    // whileHold = whileTap $$ whileMouseHold
    expect(whileHold(props)).toBe(`${unchecked}, ${unchecked}`)
  })
})

describe('Ineractive component with after selectors;', () => {
  const Styled = styled.div`
    ${afterClick(0.5)};
    ${afterMouseHold(0.5)};
    ${afterMouseHover(0.5)};
    ${afterTap(0.5)};
  `
  const Component = interactive(Styled)

  const styledRerender = component => {
    component.setProps({})
    return component.find(Styled)
  }

  test('mouseHover prop should react to onMouseEnter / onMouseLeave', done => {
    const component = mount(<Component />)
    const styled = component.find(Styled)

    expect(styled.props().mouseHover.get()).toBe(false)

    act(styled.props().onMouseEnter)

    // MouseHover applies after 10ms:
    setTimeout(() => {
      let styled = styledRerender(component)

      expect(styled.props().mouseHover.get()).toBe(true)
      act(styled.props().onMouseLeave)

      styled = styledRerender(component)

      expect(styled.props().mouseHover.get()).toBe(false)
      component.unmount()
      done()
    }, 15)
  })

  test('mouseHover prop shoud NOT react if onTouchStart is registered', done => {
    const component = mount(<Component />)
    const styled = component.find(Styled)

    expect(styled.props().mouseHover.get()).toBe(false)
    act(styled.props().onMouseEnter)
    act(styled.props().onTouchStart)

    setTimeout(() => {
      const styled = styledRerender(component)

      expect(styled.props().mouseHover.get()).toBe(false)
      component.unmount()
      done()
    })
  }, 15)

  test('tap prop should react to onTouchStart / onTouchEnd', () => {
    const component = mount(<Component />)
    let styled = component.find(Styled)

    expect(styled.props().tap.get()).toBe(false)
    act(styled.props().onTouchStart)
    styled = styledRerender(component)
    expect(styled.props().tap.get()).toBe(true)
    act(styled.props().onTouchEnd)
    styled = styledRerender(component)
    expect(styled.props().tap.get()).toBe(false)
    component.unmount()
  })

  test('mouseHold prop should react to onMouseUp / onMouseDown', () => {
    const component = mount(<Component />)
    let styled = component.find(Styled)

    expect(styled.props().mouseHold.get()).toBe(false)
    act(styled.props().onMouseDown)
    styled = styledRerender(component)
    expect(styled.props().mouseHold.get()).toBe(true)
    act(styled.props().onMouseUp)
    styled = styledRerender(component)
    expect(styled.props().mouseHold.get()).toBe(false)
    component.unmount()
  })

  test('afterTap/afterClick/afterMouseHold prop should react to onTouchEnd/onClick/onMouseUp and duration', done => {
    const component = mount(<Component />)
    let styled = component.find(Styled)

    expect(styled.props().afterTap.get()).toBe(false)
    expect(styled.props().afterClick.get()).toBe(false)
    expect(styled.props().afterMouseHold.get()).toBe(false)
    act(() => {
      styled.props().onTouchEnd()
      styled.props().onClick()
      styled.props().onMouseUp()
    })
    styled = styledRerender(component)
    expect(styled.props().afterTap.get()).toBe(true)
    expect(styled.props().afterClick.get()).toBe(true)
    expect(styled.props().afterMouseHold.get()).toBe(true)

    //After 0.5s shoud be false
    setTimeout(() => {
      styled = styledRerender(component)
      expect(styled.props().afterTap.get()).toBe(false)
      expect(styled.props().afterClick.get()).toBe(false)
      expect(styled.props().afterMouseHold.get()).toBe(false)
      component.unmount()
      done()
    }, 550)
  })

  test('afterMouseHover prop should react to onMouseEnter and duration', done => {
    const component = mount(<Component />)
    let styled = component.find(Styled)

    expect(styled.props().afterMouseHover.get()).toBe(false)
    styled.props().onMouseEnter()
    // MouseHover applies after 10ms:
    setTimeout(() => {
      styled = styledRerender(component)
      act(styled.props().onMouseLeave)
      styled = styledRerender(component)
      expect(styled.props().afterMouseHover.get()).toBe(true)

      //After 0.5s shoud be false
      setTimeout(() => {
        styled = styledRerender(component)
        expect(styled.props().afterMouseHover.get()).toBe(false)
        component.unmount()
        done()
      }, 550)
    }, 15)
  })
})
