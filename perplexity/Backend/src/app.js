import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());

//health check route
app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is running" });
});

app.use("/api/auth", authRouter);

export default app;