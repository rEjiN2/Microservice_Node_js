const mongoose = require('mongoose')


mongoose.Promise = global.Promise;

const option = { useNewUrlParser: true, useUnifiedTopology: true };

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, option);
    console.log("Woow Ur in a DB");
    global.defaultSettings = { language: "eng" };
    return true;
  } catch (err) {
    console.log("Ni oomFiii");
    return false;
  }
};

module.exports = {
    connectToMongoDB
}