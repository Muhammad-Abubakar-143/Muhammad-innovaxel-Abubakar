const express = require('express');
const UrlRoutes = require('./routes/url');
const connectMongoDB = require('./connect');
const cors = require('cors');

const app = express();
const PORT = 4000;
app.use(cors());

connectMongoDB("mongodb://localhost:27018/short-url")
  .then(() => {
    console.log("MongoDB Connected");

    app.use(express.json());
    app.use("/url", UrlRoutes);

    app.get("/", (req, res) => {
      res.send("Server is running ");
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
