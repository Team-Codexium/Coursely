import express, { urlencoded } from 'express';
import cors from 'cors';
import {} from "dotenv/config"
import cookieParser from "cookie-parser"

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))
app.use(urlencoded({extended: true}));


//Imports routers
import userRoutes from "./routes/user.routes.js"
import coursesRoutes from "./routes/course.routes.js"


//Use routers
app.use("/users", userRoutes);
app.use("/course", coursesRoutes);
// app.get("/some", jwtAuthentication, (req, res) => {
//   res.send("Hello, World!");
// })


export { app }