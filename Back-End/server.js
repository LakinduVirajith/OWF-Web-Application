import express from "express";
import cors from "cors";
import dotenv from "dotenv";
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

const allowedOrigins = ['http://localhost:5173', 'https://owf.lk', 'https://oneworldcollege.owf.lk'];
app.use(cors({
  origin: allowedOrigins
}));

app.use(express.json());

app.use('/api/v1/home', homeRoutes);
app.use('/api/v1/about', aboutRoutes);
app.use('/api/v1/staff', staffRoutes);
app.use('/api/v1/gallery', galleryRoutes);
app.use('/api/v1/news', newsRoutes);
app.use('/api/v1/events', eventsRoutes);
app.use('/api/v1/courses', courseRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
