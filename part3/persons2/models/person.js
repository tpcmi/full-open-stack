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
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    required: [true,'phone number is required'],
    validate: {
      validator: (num) => /\d{2,3}-\d{6}/.test(num),
      message:props=>`${props.value} is not a valid phone number`
    }
  },
});

PersonSchema.set("toJSON", {
  transform: (doc, res) => {
    res.id = res._id.toString();
    delete res._id;
    delete res.__v;
  },
});

module.exports = mongoose.model("Person", PersonSchema);
