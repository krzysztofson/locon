const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("mock-data/db.json");
const middlewares = jsonServer.defaults();

// Add custom middleware
server.use(middlewares);

// Add custom routes before JSON Server router
server.use(jsonServer.bodyParser);

// Custom routes for API endpoints
server.get("/api/zones", (req, res) => {
  const db = router.db;
  const zones = db.get("zones").value();
  res.json(zones);
});

server.post("/api/zones", (req, res) => {
  const db = router.db;
  const newZone = {
    id: `zone-${Date.now()}`,
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "user-admin",
  };

  db.get("zones").push(newZone).write();
  res.status(201).json(newZone);
});

server.put("/api/zones/:id", (req, res) => {
  const db = router.db;
  const zoneId = req.params.id;
  const updatedZone = {
    ...req.body,
    id: zoneId,
    updatedAt: new Date().toISOString(),
  };

  const zone = db.get("zones").find({ id: zoneId }).assign(updatedZone).write();

  if (zone) {
    res.json(zone);
  } else {
    res.status(404).json({ error: "Zone not found" });
  }
});

server.delete("/api/zones/:id", (req, res) => {
  const db = router.db;
  const zoneId = req.params.id;
  const removedZone = db.get("zones").remove({ id: zoneId }).write();

  if (removedZone.length > 0) {
    res.status(200).json({ message: "Zone deleted successfully" });
  } else {
    res.status(404).json({ error: "Zone not found" });
  }
});

server.get("/api/devices", (req, res) => {
  const db = router.db;
  const devices = db.get("devices").value();
  res.json(devices);
});

server.get("/api/user/permissions", (req, res) => {
  const db = router.db;
  const user = db.get("user").value();
  res.json(user.permissions);
});

server.get("/api/themes/:operator", (req, res) => {
  const db = router.db;
  const operator = req.params.operator;
  const themes = db.get("themes").value();

  if (themes[operator]) {
    res.json(themes[operator]);
  } else {
    res.json(themes.default);
  }
});

server.get("/api/i18n/:lang", (req, res) => {
  const db = router.db;
  const lang = req.params.lang;
  const i18n = db.get("i18n").value();

  if (i18n[lang]) {
    res.json(i18n[lang]);
  } else {
    res.json(i18n.pl); // Default to Polish
  }
});

// Mock geolocation endpoints
server.get("/api/geolocation/mock-locations", (req, res) => {
  const db = router.db;
  const locations = db.get("geolocation.mockLocations").value();
  res.json(locations);
});

server.get("/api/geolocation/mock-route/:deviceId", (req, res) => {
  const db = router.db;
  const deviceId = req.params.deviceId;
  const route = db.get("geolocation.mockRoute").value();

  if (route.deviceId === deviceId) {
    res.json(route);
  } else {
    res.status(404).json({ error: "Route not found for device" });
  }
});

// Device location update
server.post("/api/devices/:id/location", (req, res) => {
  const db = router.db;
  const deviceId = req.params.id;
  const { latitude, longitude, accuracy } = req.body;

  const device = db.get("devices").find({ id: deviceId }).value();

  if (device) {
    const updatedDevice = db
      .get("devices")
      .find({ id: deviceId })
      .assign({
        location: {
          latitude,
          longitude,
          accuracy,
          timestamp: new Date().toISOString(),
        },
        lastSeen: new Date().toISOString(),
      })
      .write();

    res.json(updatedDevice);
  } else {
    res.status(404).json({ error: "Device not found" });
  }
});

// Authentication mock endpoints
server.post("/api/auth/send-code", (req, res) => {
  const { phoneNumber } = req.body;

  // Mock SMS code sending
  console.log(`Sending verification code to ${phoneNumber}`);

  res.json({
    success: true,
    message: "Verification code sent",
    expiresIn: 300, // 5 minutes
  });
});

server.post("/api/auth/verify-code", (req, res) => {
  const { phoneNumber, code } = req.body;

  // Mock code verification (accept any 4-digit code for demo)
  if (code && code.length === 4) {
    const db = router.db;
    const user = db.get("user").value();

    res.json({
      success: true,
      user: user,
      token: "mock-jwt-token-" + Date.now(),
    });
  } else {
    res.status(400).json({
      success: false,
      error: "Invalid verification code",
    });
  }
});

// Add CORS headers
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Use default router for other routes
server.use("/api", router);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Mock API Server is running on port ${PORT}`);
  console.log(`📡 Available endpoints:`);
  console.log(`   GET/POST  http://localhost:${PORT}/api/zones`);
  console.log(`   PUT       http://localhost:${PORT}/api/zones/:id`);
  console.log(`   DELETE    http://localhost:${PORT}/api/zones/:id`);
  console.log(`   GET       http://localhost:${PORT}/api/devices`);
  console.log(`   GET       http://localhost:${PORT}/api/user/permissions`);
  console.log(`   GET       http://localhost:${PORT}/api/themes/:operator`);
  console.log(`   GET       http://localhost:${PORT}/api/i18n/:lang`);
  console.log(`   POST      http://localhost:${PORT}/api/auth/send-code`);
  console.log(`   POST      http://localhost:${PORT}/api/auth/verify-code`);
  console.log(
    `   GET       http://localhost:${PORT}/api/geolocation/mock-locations`
  );
  console.log(
    `   GET       http://localhost:${PORT}/api/geolocation/mock-route/:deviceId`
  );
  console.log(`   POST      http://localhost:${PORT}/api/devices/:id/location`);
  console.log(
    `📊 Mock data: 3 zones, 4 devices, 3 roles, 3 languages, 5 themes`
  );
});
