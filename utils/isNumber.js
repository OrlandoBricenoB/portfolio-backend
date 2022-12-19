const isNumber = number => {
  if (typeof number !== 'number') return false
  return number - number === 0
}

module.exports = isNumber
