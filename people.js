const readline = require("readline-sync");

let people = [];

// إدخال 10 أشخاص
for (let i = 0; i < 10; i++) {
  console.log(`\nEnter person ${i + 1}`);

  const id = i + 1;
  const firstName = readline.question("First Name: ");
  const lastName = readline.question("Last Name: ");
  const age = readline.questionInt("Age: ");
  const city = readline.question("City: ");

  people.push({ id, firstName, lastName, age, city });
}

// Menu
const choice = readline.question(
  "\n1- View All\n2- View One\n3- Delete All\n4- Delete One\n5- Full Name\nChoose: "
);

if (choice == 1) {
  console.log(people);
}

if (choice == 2) {
  const id = readline.questionInt("Enter ID: ");
  const person = people.find(p => p.id === id);
  console.log(person);
}

if (choice == 3) {
  people = [];
  console.log("All deleted");
}

if (choice == 4) {
  const id = readline.questionInt("Enter ID: ");
  people = people.filter(p => p.id !== id);
  console.log("Deleted");
}

if (choice == 5) {
  people.forEach(p => {
    console.log(`${p.firstName} ${p.lastName} - ${p.city}`);
  });
}