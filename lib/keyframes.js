"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useKeyframes = exports.getKeyframes = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getKeyframes = function getKeyframes(propName) {
  return function (props, isInit) {
    var _props$propName;

    if (isInit) return {
      __keyframesProp: propName
    };
    return props === null || props === void 0 ? void 0 : (_props$propName = props[propName]) === null || _props$propName === void 0 ? void 0 : _props$propName.style;
  };
};

exports.getKeyframes = getKeyframes;

var useKeyframes = function useKeyframes(keyframes) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$duration = _ref.duration,
      duration = _ref$duration === void 0 ? 5 : _ref$duration,
      _ref$delay = _ref.delay,
      delay = _ref$delay === void 0 ? 0 : _ref$delay,
      _ref$easing = _ref.easing,
      easing = _ref$easing === void 0 ? 'linear' : _ref$easing,
      _ref$repeat = _ref.repeat,
      repeat = _ref$repeat === void 0 ? 1 : _ref$repeat,
      _ref$direction = _ref.direction,
      direction = _ref$direction === void 0 ? 'normal' : _ref$direction;

  var animationFromProps = function animationFromProps() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return "".concat(keyframes.name, " ").concat(props.duration || duration, "s ").concat(props.easing || easing, " ").concat(props.delay || delay, "s ").concat(props.repeat || repeat, " ").concat(props.direction || direction);
  };

  var _useState = (0, _react.useState)(animationFromProps()),
      _useState2 = _slicedToArray(_useState, 2),
      animation = _useState2[0],
      setAnimation = _useState2[1];

  var _useState3 = (0, _react.useState)("paused"),
      _useState4 = _slicedToArray(_useState3, 2),
      playState = _useState4[0],
      setPlayState = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isPlaying = _useState6[0],
      setPlaying = _useState6[1];

  var trigger = function trigger() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    setAnimation('');
    setTimeout(function () {
      return setAnimation(animationFromProps(props));
    });
    setPlayState('running');
  };

  console.log(animation);

  var pause = function pause() {
    setPlayState('paused');
  };

  var play = function play() {
    if (isPlaying) setPlayState('running');else trigger();
  };

  var replay = function replay() {
    return trigger();
  };

  var reverse = function reverse() {
    if (isPlaying) setPlayState('running');else trigger({
      direction: 'reverse'
    });
  };

  var loop = function loop() {
    return trigger({
      repeat: 'infinite'
    });
  };

  var loopReverse = function loopReverse() {
    return trigger({
      repeat: 'infinite',
      direction: 'reverse'
    });
  };

  var seek = function seek(percentage) {
    setPlayState('paused');
    setAnimation(animationFromProps({
      repeat: 1,
      duration: 1,
      delay: "-".concat(percentage)
    }));
  };

  return {
    play: play,
    pause: pause,
    replay: replay,
    reverse: reverse,
    loop: loop,
    loopReverse: loopReverse,
    seek: seek,
    animation: {
      setPlaying: setPlaying
    },
    style: {
      keyframes: keyframes,
      animation: animation,
      animationPlayState: playState,
      animationFillMode: 'both'
    }
  };
};

exports.useKeyframes = useKeyframes;