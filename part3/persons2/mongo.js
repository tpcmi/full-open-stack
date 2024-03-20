const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("需要输入mongodb的密码");
  process.exit(1);
}

const [, , password, name, number] = process.argv;
const url = `mongodb+srv://person:${password}@cluster0.w0bhmhw.mongodb.net/Person?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (name && number) {
  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then(() => {
    console.log(`${name} saved!`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((persons) => {
    console.log("Person:");
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    })
    // .find 是异步方法，因此断开连接要写在then里面，如果写在外面，连接会关闭得早，导致数据没来得及输出
    mongoose.connection.close();
  });
}
