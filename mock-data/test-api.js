#!/usr/bin/env node

const http = require("http");

const BASE_URL = "http://localhost:3001";

// Test endpoints
const testEndpoints = [
  { method: "GET", path: "/api/zones", description: "Get all zones" },
  { method: "GET", path: "/api/devices", description: "Get all devices" },
  {
    method: "GET",
    path: "/api/user/permissions",
    description: "Get user permissions",
  },
  {
    method: "GET",
    path: "/api/themes/Orange",
    description: "Get Orange theme",
  },
  {
    method: "GET",
    path: "/api/i18n/pl",
    description: "Get Polish translations",
  },
  {
    method: "GET",
    path: "/api/geolocation/mock-locations",
    description: "Get mock locations",
  },
];

function makeRequest(method, path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "localhost",
      port: 3001,
      path: path,
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          resolve({ status: res.statusCode, data: json });
        } catch (error) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.end();
  });
}

async function testAPI() {
  console.log("🧪 Testing Mock API Endpoints...\n");

  for (const endpoint of testEndpoints) {
    try {
      const result = await makeRequest(endpoint.method, endpoint.path);
      const status = result.status === 200 ? "✅" : "❌";
      console.log(
        `${status} ${endpoint.method} ${endpoint.path} - ${endpoint.description}`
      );

      if (result.status === 200) {
        if (Array.isArray(result.data)) {
          console.log(`   📊 Returned ${result.data.length} items`);
        } else if (typeof result.data === "object") {
          console.log(
            `   📦 Returned object with keys: ${Object.keys(result.data).join(
              ", "
            )}`
          );
        }
      } else {
        console.log(`   ❌ Status: ${result.status}`);
      }
    } catch (error) {
      console.log(
        `❌ ${endpoint.method} ${endpoint.path} - Error: ${error.message}`
      );
    }
    console.log("");
  }

  // Test zone creation
  console.log("🧪 Testing Zone Creation...");
  try {
    const newZone = {
      name: "Test Zone",
      description: "Zone created by test script",
      type: "other",
      coordinates: {
        latitude: 52.2297,
        longitude: 21.0122,
        radius: 100,
      },
      address: "Test Address",
      isActive: true,
      notifications: {
        onEntry: true,
        onExit: true,
        sound: true,
        vibration: true,
      },
      devices: [],
      schedule: {
        enabled: true,
        activeHours: {
          start: "09:00",
          end: "17:00",
        },
        activeDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      },
      color: "#2C5282",
    };

    const createResult = await makeRequest(
      "POST",
      "/api/zones",
      JSON.stringify(newZone)
    );
    if (createResult.status === 201) {
      console.log("✅ Zone creation successful");
      console.log(`   📦 Created zone with ID: ${createResult.data.id}`);
    } else {
      console.log(
        `❌ Zone creation failed with status: ${createResult.status}`
      );
    }
  } catch (error) {
    console.log(`❌ Zone creation error: ${error.message}`);
  }

  console.log("\n🎉 API Testing Complete!");
}

// Check if server is running
http
  .get(`${BASE_URL}/api/zones`, (res) => {
    testAPI();
  })
  .on("error", (error) => {
    console.log(
      "❌ Mock server is not running! Please start it with: npm run mock-server"
    );
    console.log(`   Error: ${error.message}`);
  });
