import setupDefaults from './setupDefaults'

import arrayEach from './arrayEach'
import each from './each'
import isFunction from './isFunction'

import assign from './assign'

var XEUtils = function () {}

function mixin () {
  arrayEach(arguments, function (methods) {
    each(methods, function (fn, name) {
      XEUtils[name] = isFunction(fn) ? function () {
        var result = fn.apply(XEUtils.$context, arguments)
        XEUtils.$context = null
        return result
      } : fn
    })
  })
}

function setConfig (options) {
  return assign(setupDefaults, options)
}

function getConfig () {
  return setupDefaults
}

var version = '4.0.4'

XEUtils.VERSION = version
XEUtils.version = version
XEUtils.mixin = mixin
XEUtils.setup = setConfig
XEUtils.setConfig = setConfig
XEUtils.getConfig = getConfig

export default XEUtils
