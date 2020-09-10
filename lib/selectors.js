"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.afterHold = exports.whileHold = exports.afterMouseHold = exports.afterMouseHover = exports.afterClick = exports.afterTap = exports.whileMouseHold = exports.whileMouseHover = exports.whileTap = exports.withProp = exports.variant = void 0;

var selectIfTrue = function selectIfTrue(_) {
  return _ ? '&' : '_';
};

var variant = function variant(name) {
  return function (props) {
    return selectIfTrue(props.variant === name);
  };
};

exports.variant = variant;

var withProp = function withProp(propName, propValue) {
  return function (props) {
    return propValue ? selectIfTrue(props[propName] === propValue) : selectIfTrue(props[propName]);
  };
};

exports.withProp = withProp;

var getStylesFromStyledComponent = function getStylesFromStyledComponent(component) {
  var _component$componentS;

  // for Emotion:
  if (component === null || component === void 0 ? void 0 : component.__emotion_styles) return component.__emotion_styles; // for styled-components:

  if (component === null || component === void 0 ? void 0 : (_component$componentS = component.componentStyle) === null || _component$componentS === void 0 ? void 0 : _component$componentS.rules) return component.componentStyle.rules;
  throw Error('Wrong type of element passed as interactive');
};

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