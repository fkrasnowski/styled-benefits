const selectIfTrue = _ => (_ ? '' : '_')
/**
 *
 * @param {string} name
 * @returns {(props: {}) => string} props
 */
export const variant = name => props => selectIfTrue(props.variant === name)

// export const withProp = (propName, propValue) => props =>
//   propValue
//     ? selectIfTrue(props[propName] === propValue)
//     : selectIfTrue(props[propName])

//New version accepts object:
/**@description Applies if component props matches given object, string
 * @example
 *  ${withProps({size: 'xl'})} {
 *    width: 300%;
 *  }
 *  // OR
 *  ${withProps('dark')} {
 *    background: black;
 *  }
 * @param {(string[] | {})} props
 */
export const withProps = (...props) => componentProps =>
  selectIfTrue(
    (() => {
      const propsObj = props[0]
      if (typeof propsObj === 'object') {
        for (const prop in propsObj)
          if (componentProps[prop] !== propsObj[prop]) return false
        return true
      }
      for (const prop of props)
        if (componentProps[prop] === undefined) return false
      return true
    })()
  )
/**
 *
 * @param {string} name
 * @returns {*}
 */
const createSelector = name => props => selectIfTrue(props?.[name]?.get())

/**@param {string} name
 * @returns {(duration: number) => *}
 */
const createAfterSelector = name => delay => {
  const selectorName = 'after' + name
  if (typeof delay === 'number') {
    const selectorFn = props => selectIfTrue(props[selectorName]?.get())
    selectorFn.__selectorName = selectorName
    selectorFn.__delay = delay
    return selectorFn
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
