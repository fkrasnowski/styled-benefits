import { useState, forwardRef } from 'react'
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

export const SelectorProvider = forwardRef(
  ({ props, Element, delays, keyframesProps }, ref) => {
    const mouseHover = useSelector()
    const tap = useSelector()
    const mouseHold = useSelector()
    const afterMouseHover = useAfterSelector(delays.afterMouseHover)
    const afterTap = useAfterSelector(delays.afterTap ?? delays.afterHold)
    const afterClick = useAfterSelector(delays.afterClick)
    const afterMouseHold = useAfterSelector(
      delays.afterMouseHold ?? delays.afterHold
    )

    const mouseHoverTimeout = useTimeout(() => {
      if (Date.now() - mousePreventDate > 200) mouseHover.set(true)
    }, 10)

    const onMouseEnter = e => {
      props.onMouseEnter?.(e) // handler from props

      afterMouseHover.set(false)
      mouseHoverTimeout.start()
    }
    const onMouseLeave = e => {
      props.onMouseLeave?.(e) // handler from props

      if (mouseHover.get()) afterMouseHover.set(true)
      mouseHover.set(false)
      mouseHoverTimeout.clear() // Prevent trigger mouseHover
      mouseHold.set(false)
    }

    const onTouchStart = e => {
      props.onTouchStart?.(e) // handler from props
      // for mouseHover:
      mousePreventDate = Date.now()
      tap.set(true)
      afterTap.set(false)
    }
    const onTouchEnd = e => {
      props.onTouchEnd?.(e) // handler from props
      // for mouseHover:
      mousePreventDate = Date.now()
      tap.set(false)
      afterTap.set(true)
    }
    const onClick = e => {
      props.onClick?.(e) // handler from props
      afterClick.set(true)
    }
    const onMouseDown = e => {
      props.onMouseDown?.(e) // handler from props
      mouseHold.set(true)
      afterMouseHold.set(false)
    }
    const onMouseUp = e => {
      props.onMouseUp?.(e) // handler from props
      mouseHold.set(false)
      afterMouseHold.set(true)
    }

    const setAnimationPlaying = bool =>
      keyframesProps.forEach(prop => props?.[prop]?.animation?.setPlaying(bool))

    const onAnimationStart = e => {
      props.onAnimationStart?.(e) // handler from props
      setAnimationPlaying(true)
    }
    const onAnimationEnd = e => {
      props.onAnimationEnd?.(e) // handler from props
      setAnimationPlaying(false)
    }

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
      mouseHover,
      mouseHold,
      afterTap,
      afterMouseHover,
      afterMouseHold,
      afterClick,
    }

    return <Element {...props} {...bind} ref={ref} />
  }
)

SelectorProvider.displayName = 'SelectorProvider'

export default SelectorProvider
