import express from 'express';
import { getNearbyRentals } from '../controller/rental.controller.js';

const router = express.Router();

// Route to get nearby rentals
router.get('/nearby-rentals', getNearbyRentals);

export default router;
