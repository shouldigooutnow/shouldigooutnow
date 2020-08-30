import JSBI from 'jsbi'

// Inspiration https://github.com/dabockster/combinations.js/blob/master/src/index.js
const factorial = n => {
  const bigN = n instanceof JSBI ? n : JSBI.BigInt(n)
  if (JSBI.lessThan(bigN, JSBI.BigInt(0))) {
    return undefined
  } else if (JSBI.equal(bigN, JSBI.BigInt(0))) {
    return JSBI.BigInt(1)
  } else {
    return JSBI.multiply(bigN, factorial(JSBI.subtract(bigN, JSBI.BigInt(1))))
  }
}

// Inspiration https://github.com/dabockster/combinations.js/blob/master/src/index.js
const combinations = (n, k) => {
  if (k > n) {
    return 0
  }
  //grab n! and k!
  var nFact = factorial(n)
  var kFact = factorial(k)

  //compute (n-k)! for later
  var nkFact = factorial(n - k)

  //set numerator & denominator
  var numerator = nFact
  var denominator = JSBI.multiply(kFact, nkFact)

  return JSBI.divide(numerator, denominator)
}

// Inspiration https://github.com/ben-ng/binomial-probability/blob/master/index.js
export const binomialProbability = (trials, successes, probOfSuccess) => {
  return (
    JSBI.toNumber(combinations(trials, successes)) * Math.pow(probOfSuccess, successes) * Math.pow(1 - probOfSuccess, trials - successes)
  )
}
