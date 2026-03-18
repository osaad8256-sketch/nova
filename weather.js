const axios = require("axios");
const readline = require("readline-sync");

// ✅ API KEY
const API_KEY = "3cd6d2e988fb16e2d95720b2b1b26693";

// إدخال اسم الدولة
const country = readline.question("🌍 Enter country name: ");

async function getWeather() {
  try {
    console.log("\n⏳ Fetching data...\n");

    // 1- Geocoding API
    const geoRes = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${country}&limit=1&appid=${API_KEY}`
    );

    if (geoRes.data.length === 0) {
      console.log("❌ Country not found, try again.");
      return;
    }

    const { lat, lon, name } = geoRes.data[0];

    // 2- Weather API
    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    const temp = weatherRes.data.main.temp;

    // ✅ Output
    console.log("========== 🌤 Weather Info ==========");
    console.log(`🌍 Country     : ${name}`);
    console.log(`🌡 Temperature : ${temp} °C`);
    console.log(`📍 Latitude    : ${lat}`);
    console.log(`📍 Longitude   : ${lon}`);
    console.log("====================================");

  } catch (error) {

    // 🔥 حل مشكلة 401 (API مش شغال)
    if (error.response && error.response.status === 401) {
      console.log("⚠️ API not active yet, showing demo data...\n");

      console.log("========== 🌤 Weather Info ==========");
      console.log(`🌍 Country     : ${country}`);
      console.log(`🌡 Temperature : 25 °C`);
      console.log(`📍 Latitude    : 26.82`);
      console.log(`📍 Longitude   : 30.80`);
      console.log("====================================");

    } else if (error.response && error.response.status === 404) {
      console.log("❌ Data not found.");

    } else if (error.request) {
      console.log("❌ Network Error. Check your internet.");

    } else {
      console.log("❌ Error:", error.message);
    }

  }
}

getWeather();