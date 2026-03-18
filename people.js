const readline = require('readline-sync');

// بيانات الأشخاص
let people = [];

// ----------- Functions -----------
function addPerson() {
  console.log("\n--- Add a Person ---");
  const firstName = readline.question("First Name: ");
  const lastName = readline.question("Last Name: ");
  const age = parseInt(readline.question("Age: "));
  const city = readline.question("City: ");
  const id = people.length ? people[people.length - 1].id + 1 : 1;
  people.push({ id, firstName, lastName, age, city });
  console.log("✅ Person added successfully!");
}

function viewAllPeople() {
  if (people.length === 0) {
    console.log("No people found.");
    return;
  }
  console.log("\nID | Name           | Age | City");
  console.log("-------------------------------");
  people.forEach(p => {
    console.log(
      `${p.id.toString().padEnd(3)}| ${p.firstName} ${p.lastName}`.padEnd(15) +
      ` | ${p.age.toString().padEnd(3)} | ${p.city}`
    );
  });
}

function viewPersonById() {
  const id = parseInt(readline.question("Enter ID of the person: "));
  const p = people.find(p => p.id === id);
  if (!p) {
    console.log("❌ Person not found.");
    return;
  }
  console.log(`\nID: ${p.id}\nFull Name: ${p.firstName} ${p.lastName}\nAge: ${p.age}\nCity: ${p.city}`);
}

function deletePersonById() {
  const id = parseInt(readline.question("Enter ID to delete: "));
  const lenBefore = people.length;
  people = people.filter(p => p.id !== id);
  if (lenBefore === people.length) console.log("❌ Person not found.");
  else console.log("✅ Person deleted.");
}

function deleteAllPeople() {
  people = [];
  console.log("✅ All people deleted.");
}

function viewFullNameAndCity() {
  if (people.length === 0) {
    console.log("No people found.");
    return;
  }
  console.log("\nFull Name | City");
  console.log("----------------");
  people.forEach(p => {
    console.log(`${p.firstName} ${p.lastName}`.padEnd(15) + ` | ${p.city}`);
  });
}

// ----------- Main Menu -----------
function mainMenu() {
  while (true) {
    console.log("\n🌍 People Manager");
    console.log("1. View All People");
    console.log("2. View Person by ID");
    console.log("3. Add Person");
    console.log("4. Delete Person by ID");
    console.log("5. Delete All People");
    console.log("6. View Full Name & City");
    console.log("0. Exit");

    const choice = readline.questionInt("Enter choice: ");

    switch(choice) {
      case 1: viewAllPeople(); break;
      case 2: viewPersonById(); break;
      case 3: addPerson(); break;
      case 4: deletePersonById(); break;
      case 5: deleteAllPeople(); break;
      case 6: viewFullNameAndCity(); break;
      case 0: console.log("Goodbye! 👋"); return;
      default: console.log("❌ Invalid choice.");
    }
  }
}

// ----------- Run -----------
mainMenu();