import React, { useState } from 'react'
import useTimeout from '@rooks/use-timeout'

let mousePreventDate = 0

const useSelector = () => {
  const [is, set] = useState(false)
  return { get: () => is, set }
}
const useAfterSelector = (delay = 0.2) => {
  const [is, set] = useState(false)
  const timeout = useTimeout(() => set(false), delay * 1000)
  return {
    get: () => is,
    set: v => {
      timeout.clear()
      set(v)
      if (v) timeout.start()
    },
    delay,
  }
}

export const SelectorProvider = ({
  props,
  Element,
  delays,
  keyframesProps,
}) => {
  const mouseHover = useSelector()
  const tap = useSelector()
  const mouseHold = useSelector()
  const afterMouseHover = useSelector(delays.afterMouseHover)
  const afterTap = useAfterSelector(delays.afterTap ?? delays.afterHold)
  const afterClick = useAfterSelector(delays.afterClick)
  const afterMouseHold = useAfterSelector(
    delays.afterMouseHold ?? delays.afterHold
  )

  const mouseHoverTimeout = useTimeout(() => {
    if (Date.now() - mousePreventDate > 200) mouseHover.set(true)
  }, 10)

  const onMouseEnter = () => {
    afterMouseHover.set(false)
    mouseHoverTimeout.start()
  }
  const onMouseLeave = () => {
    if (mouseHover.get()) afterMouseHover.set(true)
    mouseHover.set(false)
    mouseHoverTimeout.clear() // Prevent trigger mouseHover
    mouseHold.set(false)
  }

  const onTouchStart = () => {
    // for mouseHover:
    mousePreventDate = Date.now()
    tap.set(true)
    afterTap.set(false)
  }
  const onTouchEnd = () => {
    // for mouseHover:
    mousePreventDate = Date.now()
    tap.set(false)
    afterTap.set(true)
  }
  const onClick = () => {
    afterClick.set(true)
  }
  const onMouseDown = () => {
    mouseHold.set(true)
    afterMouseHold.set(false)
  }
  const onMouseUp = () => {
    mouseHold.set(false)
    afterMouseHold.set(true)
  }

  const setAnimationPlaying = bool =>
    keyframesProps.forEach(prop => props?.[prop]?.animation?.setPlaying(bool))

  const onAnimationStart = () => setAnimationPlaying(true)
  const onAnimationEnd = () => setAnimationPlaying(false)

  const bind = {
    onTouchStart,
    onTouchEnd,
    onMouseEnter,
    onMouseLeave,
    onClick,
    onMouseDown,
    onMouseUp,
    onAnimationStart,
    onAnimationEnd,
    // for selectors:
    tap,
    afterTap,
    mouseHover,
    afterMouseHover,
    afterClick,
    mouseHold,
    afterMouseHold,
  }

  return <Element {...props} {...bind} />
}

export default SelectorProvider
