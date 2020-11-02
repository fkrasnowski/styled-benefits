import { useState } from 'react'

/**
 *
 * @param {string} propName - name of component property to attach keyframes animation
 */
export const getKeyframes = propName => {
  const keyframesFn = props => props?.[propName]?.style

  keyframesFn.__keyframesProp = propName
  return keyframesFn
}

const reverseDirection = direction =>
  ({
    normal: 'reverse',
    alternate: 'alternate-reverse',
    reverse: 'normal',
    'alternate-reverse': 'alternate',
  }[direction] || 'reverse')

/**
 *
 * @param {{name: string}} keyframes
 * @param {{duration?: number, delay?: number, easing?: 'ease' | 'linear' | 'ease-out' | 'ease-in' | 'ease-in-out' | string, repeat?: number, direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'}} animationProps
 */
export const useKeyframes = (
  keyframes,
  {
    duration = 5,
    delay = 0,
    easing = 'ease',
    repeat = 1,
    direction = 'normal',
  } = {}
) => {
  const animationFromProps = (props = {}) =>
    `${keyframes.name} ${props.duration || duration}s ${
      props.easing || easing
    } ${props.delay || delay}s ${props.repeat || repeat} ${
      props.direction || direction
    }`
  const [animation, setAnimation] = useState(animationFromProps())
  const [playState, setPlayState] = useState(`paused`)
  const [isPlaying, setPlaying] = useState(false)

  const trigger = (props = {}) => {
    setAnimation('')
    setTimeout(() => setAnimation(animationFromProps(props)))
    setPlayState('running')
  }
  const pause = () => {
    setPlayState('paused')
  }
  const play = () => {
    if (isPlaying) setPlayState('running')
    else trigger()
  }
  const replay = () => trigger()

  const reverse = () => {
    if (isPlaying) setPlayState('running')
    else trigger({ direction: reverseDirection(direction) })
  }

  const loop = () => trigger({ repeat: 'infinite' })

  const loopReverse = () =>
    trigger({ repeat: 'infinite', direction: reverseDirection(direction) })

  const seek = percentage => {
    setPlayState('paused')
    setAnimation(
      animationFromProps({ repeat: 1, duration: 1, delay: `-${percentage}` })
    )
  }
  return {
    play,
    pause,
    replay,
    reverse,
    loop,
    loopReverse,
    seek,
    trigger,
    animation: { setPlaying },
    style: {
      keyframes,
      animation,
      animationPlayState: playState,
      animationFillMode: 'both',
    },
  }
}
