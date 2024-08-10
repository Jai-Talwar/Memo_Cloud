let mongoose = require("mongoose");
let mongoUri = "mongodb://localhost:27017/inoteBook";
const mongoconnect = async () => {
  await mongoose.connect(mongoUri);
  console.log(mongoose.connection.readyState);
};

module.exports = mongoconnect;
// mongoconnect();
