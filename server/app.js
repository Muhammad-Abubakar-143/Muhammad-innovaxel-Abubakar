const express = require('express');
const UrlRoutes = require('./routes/url')
const connectMongoDB= require('./connect')

const app = express();
const PORT = 4000

connectMongoDB("mongodb://localhost:27018/short-url").then(
    console.log("MongoDb Connected")
)
app.use(express.json)

app.use("/url", UrlRoutes)

app.listen(PORT, () => {
    console.log("listening on port 4000");
});
