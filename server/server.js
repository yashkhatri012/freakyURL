import "dotenv/config";
import connectDB from "./src/config/db.js";
import app from "./src/app.js";
import { connectRedis } from "./src/config/redis.js";

const port = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();

    try {
      await connectRedis();
      console.log("Redis connected");
    } catch (err) {
      console.error("Redis failed:", err);
    }

    app.listen(port, "0.0.0.0", () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Startup failed:", err);
    process.exit(1);
  }
}

startServer();