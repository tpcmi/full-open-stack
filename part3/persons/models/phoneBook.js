const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;
console.log("connecting to", url);

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log("error connecting to MongoDB:", err.message);
  });

const nubmerValidator = (num) => {
  const regex = /^\d{2,3}(-)\d+$/;
  return regex.test(num);
};

const phoneBookSchema = new mongoose.Schema({
  name: {
    type: "string",
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: [nubmerValidator, "Number is illegal"],
  },
});

phoneBookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("PhoneBook", phoneBookSchema);
