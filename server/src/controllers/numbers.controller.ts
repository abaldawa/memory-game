/**
 * User: abhijit.baldawa
 *
 * This module exposes controller method's which are connected to /numbers REST endpoint
 */

import { RequestHandler } from 'express';
import * as numbersService from '../services/numbers.service';

interface IGetRandomNumbersArrQueryParams {
  size: number;
  start: number;
  end: number;
}

interface IErrorResponse {
  error: string;
}

const MAX_RANDOM_ARRAY_SIZE = 12;

/**
 * @public
 *
 * @RestEndPoint GET /numbers/random?start=<number>&end=<number>&size=<number>
 *
 * Responds with array of unique random numbers
 *
 * @param req
 * @param res
 */
const getRandomNumbersArr: RequestHandler<
  never,
  IErrorResponse | number[],
  never,
  IGetRandomNumbersArrQueryParams
> = (req, res) => {
  try {
    const { start, end, size } = req.query;

    if (!start || !end || !size) {
      return res
        .status(400)
        .json({ error: `'start', 'end' and 'size' query param is required` });
    }

    const [startNum, endNum, sizeNum] = [+start, +end, +size];

    if (!Number.isSafeInteger(startNum) || !Number.isSafeInteger(endNum)) {
      return res.status(400).json({
        error: `'start' and 'end' query param must be a valid integers with maximum value of ${Number.MAX_SAFE_INTEGER}`,
      });
    }

    if (!Number.isInteger(sizeNum) || sizeNum > MAX_RANDOM_ARRAY_SIZE) {
      return res.status(400).json({
        error: `'size' query param must be a valid number with integer value of ${MAX_RANDOM_ARRAY_SIZE}`,
      });
    }

    return res
      .status(200)
      .json(numbersService.getRandomNumbersArr(startNum, endNum, sizeNum));
  } catch (err: unknown) {
    return res.status(400).json({ error: (err as Error).message });
  }
};

export { getRandomNumbersArr };
