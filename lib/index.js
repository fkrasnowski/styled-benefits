import f, { useState, useRef, useEffect, forwardRef } from 'react';

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

/**
 *
 * @param {string} propName - name of component property to attach keyframes animation
 */

var getKeyframes = function getKeyframes(propName) {
  var keyframesFn = function keyframesFn(props) {
    var _props$propName;

    return props === null || props === void 0 ? void 0 : (_props$propName = props[propName]) === null || _props$propName === void 0 ? void 0 : _props$propName.style;
  };

  keyframesFn.__keyframesProp = propName;
  return keyframesFn;
};

var reverseDirection = function reverseDirection(direction) {
  return {
    normal: 'reverse',
    alternate: 'alternate-reverse',
    reverse: 'normal',
    'alternate-reverse': 'alternate'
  }[direction] || 'reverse';
};
/**
 *
 * @param {{name: string}} keyframes
 * @param {{duration?: number, delay?: number, easing?: 'ease' | 'linear' | 'ease-out' | 'ease-in' | 'ease-in-out' | string, repeat?: number, direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'}} animationProps
 */


var useKeyframes = function useKeyframes(keyframes) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$duration = _ref.duration,
      duration = _ref$duration === void 0 ? 5 : _ref$duration,
      _ref$delay = _ref.delay,
      delay = _ref$delay === void 0 ? 0 : _ref$delay,
      _ref$easing = _ref.easing,
      easing = _ref$easing === void 0 ? 'ease' : _ref$easing,
      _ref$repeat = _ref.repeat,
      repeat = _ref$repeat === void 0 ? 1 : _ref$repeat,
      _ref$direction = _ref.direction,
      direction = _ref$direction === void 0 ? 'normal' : _ref$direction;

  var animationFromProps = function animationFromProps() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return "".concat(keyframes.name, " ").concat(props.duration || duration, "s ").concat(props.easing || easing, " ").concat(props.delay || delay, "s ").concat(props.repeat || repeat, " ").concat(props.direction || direction);
  };

  var _useState = useState(animationFromProps()),
      _useState2 = _slicedToArray(_useState, 2),
      animation = _useState2[0],
      setAnimation = _useState2[1];

  var _useState3 = useState("paused"),
      _useState4 = _slicedToArray(_useState3, 2),
      playState = _useState4[0],
      setPlayState = _useState4[1];

  var _useState5 = useState(false),
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
      direction: reverseDirection(direction)
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
      direction: reverseDirection(direction)
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
    trigger: trigger,
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

var selectIfTrue = function selectIfTrue(_) {
  return _ ? '' : '_';
};
/**
 *
 * @param {string} name
 * @returns {(props: {}) => string} props
 */


var variant = function variant(name) {
  return function (props) {
    return selectIfTrue(props.variant === name);
  };
}; // export const withProp = (propName, propValue) => props =>
//   propValue
//     ? selectIfTrue(props[propName] === propValue)
//     : selectIfTrue(props[propName])
//New version accepts object:

/**@description Applies if component props matches given object, string
 * @example
 *  ${withProps({size: 'xl'})} {
 *    width: 300%;
 *  }
 *  // OR
 *  ${withProps('dark')} {
 *    background: black;
 *  }
 * @param {(string[] | {})} props
 */

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
/**
 *
 * @param {string} name
 * @returns {*}
 */

var createSelector = function createSelector(name) {
  return function (props) {
    var _props$name;

    return selectIfTrue(props === null || props === void 0 ? void 0 : (_props$name = props[name]) === null || _props$name === void 0 ? void 0 : _props$name.get());
  };
};
/**@param {string} name
 * @returns {(duration: number) => *}
 */


var createAfterSelector = function createAfterSelector(name) {
  return function (delay) {
    var _props$selectorName2;

    var selectorName = 'after' + name;

    if (typeof delay === 'number') {
      var selectorFn = function selectorFn(props) {
        var _props$selectorName;

        return selectIfTrue((_props$selectorName = props[selectorName]) === null || _props$selectorName === void 0 ? void 0 : _props$selectorName.get());
      };

      selectorFn.__selectorName = selectorName;
      selectorFn.__delay = delay;
      return selectorFn;
    }

    var props = delay;
    return selectIfTrue(props === null || props === void 0 ? void 0 : (_props$selectorName2 = props[selectorName]) === null || _props$selectorName2 === void 0 ? void 0 : _props$selectorName2.get());
  };
};

var whileTap = createSelector('tap');
var whileMouseHover = createSelector('mouseHover');
var whileMouseHold = createSelector('mouseHold');
var afterTap = createAfterSelector('Tap');
var afterClick = createAfterSelector('Click');
var afterMouseHover = createAfterSelector('MouseHover'); // export const afterWheel = createAfterSelector("Wheel");

var afterMouseHold = createAfterSelector('MouseHold');
var whileHold = function whileHold(props) {
  return "".concat(whileTap(props), ", ").concat(whileMouseHold(props));
};
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

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var reactJsxRuntime_production_min = createCommonjsModule(function (module, exports) {
var g=60103;exports.Fragment=60107;if("function"===typeof Symbol&&Symbol.for){var h=Symbol.for;g=h("react.element");exports.Fragment=h("react.fragment");}var m=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,n=Object.prototype.hasOwnProperty,p={key:!0,ref:!0,__self:!0,__source:!0};
function q(c,a,k){var b,d={},e=null,l=null;void 0!==k&&(e=""+k);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(l=a.ref);for(b in a)n.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a)void 0===d[b]&&(d[b]=a[b]);return {$$typeof:g,type:c,key:e,ref:l,props:d,_owner:m.current}}exports.jsx=q;exports.jsxs=q;
});

var reactJsxRuntime_development = createCommonjsModule(function (module, exports) {

if (process.env.NODE_ENV !== "production") {
  (function() {

var React = f;

// ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var REACT_ELEMENT_TYPE = 0xeac7;
var REACT_PORTAL_TYPE = 0xeaca;
exports.Fragment = 0xeacb;
var REACT_STRICT_MODE_TYPE = 0xeacc;
var REACT_PROFILER_TYPE = 0xead2;
var REACT_PROVIDER_TYPE = 0xeacd;
var REACT_CONTEXT_TYPE = 0xeace;
var REACT_FORWARD_REF_TYPE = 0xead0;
var REACT_SUSPENSE_TYPE = 0xead1;
var REACT_SUSPENSE_LIST_TYPE = 0xead8;
var REACT_MEMO_TYPE = 0xead3;
var REACT_LAZY_TYPE = 0xead4;
var REACT_BLOCK_TYPE = 0xead9;
var REACT_SERVER_BLOCK_TYPE = 0xeada;
var REACT_FUNDAMENTAL_TYPE = 0xead5;
var REACT_SCOPE_TYPE = 0xead7;
var REACT_OPAQUE_ID_TYPE = 0xeae0;
var REACT_DEBUG_TRACING_MODE_TYPE = 0xeae1;
var REACT_OFFSCREEN_TYPE = 0xeae2;
var REACT_LEGACY_HIDDEN_TYPE = 0xeae3;

if (typeof Symbol === 'function' && Symbol.for) {
  var symbolFor = Symbol.for;
  REACT_ELEMENT_TYPE = symbolFor('react.element');
  REACT_PORTAL_TYPE = symbolFor('react.portal');
  exports.Fragment = symbolFor('react.fragment');
  REACT_STRICT_MODE_TYPE = symbolFor('react.strict_mode');
  REACT_PROFILER_TYPE = symbolFor('react.profiler');
  REACT_PROVIDER_TYPE = symbolFor('react.provider');
  REACT_CONTEXT_TYPE = symbolFor('react.context');
  REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref');
  REACT_SUSPENSE_TYPE = symbolFor('react.suspense');
  REACT_SUSPENSE_LIST_TYPE = symbolFor('react.suspense_list');
  REACT_MEMO_TYPE = symbolFor('react.memo');
  REACT_LAZY_TYPE = symbolFor('react.lazy');
  REACT_BLOCK_TYPE = symbolFor('react.block');
  REACT_SERVER_BLOCK_TYPE = symbolFor('react.server.block');
  REACT_FUNDAMENTAL_TYPE = symbolFor('react.fundamental');
  REACT_SCOPE_TYPE = symbolFor('react.scope');
  REACT_OPAQUE_ID_TYPE = symbolFor('react.opaque.id');
  REACT_DEBUG_TRACING_MODE_TYPE = symbolFor('react.debug_trace_mode');
  REACT_OFFSCREEN_TYPE = symbolFor('react.offscreen');
  REACT_LEGACY_HIDDEN_TYPE = symbolFor('react.legacy_hidden');
}

var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';
function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return null;
  }

  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }

  return null;
}

var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

function error(format) {
  {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    printWarning('error', format, args);
  }
}

function printWarning(level, format, args) {
  // When changing this logic, you might want to also
  // update consoleWithStackDev.www.js as well.
  {
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = '';

    if (currentlyValidatingElement) {
      var name = getComponentName(currentlyValidatingElement.type);
      var owner = currentlyValidatingElement._owner;
      stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner.type));
    }

    stack += ReactDebugCurrentFrame.getStackAddendum();

    if (stack !== '') {
      format += '%s';
      args = args.concat([stack]);
    }

    var argsWithFormat = args.map(function (item) {
      return '' + item;
    }); // Careful: RN currently depends on this prefix

    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
    // breaks IE9: https://github.com/facebook/react/issues/13610
    // eslint-disable-next-line react-internal/no-production-logging

    Function.prototype.apply.call(console[level], console, argsWithFormat);
  }
}

// Filter certain DOM attributes (e.g. src, href) if their values are empty strings.

var enableScopeAPI = false; // Experimental Create Event Handle API.

function isValidElementType(type) {
  if (typeof type === 'string' || typeof type === 'function') {
    return true;
  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


  if (type === exports.Fragment || type === REACT_PROFILER_TYPE || type === REACT_DEBUG_TRACING_MODE_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI ) {
    return true;
  }

  if (typeof type === 'object' && type !== null) {
    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
      return true;
    }
  }

  return false;
}


var BEFORE_SLASH_RE = /^(.*)[\\\/]/;
function describeComponentFrame (name, source, ownerName) {
  var sourceInfo = '';

  if (source) {
    var path = source.fileName;
    var fileName = path.replace(BEFORE_SLASH_RE, '');

    {
      // In DEV, include code for a common special case:
      // prefer "folder/index.js" instead of just "index.js".
      if (/^index\./.test(fileName)) {
        var match = path.match(BEFORE_SLASH_RE);

        if (match) {
          var pathBeforeSlash = match[1];

          if (pathBeforeSlash) {
            var folderName = pathBeforeSlash.replace(BEFORE_SLASH_RE, '');
            fileName = folderName + '/' + fileName;
          }
        }
      }
    }

    sourceInfo = ' (at ' + fileName + ':' + source.lineNumber + ')';
  } else if (ownerName) {
    sourceInfo = ' (created by ' + ownerName + ')';
  }

  return '\n    in ' + (name || 'Unknown') + sourceInfo;
}

var Resolved = 1;
function refineResolvedLazyComponent(lazyComponent) {
  return lazyComponent._status === Resolved ? lazyComponent._result : null;
}

function getWrappedName(outerType, innerType, wrapperName) {
  var functionName = innerType.displayName || innerType.name || '';
  return outerType.displayName || (functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName);
}

function getComponentName(type) {
  if (type == null) {
    // Host root, text node or just invalid type.
    return null;
  }

  {
    if (typeof type.tag === 'number') {
      error('Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
    }
  }

  if (typeof type === 'function') {
    return type.displayName || type.name || null;
  }

  if (typeof type === 'string') {
    return type;
  }

  switch (type) {
    case exports.Fragment:
      return 'Fragment';

    case REACT_PORTAL_TYPE:
      return 'Portal';

    case REACT_PROFILER_TYPE:
      return "Profiler";

    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode';

    case REACT_SUSPENSE_TYPE:
      return 'Suspense';

    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList';
  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        return 'Context.Consumer';

      case REACT_PROVIDER_TYPE:
        return 'Context.Provider';

      case REACT_FORWARD_REF_TYPE:
        return getWrappedName(type, type.render, 'ForwardRef');

      case REACT_MEMO_TYPE:
        return getComponentName(type.type);

      case REACT_BLOCK_TYPE:
        return getComponentName(type.render);

      case REACT_LAZY_TYPE:
        {
          var thenable = type;
          var resolvedThenable = refineResolvedLazyComponent(thenable);

          if (resolvedThenable) {
            return getComponentName(resolvedThenable);
          }

          break;
        }
    }
  }

  return null;
}

var loggedTypeFailures = {};
var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
var currentlyValidatingElement = null;

function setCurrentlyValidatingElement(element) {
  {
    currentlyValidatingElement = element;
  }
}

function checkPropTypes(typeSpecs, values, location, componentName, element) {
  {
    // $FlowFixMe This is okay but Flow doesn't know it.
    var has = Function.call.bind(Object.prototype.hasOwnProperty);

    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.

        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
            err.name = 'Invariant Violation';
            throw err;
          }

          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
        } catch (ex) {
          error$1 = ex;
        }

        if (error$1 && !(error$1 instanceof Error)) {
          setCurrentlyValidatingElement(element);

          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

          setCurrentlyValidatingElement(null);
        }

        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error$1.message] = true;
          setCurrentlyValidatingElement(element);

          error('Failed %s type: %s', location, error$1.message);

          setCurrentlyValidatingElement(null);
        }
      }
    }
  }
}

var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};
var specialPropKeyWarningShown;
var specialPropRefWarningShown;
var didWarnAboutStringRefs;

{
  didWarnAboutStringRefs = {};
}

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.key !== undefined;
}

function warnIfStringRefCannotBeAutoConverted(config, self) {
  {
    if (typeof config.ref === 'string' && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
      var componentName = getComponentName(ReactCurrentOwner.current.type);

      if (!didWarnAboutStringRefs[componentName]) {
        error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', getComponentName(ReactCurrentOwner.current.type), config.ref);

        didWarnAboutStringRefs[componentName] = true;
      }
    }
  }
}

function defineKeyPropWarningGetter(props, displayName) {
  {
    var warnAboutAccessingKey = function () {
      if (!specialPropKeyWarningShown) {
        specialPropKeyWarningShown = true;

        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    };

    warnAboutAccessingKey.isReactWarning = true;
    Object.defineProperty(props, 'key', {
      get: warnAboutAccessingKey,
      configurable: true
    });
  }
}

function defineRefPropWarningGetter(props, displayName) {
  {
    var warnAboutAccessingRef = function () {
      if (!specialPropRefWarningShown) {
        specialPropRefWarningShown = true;

        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    };

    warnAboutAccessingRef.isReactWarning = true;
    Object.defineProperty(props, 'ref', {
      get: warnAboutAccessingRef,
      configurable: true
    });
  }
}
/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, instanceof check
 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} props
 * @param {*} key
 * @param {string|object} ref
 * @param {*} owner
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @internal
 */


var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,
    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,
    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.

    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    }); // self and source are DEV only properties.

    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    }); // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.

    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });

    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};
/**
 * https://github.com/reactjs/rfcs/pull/107
 * @param {*} type
 * @param {object} props
 * @param {string} key
 */

function jsxDEV(type, config, maybeKey, source, self) {
  {
    var propName; // Reserved names are extracted

    var props = {};
    var key = null;
    var ref = null; // Currently, key can be spread in as a prop. This causes a potential
    // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
    // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
    // but as an intermediary step, we will use jsxDEV for everything except
    // <div {...props} key="Hi" />, because we aren't currently able to tell if
    // key is explicitly declared to be undefined or not.

    if (maybeKey !== undefined) {
      key = '' + maybeKey;
    }

    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    if (hasValidRef(config)) {
      ref = config.ref;
      warnIfStringRefCannotBeAutoConverted(config, self);
    } // Remaining properties are added to a new props object


    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    } // Resolve default props


    if (type && type.defaultProps) {
      var defaultProps = type.defaultProps;

      for (propName in defaultProps) {
        if (props[propName] === undefined) {
          props[propName] = defaultProps[propName];
        }
      }
    }

    if (key || ref) {
      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }

      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }

    return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
  }
}

var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

function setCurrentlyValidatingElement$1(element) {
  currentlyValidatingElement = element;
}

var propTypesMisspellWarningShown;

{
  propTypesMisspellWarningShown = false;
}
/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 * @final
 */

function isValidElement(object) {
  {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }
}

function getDeclarationErrorAddendum() {
  {
    if (ReactCurrentOwner$1.current) {
      var name = getComponentName(ReactCurrentOwner$1.current.type);

      if (name) {
        return '\n\nCheck the render method of `' + name + '`.';
      }
    }

    return '';
  }
}

function getSourceInfoErrorAddendum(source) {
  {
    if (source !== undefined) {
      var fileName = source.fileName.replace(/^.*[\\\/]/, '');
      var lineNumber = source.lineNumber;
      return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
    }

    return '';
  }
}
/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */


var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  {
    var info = getDeclarationErrorAddendum();

    if (!info) {
      var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

      if (parentName) {
        info = "\n\nCheck the top-level render call using <" + parentName + ">.";
      }
    }

    return info;
  }
}
/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */


function validateExplicitKey(element, parentType) {
  {
    if (!element._store || element._store.validated || element.key != null) {
      return;
    }

    element._store.validated = true;
    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
      return;
    }

    ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
    // property, it may be the creator of the child that's responsible for
    // assigning it a key.

    var childOwner = '';

    if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
      // Give the component that originally created this child.
      childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";
    }

    setCurrentlyValidatingElement$1(element);

    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);

    setCurrentlyValidatingElement$1(null);
  }
}
/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */


function validateChildKeys(node, parentType) {
  {
    if (typeof node !== 'object') {
      return;
    }

    if (Array.isArray(node)) {
      for (var i = 0; i < node.length; i++) {
        var child = node[i];

        if (isValidElement(child)) {
          validateExplicitKey(child, parentType);
        }
      }
    } else if (isValidElement(node)) {
      // This element was passed in a valid location.
      if (node._store) {
        node._store.validated = true;
      }
    } else if (node) {
      var iteratorFn = getIteratorFn(node);

      if (typeof iteratorFn === 'function') {
        // Entry iterators used to provide implicit keys,
        // but now we print a separate warning for them later.
        if (iteratorFn !== node.entries) {
          var iterator = iteratorFn.call(node);
          var step;

          while (!(step = iterator.next()).done) {
            if (isValidElement(step.value)) {
              validateExplicitKey(step.value, parentType);
            }
          }
        }
      }
    }
  }
}
/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */


function validatePropTypes(element) {
  {
    var type = element.type;

    if (type === null || type === undefined || typeof type === 'string') {
      return;
    }

    var propTypes;

    if (typeof type === 'function') {
      propTypes = type.propTypes;
    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
    // Inner props are checked in the reconciler.
    type.$$typeof === REACT_MEMO_TYPE)) {
      propTypes = type.propTypes;
    } else {
      return;
    }

    if (propTypes) {
      // Intentionally inside to avoid triggering lazy initializers:
      var name = getComponentName(type);
      checkPropTypes(propTypes, element.props, 'prop', name, element);
    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
      propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

      var _name = getComponentName(type);

      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
    }

    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
    }
  }
}
/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */


function validateFragmentProps(fragment) {
  {
    var keys = Object.keys(fragment.props);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (key !== 'children' && key !== 'key') {
        setCurrentlyValidatingElement$1(fragment);

        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

        setCurrentlyValidatingElement$1(null);
        break;
      }
    }

    if (fragment.ref !== null) {
      setCurrentlyValidatingElement$1(fragment);

      error('Invalid attribute `ref` supplied to `React.Fragment`.');

      setCurrentlyValidatingElement$1(null);
    }
  }
}

function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
  {
    var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.

    if (!validType) {
      var info = '';

      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
        info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
      }

      var sourceInfo = getSourceInfoErrorAddendum(source);

      if (sourceInfo) {
        info += sourceInfo;
      } else {
        info += getDeclarationErrorAddendum();
      }

      var typeString;

      if (type === null) {
        typeString = 'null';
      } else if (Array.isArray(type)) {
        typeString = 'array';
      } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
        typeString = "<" + (getComponentName(type.type) || 'Unknown') + " />";
        info = ' Did you accidentally export a JSX literal instead of a component?';
      } else {
        typeString = typeof type;
      }

      error('React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
    }

    var element = jsxDEV(type, props, key, source, self); // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.

    if (element == null) {
      return element;
    } // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)


    if (validType) {
      var children = props.children;

      if (children !== undefined) {
        if (isStaticChildren) {
          if (Array.isArray(children)) {
            for (var i = 0; i < children.length; i++) {
              validateChildKeys(children[i], type);
            }

            if (Object.freeze) {
              Object.freeze(children);
            }
          } else {
            error('React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');
          }
        } else {
          validateChildKeys(children, type);
        }
      }
    }

    if (type === exports.Fragment) {
      validateFragmentProps(element);
    } else {
      validatePropTypes(element);
    }

    return element;
  }
} // These two functions exist to still get child warnings in dev
// even with the prod transform. This means that jsxDEV is purely
// opt-in behavior for better messages but that we won't stop
// giving you warnings if you use production apis.

function jsxWithValidationStatic(type, props, key) {
  {
    return jsxWithValidation(type, props, key, true);
  }
}
function jsxWithValidationDynamic(type, props, key) {
  {
    return jsxWithValidation(type, props, key, false);
  }
}

var jsx =  jsxWithValidationDynamic ; // we may want to special case jsxs internally to take advantage of static children.
// for now we can ship identical prod functions

var jsxs =  jsxWithValidationStatic ;

exports.jsx = jsx;
exports.jsxs = jsxs;
  })();
}
});

var jsxRuntime = createCommonjsModule(function (module) {

if (process.env.NODE_ENV === 'production') {
  module.exports = reactJsxRuntime_production_min;
} else {
  module.exports = reactJsxRuntime_development;
}
});

function useTimeout(cb, timeoutDelayMs = 0) {
    const [isTimeoutActive, setIsTimeoutActive] = useState(false);
    const savedRefCallback = useRef();
    useEffect(() => {
        savedRefCallback.current = cb;
    }, [cb]);
    function callback() {
        savedRefCallback.current && savedRefCallback.current();
        clear();
    }
    function clear() {
        setIsTimeoutActive(false);
    }
    function start() {
        setIsTimeoutActive(true);
    }
    useEffect(() => {
        if (isTimeoutActive) {
            const timeout = window.setTimeout(callback, timeoutDelayMs);
            return () => {
                window.clearTimeout(timeout);
            };
        }
    }, [isTimeoutActive]);
    return {
        clear,
        start,
        stop: clear,
        isActive: isTimeoutActive
    };
}

var mousePreventDate = 0;

var useSelector = function useSelector() {
  var _useState = useState(false),
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

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      is = _useState4[0],
      _set = _useState4[1];

  var timeout = useTimeout(function () {
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

var SelectorProvider = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var _delays$afterTap, _delays$afterMouseHol;

  var props = _ref.props,
      Element = _ref.Element,
      delays = _ref.delays,
      keyframesProps = _ref.keyframesProps;
  var mouseHover = useSelector();
  var tap = useSelector();
  var mouseHold = useSelector();
  var afterMouseHover = useAfterSelector(delays.afterMouseHover);
  var afterTap = useAfterSelector((_delays$afterTap = delays.afterTap) !== null && _delays$afterTap !== void 0 ? _delays$afterTap : delays.afterHold);
  var afterClick = useAfterSelector(delays.afterClick);
  var afterMouseHold = useAfterSelector((_delays$afterMouseHol = delays.afterMouseHold) !== null && _delays$afterMouseHol !== void 0 ? _delays$afterMouseHol : delays.afterHold);
  var mouseHoverTimeout = useTimeout(function () {
    if (Date.now() - mousePreventDate > 200) mouseHover.set(true);
  }, 10);

  var onMouseEnter = function onMouseEnter(e) {
    var _props$onMouseEnter;

    (_props$onMouseEnter = props.onMouseEnter) === null || _props$onMouseEnter === void 0 ? void 0 : _props$onMouseEnter.call(props, e); // handler from props

    afterMouseHover.set(false);
    mouseHoverTimeout.start();
  };

  var onMouseLeave = function onMouseLeave(e) {
    var _props$onMouseLeave;

    (_props$onMouseLeave = props.onMouseLeave) === null || _props$onMouseLeave === void 0 ? void 0 : _props$onMouseLeave.call(props, e); // handler from props

    if (mouseHover.get()) afterMouseHover.set(true);
    mouseHover.set(false);
    mouseHoverTimeout.clear(); // Prevent trigger mouseHover

    mouseHold.set(false);
  };

  var onTouchStart = function onTouchStart(e) {
    var _props$onTouchStart;

    (_props$onTouchStart = props.onTouchStart) === null || _props$onTouchStart === void 0 ? void 0 : _props$onTouchStart.call(props, e); // handler from props
    // for mouseHover:

    mousePreventDate = Date.now();
    tap.set(true);
    afterTap.set(false);
  };

  var onTouchEnd = function onTouchEnd(e) {
    var _props$onTouchEnd;

    (_props$onTouchEnd = props.onTouchEnd) === null || _props$onTouchEnd === void 0 ? void 0 : _props$onTouchEnd.call(props, e); // handler from props
    // for mouseHover:

    mousePreventDate = Date.now();
    tap.set(false);
    afterTap.set(true);
  };

  var onClick = function onClick(e) {
    var _props$onClick;

    (_props$onClick = props.onClick) === null || _props$onClick === void 0 ? void 0 : _props$onClick.call(props, e); // handler from props

    afterClick.set(true);
  };

  var onMouseDown = function onMouseDown(e) {
    var _props$onMouseDown;

    (_props$onMouseDown = props.onMouseDown) === null || _props$onMouseDown === void 0 ? void 0 : _props$onMouseDown.call(props, e); // handler from props

    mouseHold.set(true);
    afterMouseHold.set(false);
  };

  var onMouseUp = function onMouseUp(e) {
    var _props$onMouseUp;

    (_props$onMouseUp = props.onMouseUp) === null || _props$onMouseUp === void 0 ? void 0 : _props$onMouseUp.call(props, e); // handler from props

    mouseHold.set(false);
    afterMouseHold.set(true);
  };

  var setAnimationPlaying = function setAnimationPlaying(bool) {
    return keyframesProps.forEach(function (prop) {
      var _props$prop, _props$prop$animation;

      return props === null || props === void 0 ? void 0 : (_props$prop = props[prop]) === null || _props$prop === void 0 ? void 0 : (_props$prop$animation = _props$prop.animation) === null || _props$prop$animation === void 0 ? void 0 : _props$prop$animation.setPlaying(bool);
    });
  };

  var onAnimationStart = function onAnimationStart(e) {
    var _props$onAnimationSta;

    (_props$onAnimationSta = props.onAnimationStart) === null || _props$onAnimationSta === void 0 ? void 0 : _props$onAnimationSta.call(props, e); // handler from props

    setAnimationPlaying(true);
  };

  var onAnimationEnd = function onAnimationEnd(e) {
    var _props$onAnimationEnd;

    (_props$onAnimationEnd = props.onAnimationEnd) === null || _props$onAnimationEnd === void 0 ? void 0 : _props$onAnimationEnd.call(props, e); // handler from props

    setAnimationPlaying(false);
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
    mouseHover: mouseHover,
    mouseHold: mouseHold,
    afterTap: afterTap,
    afterMouseHover: afterMouseHover,
    afterMouseHold: afterMouseHold,
    afterClick: afterClick
  };
  return /*#__PURE__*/jsxRuntime.jsx(Element, _objectSpread2(_objectSpread2(_objectSpread2({}, props), bind), {}, {
    ref: ref
  }));
});
SelectorProvider.displayName = 'SelectorProvider';

var getStylesFromStyledComponent = function getStylesFromStyledComponent(component) {
  var _component$componentS;

  // for Emotion:
  if (component === null || component === void 0 ? void 0 : component.__emotion_styles) return [component.__emotion_styles, 'emotion']; // for styled-components:

  if (component === null || component === void 0 ? void 0 : (_component$componentS = component.componentStyle) === null || _component$componentS === void 0 ? void 0 : _component$componentS.rules) return [component.componentStyle.rules, 'styled-components'];
  throw Error('Wrong type of element passed as styled component');
};

var getStyle = getStylesFromStyledComponent;
/**
 *
 * @param {{}} styledComponent - instance of styled component
 * @example
 *  interactive(styled.h1`...`)
 */

var interactive = function interactive(styledComponent) {
  var _getStylesFromStyledC = getStylesFromStyledComponent(styledComponent),
      _getStylesFromStyledC2 = _slicedToArray(_getStylesFromStyledC, 2),
      stylesArray = _getStylesFromStyledC2[0],
      origin = _getStylesFromStyledC2[1];

  var functions = stylesArray.filter(function (v) {
    return typeof v === 'function';
  });
  var delays = functions // after selectors have __delay prop:
  .filter(function (fn) {
    return fn.__delay;
  }).reduce(function (total, fn) {
    return _objectSpread2(_objectSpread2({}, total), {}, _defineProperty({}, fn.__selectorName, fn.__delay));
  }, {});
  var keyframesProps = functions.filter(function (fn) {
    return fn.__keyframesProp;
  }).map(function (fn) {
    return fn.__keyframesProp;
  });

  var component = function component(props) {
    return /*#__PURE__*/jsxRuntime.jsx(SelectorProvider, {
      props: props,
      Element: styledComponent,
      delays: delays,
      keyframesProps: keyframesProps
    });
  };

  component.displayName = styledComponent.displayName || 'Interactive';
  component.toString = styledComponent.toString;
  component.withComponent = styledComponent.withComponent; //static props should be the same as styled-component

  if (origin === 'emotion') {
    component.__emotion_styles = styledComponent.__emotion_styles;
    component.__emotion_real = styledComponent.__emotion_real;
    component.__emotion_base = styledComponent.__emotion_base;
    component.__emotion_forwardProp = styledComponent.__emotion_forwardProp;
  }

  if (origin === 'styled-components') {
    component.attrs = styledComponent.attrs;
    component.componentStyle = styledComponent.componentStyle;
    component.shouldForwardProp = styledComponent.shouldForwardProp;
    component.foldedComponentsIds = styledComponent.foldedComponentsIds;
    component.styledComponentId = styledComponent.styledComponentId;
    component.target = styledComponent.target;
  }

  return component;
};

export { afterClick, afterHold, afterMouseHold, afterMouseHover, afterTap, getKeyframes, getStyle, interactive, useKeyframes, variant, whileHold, whileMouseHold, whileMouseHover, whileTap, withProps };
