import express from "express";
import { TripControllers } from "./trip.controller.js";

const tripRouter = express.Router();

// Routes for the "trips" collection
tripRouter
  .route("/")
  .post(TripControllers.createTrip)
  .get(TripControllers.getAllTrips);

// Routes for individual trip by ID
tripRouter
  .route("/:id")
  .get(TripControllers.getTripById) // Get a specific trip by ID
  .patch(TripControllers.updateTrip) // Update a specific trip by ID
  .delete(TripControllers.deleteTrip); // Delete a specific trip by ID

export default tripRouter;
