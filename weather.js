const readline = require('readline-sync');
const axios = require('axios');

// لو عندك API Key حقيقي من OpenWeatherMap حط هنا
const API_KEY = "PUT_YOUR_API_KEY_HERE"; // مثال: "3cd6d2e988fb16e2d95720b2b1b26693"

// بيانات تجريبية لو مش عايز تستخدم API حقيقي
const demoWeather = {
  "Egypt": { temp: 25, lat: 26.82, lon: 30.80 },
  "USA": { temp: 15, lat: 38.0, lon: -97.0 },
  "France": { temp: 18, lat: 46.0, lon: 2.0 }
};

// تحويل الأسماء من العربي للإنجليزي
const countryMap = {
  "مصر": "Egypt",
  "امريكا": "USA",
  "فرنسا": "France"
};

async function getWeather() {
  let country = readline.question("Enter country name: ");

  // تحويل لو الاسم بالعربي
  if (countryMap[country]) country = countryMap[country];

  try {
    // لو حابب تستخدم بيانات تجريبية
    if (demoWeather[country]) {
      const w = demoWeather[country];
      console.log(`\n🌤 Weather Info for ${country}`);
      console.log(`🌡 Temperature: ${w.temp} °C`);
      console.log(`📍 Latitude: ${w.lat}`);
      console.log(`📍 Longitude: ${w.lon}`);
      return;
    }

    // لو عايز تستخدم API حقيقي uncomment السطور دي:
    /*
    console.log("\n⏳ Fetching data from API...");
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${API_KEY}&units=metric`);
    const data = response.data;
    console.log(`\n🌤 Weather Info for ${data.name}`);
    console.log(`🌡 Temperature: ${data.main.temp} °C`);
    console.log(`📍 Latitude: ${data.coord.lat}`);
    console.log(`📍 Longitude: ${data.coord.lon}`);
    */

  } catch (err) {
    if (err.response && err.response.status === 401) {
      console.log("❌ Invalid API Key أو لسه مفعلتش.");
    } else if (err.response && err.response.status === 404) {
      console.log("❌ Country not found.");
    } else {
      console.log("❌ Network error أو مشكلة في الاتصال.");
    }
  }
}

getWeather();