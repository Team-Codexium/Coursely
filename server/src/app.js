import express, { urlencoded } from 'express';
import cors from 'cors';
import {} from "dotenv/config"
import cookieParser from "cookie-parser"
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
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
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' http://localhost:3000; script-src 'self'; style-src 'self';");
  next();
});


//Imports routers
import userRoutes from "./routes/user.routes.js"
import coursesRoutes from "./routes/course.routes.js"


//Use routers
app.use("/users", userRoutes);
app.use("/courses", coursesRoutes);



export { app }