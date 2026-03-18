const output = document.getElementById("output");
const formContainer = document.getElementById("formContainer");

let people = [
  { id: 1, firstName: "Ahmed", lastName: "Ali", age: 25, city: "Cairo" },
  { id: 2, firstName: "Sara", lastName: "Hassan", age: 27, city: "Alex" }
];

// بيانات الطقس تجريبية
const weatherData = {
  "Egypt": { temp: 25, lat: 26.82, lon: 30.80 },
  "USA": { temp: 15, lat: 38.0, lon: -97.0 },
  "France": { temp: 18, lat: 46.0, lon: 2.0 }
};

const countryMap = {
  "مصر": "Egypt",
  "امريكا": "USA",
  "فرنسا": "France"
};

function displayPeople() {
  if (people.length === 0) {
    output.innerHTML = "No people found.";
    return;
  }

  let html = `<table>
    <tr><th>ID</th><th>Name</th><th>Age</th><th>City</th></tr>`;
  people.forEach(p => {
    html += `<tr>
      <td>${p.id}</td>
      <td>${p.firstName} ${p.lastName}</td>
      <td>${p.age}</td>
      <td>${p.city}</td>
    </tr>`;
  });
  html += `</table>`;
  output.innerHTML = html;
}

document.getElementById("viewAll").onclick = () => {
  formContainer.classList.add("hidden");
  displayPeople();
};

document.getElementById("addPerson").onclick = () => {
  formContainer.innerHTML = `
    <h3>Add Person</h3>
    <input id="firstName" placeholder="First Name"><br><br>
    <input id="lastName" placeholder="Last Name"><br><br>
    <input id="age" type="number" placeholder="Age"><br><br>
    <input id="city" placeholder="City"><br><br>
    <button id="submitAdd">Add</button>
  `;
  formContainer.classList.remove("hidden");

  document.getElementById("submitAdd").onclick = () => {
    const id = people.length ? people[people.length - 1].id + 1 : 1;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const age = parseInt(document.getElementById("age").value);
    const city = document.getElementById("city").value;
    people.push({ id, firstName, lastName, age, city });
    formContainer.classList.add("hidden");
    displayPeople();
  };
};

document.getElementById("deletePerson").onclick = () => {
  formContainer.innerHTML = `
    <h3>Delete Person</h3>
    <input id="deleteId" type="number" placeholder="Enter ID"><br><br>
    <button id="submitDelete">Delete</button>
  `;
  formContainer.classList.remove("hidden");

  document.getElementById("submitDelete").onclick = () => {
    const id = parseInt(document.getElementById("deleteId").value);
    people = people.filter(p => p.id !== id);
    formContainer.classList.add("hidden");
    displayPeople();
  };
};

document.getElementById("weatherBtn").onclick = () => {
  formContainer.innerHTML = `
    <h3>Weather by Country</h3>
    <input id="countryName" placeholder="Enter Country Name"><br><br>
    <button id="submitWeather">Get Weather</button>
  `;
  formContainer.classList.remove("hidden");

  document.getElementById("submitWeather").onclick = () => {
    let country = document.getElementById("countryName").value;
    if (countryMap[country]) country = countryMap[country];

    formContainer.classList.add("hidden");

    if (!weatherData[country]) {
      output.innerHTML = "❌ Country not found.";
      return;
    }

    const w = weatherData[country];
    output.innerHTML = `
      <div class="weather-card">
        <h3>🌤 Weather Info</h3>
        <p>🌍 Country     : ${country}</p>
        <p>🌡 Temperature : ${w.temp} °C</p>
        <p>📍 Latitude    : ${w.lat}</p>
        <p>📍 Longitude   : ${w.lon}</p>
      </div>
    `;
  };
};