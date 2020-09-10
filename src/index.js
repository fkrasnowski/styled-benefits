import { getKeyframes, useKeyframes } from './keyframes'
import * as selectors from './selectors'
import { interactive } from './interactive'

export default {
  getKeyframes,
  useKeyframes,
  ...selectors,
  interactive,
}
