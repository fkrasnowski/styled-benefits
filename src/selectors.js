const selectIfTrue = _ => (_ ? '&' : '_')

export const variant = name => props => selectIfTrue(props.variant === name)

export const withProp = (propName, propValue) => props =>
  propValue
    ? selectIfTrue(props[propName] === propValue)
    : selectIfTrue(props[propName])

const getStylesFromStyledComponent = component => {
  // for Emotion:
  if (component?.__emotion_styles) return component.__emotion_styles
  // for styled-components:
  if (component?.componentStyle?.rules) return component.componentStyle.rules

  throw Error('Wrong type of element passed as interactive')
}

const createSelector = name => props => selectIfTrue(props?.[name]?.get())

const createAfterSelector = name => delay => {
  const selectorName = 'after' + name
  if (typeof delay === 'number') {
    return (props, isInit) => {
      if (isInit) return { selectorName, __delay: delay }
      // if (isInit) console.log("init");
      return selectIfTrue(props[selectorName]?.get())
    }
  }
  const props = delay
  return selectIfTrue(props?.[selectorName]?.get())
}

export const whileTap = createSelector('tap')
export const whileMouseHover = createSelector('mouseHover')
export const whileMouseHold = createSelector('mouseHold')
export const afterTap = createAfterSelector('Tap')
export const afterClick = createAfterSelector('Click')
export const afterMouseHover = createAfterSelector('MouseHover')
// export const afterWheel = createAfterSelector("Wheel");
export const afterMouseHold = createAfterSelector('MouseHold')

export const whileHold = props => `${whileTap(props)}, ${whileMouseHold(props)}`

export const afterHold = delay => {
  if (typeof delay === 'number') {
    return (props, isInit) => {
      if (isInit) return { selectorName: 'afterHold', __delay: delay }
      return `${afterTap(props)}, ${afterMouseHold(props)}`
    }
  }
  const props = delay
  return `${afterTap(props)}, ${afterMouseHold(props)}`
}
