import express, { urlencoded } from 'express';
import cors from 'cors';
import {} from "dotenv/config"

const app = express();

app.use(cors({
  origin: "*",
  credentials: true,
}))
app.use(urlencoded({extended: true}));


//Routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
})


app.listen(8000, () => {
  console.log("Server is running on port 8000");
})