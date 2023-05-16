import fs from "fs";

let animals = [
    { name: "a1", species: "dog", price: 100 },
    { name: "a2", species: "cat", price: 200 },
    { name: "a3", species: "dog", price: 300 },
    { name: "a4", species: "dog", price: 400 },
];

// filter
const isDog = (animal) => {
    if (animal.species === "dog") {
        return true;
    }
    return false;
};

const dogList = animals.filter(isDog);
console.log(dogList);

// map
const nameList = animals.map(
    (animal) => animal.name + " is a " + animal.species
);
console.log(nameList);

// reduce
const totalPrice = animals.reduce((sum, item) => sum + item.price, 0);
console.log(totalPrice);

// 汇总练习

const output = fs
    .readFileSync("data.txt", "utf-8")
    .trim()
    .split("\n")
    .map((line) => line.split(" "))
    .reduce((out, line) => {
        out[line[0]] = out[line[0]] || [];
        out[line[0]].push({
            name: line[1],
            price: line[2],
            quantity: line[3],
        });
        return out;
    }, {});
console.log(JSON.stringify(output, null, 2));
