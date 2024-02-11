const express = require("express");

const urlRouter = require("./routes/url");
const { connectToMongoDB } = require("./connect");

const URL = require("./models/url");
const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("connected to MongoDB")
);

app.use(express.json());
app.use("/url", urlRouter);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timeStamp: Date.now() } } }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
