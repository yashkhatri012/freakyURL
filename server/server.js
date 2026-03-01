import "dotenv/config";
import connectDB from "./src/config/db.js";
import app from "./src/app.js";

const port = process.env.PORT || 5000;

connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});