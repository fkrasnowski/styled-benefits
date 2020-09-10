import React, { useState } from 'react'

export const getKeyframes = propName => (props, isInit) => {
  if (isInit) return { __keyframesProp: propName }
  return props?.[propName]?.style
}

export const useKeyframes = (
  keyframes,
  {
    duration = 5,
    delay = 0,
    easing = 'linear',
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
  console.log(animation)
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
    else trigger({ direction: 'reverse' })
  }

  const loop = () => trigger({ repeat: 'infinite' })

  const loopReverse = () =>
    trigger({ repeat: 'infinite', direction: 'reverse' })
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
    animation: { setPlaying },
    style: {
      keyframes,
      animation,
      animationPlayState: playState,
      animationFillMode: 'both',
    },
  }
}
