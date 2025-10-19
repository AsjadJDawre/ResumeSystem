import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import { databaseConfig } from "./DB/database-config.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";


// Route Imports
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import achievementRoutes from "./routes/achievement.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import skillRoutes from "./routes/skill.routes.js";
import verifyRoutes from "./routes/verify.routes.js";

const app = express();
// const allowedOrigins = ["http://localhost:5173"]; 

// Middlewares


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: true,
  credentials: true
}));



// cors
// app.use(cors({
//   origin: allowedOrigins,
//   credentials: true,
//   methods: ["GET","POST","PUT","DELETE","OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));

// DB Connection 
databaseConfig()

// Base Route
app.get("/", (req, res) => {
  res.send("Resume System Backend Running...");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/verify", verifyRoutes);


// Global Error Handler
app.use(errorMiddleware);


const PORT = process.env.PORT
app.get("/",(req,res)=>{
    res.status(200).send("Helllo from backend ")
})




app.listen(PORT,()=>{
    console.log(`App listening at ${PORT}`)
})