import express from 'express';
import { flightsData } from '../data/flights';

const travelRouter = express.Router();

/**
 * @swagger
 * /api/travel/flights:
 *   get:
 *     summary: Get available flight details
 *     description: Fetch flights based on origin, destination, and travel dates.
 *     tags: [Travel]
 *     parameters:
 *       - in: query
 *         name: originLocationCode
 *         schema:
 *           type: string
 *         required: true
 *         description: Departure airport IATA code (e.g., DEL)
 *       - in: query
 *         name: destinationLocationCode
 *         schema:
 *           type: string
 *         required: true
 *         description: Arrival airport IATA code (e.g., BOM)
 *       - in: query
 *         name: departureDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Departure date in YYYY-MM-DD format
 *       - in: query
 *         name: returnDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Return date in YYYY-MM-DD format (optional)
 *       - in: query
 *         name: adults
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: Number of adult passengers. Default is 1.
 *       - in: query
 *         name: max
 *         schema:
 *           type: integer
 *           default: 10
 *         required: false
 *         description: Maximum number of results. Default is 10.
 *     responses:
 *       200:
 *         description: A list of available flights
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 meta:
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       numberOfBookableSeats:
 *                         type: integer
 *                       itineraries:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             segments:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   departure:
 *                                     type: object
 *                                     properties:
 *                                       iataCode:
 *                                         type: string
 *                                       at:
 *                                         type: string
 *                                         format: date-time
 *                                   arrival:
 *                                     type: object
 *                                     properties:
 *                                       iataCode:
 *                                         type: string
 *                                       at:
 *                                         type: string
 *                                         format: date-time
 *                       price:
 *                         type: object
 *                         properties:
 *                           currency:
 *                             type: string
 *                           total:
 *                             type: string
 *       400:
 *         description: Invalid request parameters
 *       500:
 *         description: Internal server error
 */



travelRouter.get('/flights', async (req, res): Promise<any> => {
    try {
        // Extract query parameters
        const {
            originLocationCode,
            destinationLocationCode,
            adults = '1',
            max = '10',
            departureDate,
            returnDate
        } = req.query;

        // Validate required parameters
        if (!originLocationCode || !destinationLocationCode || !departureDate) {
            return res.status(400).json({
                error: 'Missing required parameters. Please provide originLocationCode, destinationLocationCode and departureDate.'
            });
        }

        // Filter flights based on origin and destination
        let filteredFlights = flightsData.data.filter(flight => {
            const outboundSegment = flight.itineraries[0].segments[0];

            // For one-way flights, check only the outbound flight
            if (flight.oneWay) {
                return outboundSegment.departure.iataCode === originLocationCode &&
                    outboundSegment.arrival.iataCode === destinationLocationCode;
            }

            // For round trips, check both outbound and inbound legs
            const inboundSegment = flight.itineraries[1]?.segments[0];
            return outboundSegment.departure.iataCode === originLocationCode &&
                outboundSegment.arrival.iataCode === destinationLocationCode &&
                (!returnDate || (inboundSegment &&
                    inboundSegment.departure.iataCode === destinationLocationCode &&
                    inboundSegment.arrival.iataCode === originLocationCode));
        });

        // Filter by dates if provided
        if (departureDate) {
            const departureDateObj = new Date(departureDate as string);

            filteredFlights = filteredFlights.filter(flight => {
                const flightDeparture = new Date(flight.itineraries[0].segments[0].departure.at.split('T')[0]);
                return flightDeparture.toISOString().split('T')[0] === departureDateObj.toISOString().split('T')[0];
            });
        }

        if (returnDate) {
            const returnDateObj = new Date(returnDate as string);

            filteredFlights = filteredFlights.filter(flight => {
                if (flight.oneWay) return false;

                const flightReturn = new Date(flight.itineraries[1].segments[0].departure.at.split('T')[0]);
                return flightReturn.toISOString().split('T')[0] === returnDateObj.toISOString().split('T')[0];
            });
        }

        // Limit results based on max parameter
        const maxResults = parseInt(max as string, 10);
        filteredFlights = filteredFlights.slice(0, maxResults);

        // Adjust traveler count if needed
        const requestedAdults = parseInt(adults as string, 10);
        if (requestedAdults > 1) {
            filteredFlights = filteredFlights.map(flight => {
                // Only process flights with enough bookable seats
                if (flight.numberOfBookableSeats >= requestedAdults) {
                    // Create a copy to avoid modifying the original data
                    const adjustedFlight = JSON.parse(JSON.stringify(flight));

                    // Adjust price for multiple travelers
                    const basePrice = parseFloat(flight.price.total);
                    adjustedFlight.price.total = (basePrice * requestedAdults).toFixed(2);
                    adjustedFlight.price.grandTotal = (basePrice * requestedAdults).toFixed(2);

                    // Adjust travelerPricings for multiple travelers
                    const travelerPricing = flight.travelerPricings[0];
                    adjustedFlight.travelerPricings = [];

                    for (let i = 0; i < requestedAdults; i++) {
                        adjustedFlight.travelerPricings.push({
                            ...travelerPricing,
                            travelerId: (i + 1).toString()
                        });
                    }

                    return adjustedFlight;
                }
                return flight;
            });
        }

        // Create response object
        const response = {
            meta: {
                count: filteredFlights.length,
                // links: {
                //     self: `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}${returnDate ? `&returnDate=${returnDate}` : ''}&adults=${adults}&max=${max}`
                // }
            },
            data: filteredFlights
        };

        return res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching flight data:', error);
        return res.status(500).json({
            error: 'Internal server error',
            details: (error as Error).message
        });
    }
});

export default travelRouter;
