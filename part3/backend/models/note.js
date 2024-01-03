const mongoose = require("mongoose");



mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log("error connecting to MongoDB:", err.message);
  });

const noteSchema = new mongoose.Schema({
  /** 表单验证 */
  content: {
    type: String,
    minLength: 5,
    required: true
  },
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
