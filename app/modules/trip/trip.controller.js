import httpStatus from "http-status";
import { responseObj } from "../../../shared/response.js";
import { TripServices } from "./trip.service.js";
import catchAsync from "../../../shared/catchAsync.js";

const createTrip = catchAsync(async (req, res) => {
  const tripData = req.body;
  const newTrip = await TripServices.createTrip(tripData);
  const responseData = responseObj(
    httpStatus.CREATED,
    "Trip created successfully",
    newTrip
  );
  res.json(responseData);
});

const deleteTrip = catchAsync(async (req, res) => {
  const tripId = req.params.id;
  const deletedTrip = await TripServices.deleteTrip(tripId);
  if (!deletedTrip) {
    const errorResponse = responseObj(httpStatus.NOT_FOUND, "Trip not found");
    return res.status(httpStatus.NOT_FOUND).json(errorResponse);
  }
  const responseData = responseObj(
    httpStatus.OK,
    "Trip deleted successfully",
    deletedTrip
  );
  res.json(responseData);
});

const updateTrip = catchAsync(async (req, res) => {
  const tripId = req.params.id;
  const updatedData = req.body;
  const updatedTrip = await TripServices.updateTrip(tripId, updatedData);
  if (!updatedTrip) {
    const errorResponse = responseObj(httpStatus.NOT_FOUND, "Trip not found");
    return res.status(httpStatus.NOT_FOUND).json(errorResponse);
  }
  const responseData = responseObj(
    httpStatus.OK,
    "Trip updated successfully",
    updatedTrip
  );
  res.json(responseData);
});

const getTripById = catchAsync(async (req, res) => {
  const tripId = req.params.id;
  const trip = await TripServices.getTripById(tripId);
  if (!trip) {
    const errorResponse = responseObj(httpStatus.NOT_FOUND, "Trip not found");
    return res.status(httpStatus.NOT_FOUND).json(errorResponse);
  }
  const responseData = responseObj(httpStatus.OK, "Trip found", trip);
  res.json(responseData);
});

const getTripByRoute = catchAsync(async (req, res) => {
  const trips = await TripServices.getAllTrips();
  const responseData = responseObj(httpStatus.OK, "All trips retrieved", trips);
  res.json(responseData);
});
const getAllTrips = catchAsync(async (req, res) => {
  const trips = await TripServices.getAllTrips();
  const responseData = responseObj(httpStatus.OK, "All trips retrieved", trips);
  res.json(responseData);
});

export const TripControllers = {
  createTrip,
  deleteTrip,
  updateTrip,
  getTripById,
  getAllTrips,
};
