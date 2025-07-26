import app from "./app";
import connectDB from "./config/db";

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`⚡️ Server running on port ${PORT}`);
    console.log(`🌱 Environment: ${process.env.NODE_ENV || "development"}`);
  });
};

startServer();
