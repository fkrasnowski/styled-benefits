"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.afterHold = exports.whileHold = exports.afterMouseHold = exports.afterMouseHover = exports.afterClick = exports.afterTap = exports.whileMouseHold = exports.whileMouseHover = exports.whileTap = exports.withProps = exports.variant = void 0;

var _react = require("react");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var selectIfTrue = function selectIfTrue(_) {
  return _ ? '&' : '_';
};

var variant = function variant(name) {
  return function (props) {
    return selectIfTrue(props.variant === name);
  };
}; // export const withProp = (propName, propValue) => props =>
//   propValue
//     ? selectIfTrue(props[propName] === propValue)
//     : selectIfTrue(props[propName])
//New version accepts object:


exports.variant = variant;

var withProps = function withProps() {
  for (var _len = arguments.length, props = new Array(_len), _key = 0; _key < _len; _key++) {
    props[_key] = arguments[_key];
  }

  return function (componentProps) {
    return selectIfTrue(function () {
      var propsObj = props[0];

      if (_typeof(propsObj) === 'object') {
        for (var prop in propsObj) {
          if (componentProps[prop] !== propsObj[prop]) return false;
        }

        return true;
      }

      var _iterator = _createForOfIteratorHelper(props),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _prop = _step.value;
          if (componentProps[_prop] === undefined) return false;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return true;
    }());
  };
};

exports.withProps = withProps;

var createSelector = function createSelector(name) {
  return function (props) {
    var _props$name;

    return selectIfTrue(props === null || props === void 0 ? void 0 : (_props$name = props[name]) === null || _props$name === void 0 ? void 0 : _props$name.get());
  };
};

var createAfterSelector = function createAfterSelector(name) {
  return function (delay) {
    var _props$selectorName2;

    var selectorName = 'after' + name;

    if (typeof delay === 'number') {
      return function (props, isInit) {
        var _props$selectorName;

        if (isInit) return {
          selectorName: selectorName,
          __delay: delay
        }; // if (isInit) console.log("init");

        return selectIfTrue((_props$selectorName = props[selectorName]) === null || _props$selectorName === void 0 ? void 0 : _props$selectorName.get());
      };
    }

    var props = delay;
    return selectIfTrue(props === null || props === void 0 ? void 0 : (_props$selectorName2 = props[selectorName]) === null || _props$selectorName2 === void 0 ? void 0 : _props$selectorName2.get());
  };
};

var whileTap = createSelector('tap');
exports.whileTap = whileTap;
var whileMouseHover = createSelector('mouseHover');
exports.whileMouseHover = whileMouseHover;
var whileMouseHold = createSelector('mouseHold');
exports.whileMouseHold = whileMouseHold;
var afterTap = createAfterSelector('Tap');
exports.afterTap = afterTap;
var afterClick = createAfterSelector('Click');
exports.afterClick = afterClick;
var afterMouseHover = createAfterSelector('MouseHover'); // export const afterWheel = createAfterSelector("Wheel");

exports.afterMouseHover = afterMouseHover;
var afterMouseHold = createAfterSelector('MouseHold');
exports.afterMouseHold = afterMouseHold;

var whileHold = function whileHold(props) {
  return "".concat(whileTap(props), ", ").concat(whileMouseHold(props));
};

exports.whileHold = whileHold;

var afterHold = function afterHold(delay) {
  if (typeof delay === 'number') {
    return function (props, isInit) {
      if (isInit) return {
        selectorName: 'afterHold',
        __delay: delay
      };
      return "".concat(afterTap(props), ", ").concat(afterMouseHold(props));
    };
  }

  var props = delay;
  return "".concat(afterTap(props), ", ").concat(afterMouseHold(props));
};

exports.afterHold = afterHold;