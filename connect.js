const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

async function connectToMongoDB(databaseUrl) {
  return mongoose.connect(databaseUrl);
}

module.exports = {
  connectToMongoDB,
};
