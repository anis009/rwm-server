import Trip from "./trip.model.js";

const createTrip = async (tripData) => {
  const newTrip = new Trip(tripData);
  const savedTrip = await newTrip.save();
  return savedTrip;
};

const deleteTrip = async (tripId) => {
  const deletedTrip = await Trip.findByIdAndDelete(tripId);
  return deletedTrip;
};

const updateTrip = async (tripId, updatedData) => {
  const updatedTrip = await Trip.findByIdAndUpdate(tripId, updatedData, {
    new: true,
  });
  return updatedTrip;
};

const getTripById = async (tripId) => {
  const trip = await Trip.findById(tripId);
  return trip;
};

const getAllTrips = async () => {
  const trips = await Trip.find();
  return trips;
};

const getTripByRoute = async (route) => {
  const trips = await Trip.aggregate([
    {
      $group: {
        _id: { route: "$route" },
        trips: { $addToSet: "$busName" },
        createdAt: { $first: "$createdAt" }, // Keep the first createdAt value for each route
      },
    },
    {
      $match: {
        "trips.1": { $exists: true },
      },
    },
    {
      $sort: { createdAt: -1 }, // Sort by createdAt field in descending order
    },
  ]);

  return trips;
};

export const TripServices = {
  createTrip,
  deleteTrip,
  updateTrip,
  getTripById,
  getAllTrips,
  getTripByRoute,
};
