import express, { urlencoded } from 'express';
import cors from 'cors';
import {} from "dotenv/config"
import cookieParser from "cookie-parser"
import bodyParser from 'body-parser';

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}))
app.use(urlencoded({extended: true}));


//Imports routers
import userRoutes from "./routes/user.routes.js"
import coursesRoutes from "./routes/course.routes.js"


//Use routers
app.use("/users", userRoutes);
app.use("/courses", coursesRoutes);
// app.get("/some", jwtAuthentication, (req, res) => {
//   res.send("Hello, World!");
// })


export { app }