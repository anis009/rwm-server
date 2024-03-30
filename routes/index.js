import express from "express";
import tripRouter from "../app/modules/trip/trip.route.js";
import {
  authRouter,
  tempRouter,
  usersRouter,
} from "../app/modules/users/users.route.js";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/",
    route: tempRouter,
  },
  {
    path: "/users",
    route: usersRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export { router };
