import React from 'react'
import SelectorProvider from './selector-provider'

const getStylesFromStyledComponent = component => {
  // for Emotion:
  if (component?.__emotion_styles)
    return [component.__emotion_styles, 'emotion']
  // for styled-components:
  if (component?.componentStyle?.rules)
    return [component.componentStyle.rules, 'styled-components']

  throw Error('Wrong type of element passed as styled component')
}

export const getStyle = getStylesFromStyledComponent

/**
 *
 * @param {{}} styledComponent - instance of styled component
 * @example
 *  interactive(styled.h1`...`)
 */
export const interactive = styledComponent => {
  const [stylesArray, origin] = getStylesFromStyledComponent(styledComponent)
  const functions = stylesArray.filter(v => typeof v === 'function')

  const delays = functions
    // after selectors have __delay prop:
    .filter(fn => fn.__delay)
    .reduce((total, fn) => ({ ...total, [fn.__selectorName]: fn.__delay }), {})

  const keyframesProps = functions
    .filter(fn => fn.__keyframesProp)
    .map(fn => fn.__keyframesProp)

  const component = props => (
    <SelectorProvider
      props={props}
      Element={styledComponent}
      delays={delays}
      keyframesProps={keyframesProps}
    />
  )
  component.displayName = styledComponent.displayName || 'Interactive'
  component.toString = styledComponent.toString
  component.withComponent = styledComponent.withComponent
  //static props should be the same as styled-component
  if (origin === 'emotion') {
    component.__emotion_styles = styledComponent.__emotion_styles
    component.__emotion_real = styledComponent.__emotion_real
    component.__emotion_base = styledComponent.__emotion_base
    component.__emotion_forwardProp = styledComponent.__emotion_forwardProp
  }
  if (origin === 'styled-components') {
    component.attrs = styledComponent.attrs
    component.componentStyle = styledComponent.componentStyle
    component.shouldForwardProp = styledComponent.shouldForwardProp
    component.foldedComponentsIds = styledComponent.foldedComponentsIds
    component.styledComponentId = styledComponent.styledComponentId
    component.target = styledComponent.target
  }

  return component
}
