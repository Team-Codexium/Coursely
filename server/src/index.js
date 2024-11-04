import { app } from "./app.js";
import {} from "dotenv/config"
import dbConnect from './db/index.js';



dbConnect().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}).catch((err) => {
  console.log("SERVER CONNECTION FAILED: ", err);
})