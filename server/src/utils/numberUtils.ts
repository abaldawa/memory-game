/**
 * User: abhijit.baldawa
 *
 * Numbers util module
 */

/**
 * @private
 *
 * This method returns random number between 'min' (inclusive) and 'max' (inclusive)
 *
 * @param {Number} min - start number of the range which is inclusive
 * @param {Number} max - end number of the range which is inclusive
 * @returns {Number} random number
 */
const getRandomInt = (min: number, max: number): number => {
  const start = Math.ceil(min);
  const end = Math.floor(max);
  return Math.floor(Math.random() * (end - start + 1)) + start;
};

/**
 * @public
 *
 * Returns array of random numbers between start (inclusive) and end (inclusive)
 * of mentioned 'size'
 *
 * @param start - start number of the range which is inclusive
 * @param end - end number of the range which is inclusive
 * @param size - Length of array
 */
const getRandomUniqueIntArray = (
  start: number,
  end: number,
  size: number
): number[] => {
  const anArrayOfUniqueNumbers: number[] = [];

  while (anArrayOfUniqueNumbers.length < size) {
    const newNumber = getRandomInt(start, end);

    if (!anArrayOfUniqueNumbers.includes(newNumber)) {
      anArrayOfUniqueNumbers.push(newNumber);
    }
  }

  return anArrayOfUniqueNumbers;
};

export { getRandomUniqueIntArray };
