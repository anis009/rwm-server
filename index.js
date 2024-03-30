import mongoose from "mongoose";
import config from "./config/index.js";
import app from "./app.js";
import colors from "colors";

async function connectToMongoDB() {
  try {
    const url = config.mongo_uri;
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(url, options);
    console.log("Connected to MongoDB".underline.yellow.bold);
    app.listen(config.port, () => {
      console.log(
        `Server is listening on port ${config.port}`.underline.red.bold
      );
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

connectToMongoDB();
