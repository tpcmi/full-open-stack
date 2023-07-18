const mongoose = require("mongoose");
// const url = `mongodb+srv://tpcmi:${password}@cluster0.fv9nlii.mongodb.net/noteApp?retryWrites=true&w=majority`;
const url = process.env.MONGODB_URI;
console.log("connecting to", url);

mongoose.set("strictQuery", flase);

mongoose
  .connect(url)
  .then((result) => {
    console.log("ected to MongoDB");
  })
  .catch((err) => {
    console.log("error connecting to MongoDB:", err.message);
  });

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

// 删除不需要的字段
noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);
