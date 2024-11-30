import Rental  from '../model/rental.model.js';

const toRadians = (degrees) => (degrees * Math.PI) / 180;

const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);
    const Δφ = toRadians(lat2 - lat1);
    const Δλ = toRadians(lon2 - lon1);

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in km
};

export const getNearbyRentals = async (req, res) => {
    const { userLat, userLon, radius } = req.query;

    if (!userLat || !userLon || !radius) {
        return res.status(400).json({ success: false, message: 'Invalid query parameters' });
    }

    try {
        const rentals = await Rental.find(); // Fetch all rentals

        const nearbyRentals = rentals.filter((rental) => {
            const distance = haversineDistance(userLat, userLon, rental.latitude, rental.longitude);
            return distance <= radius;
        });

        res.json({ success: true, rentals: nearbyRentals });
    } catch (error) {
        console.error('Error fetching nearby rentals:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
