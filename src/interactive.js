import React from 'react'
import SelectorProvider from './selector-provider'

export const interactive = styledComponent => {
  const stylesArray = getStylesFromStyledComponent(styledComponent)
  const functions = stylesArray.filter(v => typeof v === 'function')
  console.log(functions)

  const delaysArray = functions
    .filter(fun => fun({}, true)?.__delay)
    .map(fun => {
      const delayObj = fun({}, true)
      return { [delayObj.selectorName]: delayObj.__delay }
    })

  const delays = delaysArray[0]
    ? delaysArray.reduce((total, v) => ({ ...total, ...v }))
    : {}

  const keyframesProps = functions
    .filter(fun => fun({}, true).__keyframesProp)
    .map(fun => fun({}, true).__keyframesProp)
  return props => (
    <SelectorProvider
      props={props}
      Element={styledComponent}
      delays={delays}
      keyframesProps={keyframesProps}
    />
  )
}
