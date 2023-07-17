const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://tpcmi:${password}@cluster0.fv9nlii.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "Mongoose makes things easy",
  important: true,
});

// note.save().then(result => {
//   console.log('note saved!');
//   mongoose.connection.close();
// })

Note.find({}).then(result => {
  result.forEach((note) => {
    console.log(note);
  });
  // 不能将断开连接的语句写在then之外，否则会等不到then回调直接断开了
  mongoose.connection.close();
});