import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import xss from "xss-clean";
import homeRoutes from "./src/routes/homeRoutes.js";
import aboutRoutes from "./src/routes/aboutRoutes.js";
import staffRoutes from "./src/routes/staffRoute.js";
import galleryRoutes from "./src/routes/galleryRoutes.js";
import newsRoutes from "./src/routes/newsRoutes.js";
import eventsRoutes from "./src/routes/eventsRoutes.js";
import courseRoutes from "./src/routes/coursesRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS CONFIGURATION
const allowedOrigins = [
  "http://localhost:5173",
  "https://owf.lk",
  "https://oneworldcollege.owf.lk"
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PATCH"],
  credentials: true
}));

// ✅ SECURITY MIDDLEWARE
app.use(helmet()); // SECURE HTTP HEADERS
app.use(express.json({ limit: "500kb" })); // PREVENT LARGE PAYLOAD ATTACKS
app.use(xss()); // PREVENT XSS ATTACKS

// ✅ RATE LIMITING (MAX 100 REQUESTS PER 15 MIN PER IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: "error",
    message: "Too many requests, please try again later."
  }
});
app.use("/api", limiter);

// ✅ ROUTES
app.use("/api/v1/home", homeRoutes);
app.use("/api/v1/about", aboutRoutes);
app.use("/api/v1/staff", staffRoutes);
app.use("/api/v1/gallery", galleryRoutes);
app.use("/api/v1/news", newsRoutes);
app.use("/api/v1/events", eventsRoutes);
app.use("/api/v1/courses", courseRoutes);

// ✅ ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ status: "error", message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
