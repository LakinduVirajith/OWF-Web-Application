import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import driveRoutes from "./src/routes/driveRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use('/api/v1/drive', driveRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
