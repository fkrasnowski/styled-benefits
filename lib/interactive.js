"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interactive = void 0;

var _react = _interopRequireDefault(require("react"));

var _selectorProvider = _interopRequireDefault(require("./selector-provider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getStylesFromStyledComponent = function getStylesFromStyledComponent(component) {
  var _component$componentS;

  // for Emotion:
  if (component === null || component === void 0 ? void 0 : component.__emotion_styles) return component.__emotion_styles; // for styled-components:

  if (component === null || component === void 0 ? void 0 : (_component$componentS = component.componentStyle) === null || _component$componentS === void 0 ? void 0 : _component$componentS.rules) return component.componentStyle.rules;
  throw Error('Wrong type of element passed as interactive');
};

var interactive = function interactive(styledComponent) {
  var stylesArray = getStylesFromStyledComponent(styledComponent);
  var functions = stylesArray.filter(function (v) {
    return typeof v === 'function';
  });
  console.log(functions);
  var delaysArray = functions.filter(function (fun) {
    var _fun;

    return (_fun = fun({}, true)) === null || _fun === void 0 ? void 0 : _fun.__delay;
  }).map(function (fun) {
    var delayObj = fun({}, true);
    return _defineProperty({}, delayObj.selectorName, delayObj.__delay);
  });
  var delays = delaysArray[0] ? delaysArray.reduce(function (total, v) {
    return _objectSpread(_objectSpread({}, total), v);
  }) : {};
  var keyframesProps = functions.filter(function (fun) {
    return fun({}, true).__keyframesProp;
  }).map(function (fun) {
    return fun({}, true).__keyframesProp;
  });
  return function (props) {
    return /*#__PURE__*/_react["default"].createElement(_selectorProvider["default"], {
      props: props,
      Element: styledComponent,
      delays: delays,
      keyframesProps: keyframesProps
    });
  };
};

exports.interactive = interactive;