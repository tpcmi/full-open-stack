const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('password is required');
  process.exit(1);
}

const password = process.argv[2];
const newName = process.argv[3];
const newNumber = process.argv[4];

const url = `mongodb+srv://tpcmi:${password}@cluster0.fv9nlii.mongodb.net/phoneBookApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url)

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String
})

const PhoneBook = mongoose.model('PhoneBook', phoneBookSchema);

const newBook = new PhoneBook({
  name: newName,
  number: newNumber
});

newBook.save().then(result => {
  console.log(`added ${newName} number ${newNumber} to phone book`);
  mongoose.connection.close();
})




