import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import galleryRoutes from "./src/routes/galleryRoutes.js";
import staffRoutes from "./src/routes/staffRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use('/api/v1/gallery', galleryRoutes);
app.use('/api/v1/staff', staffRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
