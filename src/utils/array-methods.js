export function uniqueValuesFromObjectsArray (array, objKeys) {
  if (objKeys.length <= 0) {
    return array
  }

  let uniques = objKeys.map(key => {
    return [...new Set(array.map(item => item[key]))].sort()
  })

  return [].concat.apply([], uniques)
}

export function checkByValueIfObjectIsInArray (array, objectKey, itemValue) {
  if (!objectKey || !itemValue) {
    return array
  }

  return array.some(function (item) {
    return item[objectKey] === itemValue
  })
}

export function filterObjectsArrayByValueQuery (array, query) {
  if (typeof query !== 'string' || query === '') {
    return array
  }

  const queryRegExp = new RegExp(query, 'gi')
  return array.filter(el => {
    return Object.keys(el).some(function (key) {
      return el[key].toString().match(queryRegExp)
    })
  })
}
