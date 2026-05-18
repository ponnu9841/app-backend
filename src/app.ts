import express from "express";
import cors from "cors";
import helmet from "helmet";
import * as env from "./config/env";
import { morganMiddleware, errorHandler } from "./middlewares";
import routes from "./routes";
import path from "path";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: function (origin, callback) {
            console.log("Incoming origin:", origin);
            const allowedOrigins = env.ALLOWED_ORIGINS;
            if (!origin || allowedOrigins?.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "X-Requested-With",
            "Accept",
        ],
        credentials: true,
    }),
);
app.use(
    helmet({
        crossOriginResourcePolicy: false, // 🔥 disable CORP
    })
);
app.use(morganMiddleware);
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.use("/api", routes);

// Error Handler
app.use(errorHandler);

export default app;
