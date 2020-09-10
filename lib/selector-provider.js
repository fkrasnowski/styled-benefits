"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.SelectorProvider = void 0;

var _react = _interopRequireWildcard(require("react"));

var _useTimeout = _interopRequireDefault(require("@rooks/use-timeout"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var mousePreventDate = 0;

var useSelector = function useSelector() {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      is = _useState2[0],
      set = _useState2[1];

  return {
    get: function get() {
      return is;
    },
    set: set
  };
};

var useAfterSelector = function useAfterSelector() {
  var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.2;

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      is = _useState4[0],
      _set = _useState4[1];

  var timeout = (0, _useTimeout["default"])(function () {
    return _set(false);
  }, delay * 1000);
  return {
    get: function get() {
      return is;
    },
    set: function set(v) {
      timeout.clear();

      _set(v);

      if (v) timeout.start();
    },
    delay: delay
  };
};

var SelectorProvider = function SelectorProvider(_ref) {
  var _delays$afterTap, _delays$afterMouseHol;

  var props = _ref.props,
      Element = _ref.Element,
      delays = _ref.delays,
      keyframesProps = _ref.keyframesProps;
  var mouseHover = useSelector();
  var tap = useSelector();
  var mouseHold = useSelector();
  var afterMouseHover = useSelector(delays.afterMouseHover);
  var afterTap = useAfterSelector((_delays$afterTap = delays.afterTap) !== null && _delays$afterTap !== void 0 ? _delays$afterTap : delays.afterHold);
  var afterClick = useAfterSelector(delays.afterClick);
  var afterMouseHold = useAfterSelector((_delays$afterMouseHol = delays.afterMouseHold) !== null && _delays$afterMouseHol !== void 0 ? _delays$afterMouseHol : delays.afterHold);
  var mouseHoverTimeout = (0, _useTimeout["default"])(function () {
    if (Date.now() - mousePreventDate > 200) mouseHover.set(true);
  }, 10);

  var onMouseEnter = function onMouseEnter() {
    afterMouseHover.set(false);
    mouseHoverTimeout.start();
  };

  var onMouseLeave = function onMouseLeave() {
    if (mouseHover.get()) afterMouseHover.set(true);
    mouseHover.set(false);
    mouseHoverTimeout.clear(); // Prevent trigger mouseHover

    mouseHold.set(false);
  };

  var onTouchStart = function onTouchStart() {
    // for mouseHover:
    mousePreventDate = Date.now();
    tap.set(true);
    afterTap.set(false);
  };

  var onTouchEnd = function onTouchEnd() {
    // for mouseHover:
    mousePreventDate = Date.now();
    tap.set(false);
    afterTap.set(true);
  };

  var onClick = function onClick() {
    afterClick.set(true);
  };

  var onMouseDown = function onMouseDown() {
    mouseHold.set(true);
    afterMouseHold.set(false);
  };

  var onMouseUp = function onMouseUp() {
    mouseHold.set(false);
    afterMouseHold.set(true);
  };

  var setAnimationPlaying = function setAnimationPlaying(bool) {
    return keyframesProps.forEach(function (prop) {
      var _props$prop, _props$prop$animation;

      return props === null || props === void 0 ? void 0 : (_props$prop = props[prop]) === null || _props$prop === void 0 ? void 0 : (_props$prop$animation = _props$prop.animation) === null || _props$prop$animation === void 0 ? void 0 : _props$prop$animation.setPlaying(bool);
    });
  };

  var onAnimationStart = function onAnimationStart() {
    return setAnimationPlaying(true);
  };

  var onAnimationEnd = function onAnimationEnd() {
    return setAnimationPlaying(false);
  };

  var bind = {
    onTouchStart: onTouchStart,
    onTouchEnd: onTouchEnd,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    onClick: onClick,
    onMouseDown: onMouseDown,
    onMouseUp: onMouseUp,
    onAnimationStart: onAnimationStart,
    onAnimationEnd: onAnimationEnd,
    // for selectors:
    tap: tap,
    afterTap: afterTap,
    mouseHover: mouseHover,
    afterMouseHover: afterMouseHover,
    afterClick: afterClick,
    mouseHold: mouseHold,
    afterMouseHold: afterMouseHold
  };
  return /*#__PURE__*/_react["default"].createElement(Element, _extends({}, props, bind));
};

exports.SelectorProvider = SelectorProvider;
var _default = SelectorProvider;
exports["default"] = _default;