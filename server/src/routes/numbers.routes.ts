/**
 * User: abhijit.baldawa
 *
 * This module contains all the routes for '/numbers' endpoint
 */

import { Router } from 'express';
import { getRandomNumbersArr } from '../controllers/numbers.controller';

const router = Router();

router.get('/random', getRandomNumbersArr);

export default router;
