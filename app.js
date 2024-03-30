import express from "express";
import config from "./config/index.js";
import morgan from "morgan";
import cors from "cors";
import globalErrorHandler from "./app/middleware/globalErrorHandler.js";
import { router } from "./routes/index.js";

const app = express();

// ? middleware

app.use(morgan("dev"));
app.use(express.json());

app.use(cors());

app.get("/", async (req, res) => {
  res.send("Hello World");
});

// ? routes
app.use("/", router);
// ? error handling
app.use(globalErrorHandler);

//? Not Found Middleware
app.use((req, res) => {
  res.status(404).send("404 - Not Found");
});

export default app;
