require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.MONGODB_URL;
mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Connect to MOngoDB error", err.message);
  });

const PersonSchema = new mongoose.Schema({
  name: String,
  number: String,
});

PersonSchema.set("toJSON", {
  transform: (doc, res) => {
    res.id = res._id.toString();
    delete res._id;
    delete res.__v;
  },
});

module.exports = mongoose.model("Person", PersonSchema);
