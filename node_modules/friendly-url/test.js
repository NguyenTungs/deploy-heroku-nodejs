'use strict'

/* global it */

const assert = require('assert')
const friendlyUrl = require('./')

it('Résumé', () => {
  // arrange
  const title = 'Résumé'
  const expected = 'resume'

  // act
  const actual = friendlyUrl(title)

  // assert
  assert.strictEqual(actual, expected)
})

// stackoverflow.com/questions/134845/href-attribute-for-javascript-links-or-javascriptvoid0
it('Href attribute for JavaScript links: “#” or “javascript:void(0)”?', () => {
  // arrange
  const title = 'Href attribute for JavaScript links: “#” or “javascript:void(0)”?'
  const expected = 'href-attribute-for-javascript-links-or-javascriptvoid0'

  // act
  const actual = friendlyUrl(title)

  // assert
  assert.strictEqual(actual, expected)
})

// stackoverflow.com/questions/292357/what-are-the-differences-between-git-pull-and-git-fetch
it('What\'s the difference between \'git pull\' and \'git fetch\'?', () => {
  // arrange
  const title = 'What\'s the difference between \'git pull\' and \'git fetch\'?'
  const expected = 'whats-the-difference-between-git-pull-and-git-fetch'

  // act
  const actual = friendlyUrl(title)

  // assert
  assert.strictEqual(actual, expected)
})

// stackoverflow.com/questions/336859/var-functionname-function-vs-function-functionname
it('var functionName = function() {} vs function functionName() {}', () => {
  // arrange
  const title = 'var functionName = function() {} vs function functionName() {}'
  const expected = 'var-functionname-function-vs-function-functionname'

  // act
  const actual = friendlyUrl(title)

  // assert
  assert.strictEqual(actual, expected)
})

// stackoverflow.com/questions/359494/does-it-matter-which-equals-operator-vs-i-use-in-javascript-comparisons
it('Does it matter which equals operator (== vs ===) I use in JavaScript comparisons?', () => {
  // arrange
  const title = 'Does it matter which equals operator (== vs ===) I use in JavaScript comparisons?'
  const expected = 'does-it-matter-which-equals-operator-vs-i-use-in-javascript-comparisons'

  // act
  const actual = friendlyUrl(title)

  // assert
  assert.strictEqual(actual, expected)
})

// stackoverflow.com/questions/1335851/what-does-use-strict-do-in-javascript-and-what-is-the-reasoning-behind-it
it('What does “use strict” do in JavaScript, and what is the reasoning behind it?', () => {
  // arrange
  const title = 'What does “use strict” do in JavaScript, and what is the reasoning behind it?'
  const expected = 'what-does-use-strict-do-in-javascript-and-what-is-the-reasoning-behind-it'

  // act
  const actual = friendlyUrl(title)

  // assert
  assert.strictEqual(actual, expected)
})

// stackoverflow.com/questions/1642028/what-is-the-name-of-the-operator
it('What is the name of this operator: “-->”?', () => {
  // arrange
  const title = 'What is the name of this operator: “-->”?'
  const expected = 'what-is-the-name-of-this-operator'

  // act
  const actual = friendlyUrl(title)

  // assert
  assert.strictEqual(actual, expected)
})

// stackoverflow.com/questions/6430448/why-doesnt-gcc-optimize-aaaaaa-to-aaaaaa
it('Why doesn\'t GCC optimize a*a*a*a*a*a to (a*a*a)*(a*a*a)?', () => {
  // arrange
  const title = 'Why doesn\'t GCC optimize a*a*a*a*a*a to (a*a*a)*(a*a*a)?'
  const expected = 'why-doesnt-gcc-optimize-aaaaaa-to-aaaaaa'

  // act
  const actual = friendlyUrl(title)

  // assert
  assert.strictEqual(actual, expected)
})

// stackoverflow.com/questions/6841333/why-is-subtracting-these-two-times-in-1927-giving-a-strange-result
it('Why is subtracting these two times (in 1927) giving a strange result?', () => {
  // arrange
  const title = 'Why is subtracting these two times (in 1927) giving a strange result?'
  const expected = 'why-is-subtracting-these-two-times-in-1927-giving-a-strange-result'

  // act
  const actual = friendlyUrl(title)

  // assert
  assert.strictEqual(actual, expected)
})

// One sentence with all of the German umlauts + ß + punctuation mark.
it('Sie läuft in einen Fluss und tötet alle grünen Frösche mit süßem Zucker', () => {
  // arrange
  const title = 'Sie läuft in einen Fluss und tötet alle grünen Frösche mit süßem Zucker'
  const expected = 'sie-laeuft-in-einen-fluss-und-toetet-alle-gruenen-froesche-mit-suessem-zucker'

  // act
  const actual = friendlyUrl(title)

  // assert
  assert.strictEqual(actual, expected)
})
