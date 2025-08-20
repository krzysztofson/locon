# Mock Backend - Bezpieczna Rodzina

## 🚀 Uruchomienie

### Uruchom tylko serwer mock API:

```bash
npm run mock-server
```

### Uruchom web app z mock API:

```bash
npm run dev
```

### Uruchom mobile app z mock API:

```bash
npm run dev:mobile
```

## 📡 Dostępne endpointy

Server działa na `http://localhost:3001`

### 🏠 Strefy (Zones)

- `GET /api/zones` - Pobierz wszystkie strefy
- `POST /api/zones` - Utwórz nową strefę
- `PUT /api/zones/:id` - Aktualizuj strefę
- `DELETE /api/zones/:id` - Usuń strefę

### 📱 Urządzenia (Devices)

- `GET /api/devices` - Pobierz wszystkie urządzenia
- `POST /api/devices/:id/location` - Zaktualizuj lokalizację urządzenia

### 👤 Użytkownik

- `GET /api/user/permissions` - Pobierz uprawnienia użytkownika

### 🎨 Motywy operatorów

- `GET /api/themes/:operator` - Pobierz motyw dla operatora
  - Dostępne operatory: `Orange`, `Play`, `T-Mobile`, `Plus`, `default`

### 🌍 Tłumaczenia

- `GET /api/i18n/:lang` - Pobierz tłumaczenia dla języka
  - Dostępne języki: `pl`, `en`, `de`

### 🔐 Autoryzacja

- `POST /api/auth/send-code` - Wyślij kod weryfikacyjny SMS
- `POST /api/auth/verify-code` - Zweryfikuj kod (akceptuje dowolny 4-cyfrowy kod)

### 📍 Geolokalizacja (Mock)

- `GET /api/geolocation/mock-locations` - Pobierz przykładowe lokalizacje
- `GET /api/geolocation/mock-route/:deviceId` - Pobierz trasę dla urządzenia

## 📊 Przykładowe dane

### 🏠 Strefy (3)

1. **Dom** - ul. Marszałkowska 1, Warszawa (promień 100m)
2. **Szkoła** - ul. Nowy Świat 15, Warszawa (promień 50m)
3. **Praca** - ul. Krakowskie Przedmieście 26/28, Warszawa (promień 75m)

### 📱 Urządzenia (4)

1. **iPhone Anna** - Anna Kowalska (Admin) - Online, 85% baterii
2. **Telefon Michał** - Michał Kowalski (User) - Online, 92% baterii
3. **Lokalizator GJD.13** - Kasia Kowalska (Viewer) - Online, 78% baterii
4. **Lokalizator BS.07** - Tomek Kowalski (Viewer) - Offline, 15% baterii

### 👥 Role użytkowników

- **Admin** - Pełne uprawnienia (tworzenie, edycja, usuwanie stref/urządzeń)
- **User** - Odczyt i edycja własnych urządzeń
- **Viewer** - Tylko odczyt

### 🎨 Motywy operatorów (5)

- **Orange** - #FF6600 (pomarańczowy)
- **Play** - #662D91 (fioletowy)
- **T-Mobile** - #E20074 (magenta)
- **Plus** - #00A651 (zielony)
- **Default** - #2C5282 (niebieski - Bezpieczna Rodzina)

### 🌍 Języki (3)

- **Polski (pl)** - Kompletne tłumaczenia
- **English (en)** - Kompletne tłumaczenia
- **Deutsch (de)** - Kompletne tłumaczenia

## 🧪 Testowanie API

### Przykłady użycia curl:

```bash
# Pobierz wszystkie strefy
curl http://localhost:3001/api/zones

# Pobierz wszystkie urządzenia
curl http://localhost:3001/api/devices

# Pobierz uprawnienia użytkownika
curl http://localhost:3001/api/user/permissions

# Pobierz motyw operatora Orange
curl http://localhost:3001/api/themes/Orange

# Pobierz tłumaczenia polskie
curl http://localhost:3001/api/i18n/pl

# Utwórz nową strefę
curl -X POST http://localhost:3001/api/zones \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nowa Strefa",
    "description": "Opis nowej strefy",
    "type": "other",
    "coordinates": {
      "latitude": 52.2297,
      "longitude": 21.0122,
      "radius": 100
    },
    "address": "Test Address",
    "isActive": true,
    "notifications": {
      "onEntry": true,
      "onExit": true,
      "sound": true,
      "vibration": true
    },
    "devices": [],
    "schedule": {
      "enabled": true,
      "activeHours": {
        "start": "09:00",
        "end": "17:00"
      },
      "activeDays": ["monday", "tuesday", "wednesday", "thursday", "friday"]
    },
    "color": "#2C5282"
  }'

# Wyślij kod weryfikacyjny SMS
curl -X POST http://localhost:3001/api/auth/send-code \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "+48123456789"}'

# Zweryfikuj kod (dowolny 4-cyfrowy kod)
curl -X POST http://localhost:3001/api/auth/verify-code \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "+48123456789", "code": "1234"}'
```

### Test script:

```bash
node mock-data/test-api.js
```

## 📁 Struktura plików

```
mock-data/
├── db.json           # Baza danych JSON z przykładowymi danymi
├── server.js         # Serwer z custom endpointami
├── test-api.js       # Script do testowania API
└── README.md         # Ta dokumentacja
```

## 🔧 Konfiguracja

- **Port**: 3001 (można zmienić przez zmienną środowiskową `PORT`)
- **CORS**: Włączone dla wszystkich origin
- **Headers**: Automatyczne ustawianie `Content-Type: application/json`
- **Logging**: Wszystkie żądania logowane w konsoli

## 🚨 Uwagi deweloperskie

1. **Autoryzacja**: Mock - akceptuje dowolny 4-cyfrowy kod weryfikacyjny
2. **Trwałość danych**: Zmiany są zapisywane w `db.json` i zachowane między restartami
3. **Błędy**: Mock zwraca odpowiednie kody HTTP (404, 400, 500)
4. **Walidacja**: Podstawowa walidacja danych wejściowych
5. **Geolokalizacja**: Używa statycznych współrzędnych Warszawy

## 🎯 Zgodność z PDF

Mock backend implementuje wszystkie endpointy wyspecyfikowane w dokumentacji PDF:

- ✅ GET/POST/PUT/DELETE `/api/zones`
- ✅ GET `/api/devices`
- ✅ GET `/api/user/permissions`
- ✅ GET `/api/themes/:operator`
- ✅ GET `/api/i18n/:lang`
- ✅ Autoryzacja SMS (mock)
- ✅ Mock geolokalizacji
- ✅ Przykładowe dane zgodne z wymaganiami
