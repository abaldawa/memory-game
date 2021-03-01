/**
 * User: abhijit.baldawa
 *
 * numbers service module
 */

import { getRandomUniqueIntArray } from '../utils/numberUtils';

/**
 * @public
 *
 * Returns an array of random numbers
 *
 * @param start
 * @param end
 * @param size
 */
const getRandomNumbersArr = (
  start: number,
  end: number,
  size: number
): number[] => {
  if (end - start < size) {
    throw new Error(
      `The range is smaller than size. i.e. ${end} - ${start} is less than ${size}`
    );
  }
  return getRandomUniqueIntArray(start, end, size);
};

export { getRandomNumbersArr };
