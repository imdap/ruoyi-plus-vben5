import lastArrayEach from './lastArrayEach'
import keys from './keys'

function lastObjectEach (obj, iterate, context) {
  lastArrayEach(keys(obj), function (key) {
    iterate.call(context, obj[key], key, obj)
  })
}

export default lastObjectEach
