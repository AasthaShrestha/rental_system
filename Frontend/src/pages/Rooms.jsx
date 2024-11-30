import axios from 'axios';
import { useEffect, useState } from 'react';

const Rooms = () => {
    const [rentals, setRentals] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch nearby rentals
        const fetchNearbyRentals = async () => {
            const userLat = 27.7172; // Example: Kathmandu latitude
            const userLon = 85.3240; // Example: Kathmandu longitude
            const radius = 10; // 10 km radius

            try {
                const response = await axios.get('http://localhost:4001/api/nearby-rentals', {
                    params: { userLat, userLon, radius },
                });

                if (response.data.success) {
                    setRentals(response.data.rentals);
                } else {
                    throw new Error(response.data.message || 'Error fetching rentals');
                }
            } catch (error) {
                setError(error.response ? error.response.data.message : error.message);
                console.error('Error fetching rentals:', error);
            }
        };

        fetchNearbyRentals();
    }, []);

    return (
        <div>
            {error && <p>Error: {error}</p>}
            <ul>
                {rentals.map((rental) => (
                    <li key={rental._id}>{rental.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Rooms;
