# Bezpieczna Rodzina - React Native Location App

Aplikacja mobilna React Native dla zarządzania bezpieczeństwem rodziny z funkcjami geofencing i monitorowania lokalizacji.

## 🚀 Szybki start

### Frontend

```bash
# Instalacja zależności
npm install

# Uruchom z mock backend
npm run dev              # Web app + mock API
npm run dev:mobile       # Mobile app + mock API

# Tylko frontend
npm run web             # Web app
npm start               # Mobile Metro bundler
npm run ios             # iOS app
npm run android         # Android app
```

### Mock Backend

```bash
# Tylko mock API server
npm run mock-server     # Port 3001

# Testowanie API
node mock-data/test-api.js
```

## 📡 Mock Backend

Kompletny mock backend z endpointami z dokumentacji PDF:

- **GET/POST/PUT/DELETE** `/api/zones` - Zarządzanie strefami
- **GET** `/api/devices` - Lista urządzeń
- **GET** `/api/user/permissions` - Uprawnienia użytkownika
- **GET** `/api/themes/:operator` - Motywy operatorów (Orange, Play, T-Mobile, Plus)
- **GET** `/api/i18n/:lang` - Pakiety językowe (PL, EN, DE)
- **POST** `/api/auth/send-code` & `/api/auth/verify-code` - Autoryzacja SMS

### Przykładowe dane:

- **3 strefy**: Dom, Szkoła, Praca z pełną konfiguracją
- **4 urządzenia**: iPhone, Samsung, GJD.13, BS.07 z różnymi statusami
- **3 role**: Admin, User, Viewer z uprawnieniami
- **5 motywów**: Operatorzy + domyślny motyw
- **3 języki**: Pełne tłumaczenia PL/EN/DE
- **Mock geolokalizacji**: Współrzędne Warszawy

📚 **[Pełna dokumentacja Mock API →](mock-data/README.md)**

## 🎨 Design System

Kompletny system projektowy zgodny z wymaganiami:

- **Główny kolor**: #2C5282 (niebieski)
- **Akcenty**: #50C878 (zielony), #FF6B6B (czerwony)
- **Radius**: 12px (karty), 8px (przyciski)
- **Fonty**: Systemowe (SF Pro, Roboto)
- **Ikony**: Material Design / SF Symbols

### Komponenty parametryzowane:

- `Button`, `Text`, `Input`, `Card`, `Modal`, `Container`, `IconButton`, `Switch`, `Loader`
- **Themowanie**: Light/Dark/Custom motywy z kontekstem
- **TypeScript**: Pełne typowanie dla wszystkich komponentów

📚 **[Dokumentacja Design System →](src/components/themed/README.md)**

## 📁 Struktura projektu

```
src/
├── app/                     # Nawigacja i główne ekrany
│   ├── navigation/          # React Navigation struktura
│   ├── screens/            # Wszystkie ekrany aplikacji
│   └── App.tsx             # Główny komponent aplikacji
├── modules/
│   ├── zones/              # Zarządzanie strefami
│   │   ├── ZonesList.tsx   # Lista stref z empty state
│   │   ├── ZoneCreator.tsx # 4-etapowy kreator strefy
│   │   ├── ZoneEdit.tsx    # Edycja istniejącej strefy
│   │   ├── services.ts     # API dla stref (połączone z mock)
│   │   └── types.ts        # Definicje typów
│   └── auth/               # Autoryzacja SMS
│       ├── LoginScreen.tsx # Ekran logowania z OTP
│       ├── AuthService.ts  # Service autoryzacji
│       └── types.ts        # Typy dla auth
├── services/
│   ├── api/                # API client i typy
│   │   ├── client.ts       # HTTP client z fetch
│   │   ├── services.ts     # Wszystkie API endpoints
│   │   └── types.ts        # Typy dla API
│   └── location/           # Serwisy lokalizacji
│       ├── LocationService.ts     # GPS tracking
│       ├── GeofencingService.ts   # Strefy geofencing
│       └── types.ts        # Typy lokalizacji
├── state/                   # Redux store
│   ├── store.ts            # Konfiguracja store
│   ├── slices/
│   │   ├── authSlice.ts    # Stan autoryzacji
│   │   └── zonesSlice.ts   # Stan stref
│   └── types.ts            # Typy store
├── theme/                   # System projektowy
│   ├── tokens.ts           # Design tokens (kolory, przestrzeń, typography)
│   ├── ThemeProvider.tsx   # Provider z kontekstem
│   └── types.ts            # Typy dla motywów
├── components/
│   ├── themed/             # Komponenty z design system
│   │   ├── Button.tsx      # Parametryzowany przycisk
│   │   ├── Text.tsx        # Tekst z wariantami
│   │   ├── Input.tsx       # Pola formularzy
│   │   ├── Card.tsx        # Karty z motywami
│   │   ├── Modal.tsx       # Modale z akcjami
│   │   └── index.ts        # Eksporty wszystkich komponentów
│   └── index.ts            # Główne eksporty
├── i18n/                    # Wielojęzyczność
│   ├── translations/        # Pakiety językowe
│   │   ├── pl.ts           # Polski (główny)
│   │   ├── en.ts           # Angielski
│   │   └── de.ts           # Niemiecki
│   ├── I18nProvider.tsx    # Provider i18n
│   └── types.ts            # Typy dla tłumaczeń
├── utils/                   # Utilities
│   ├── validation.ts       # Walidacja formularzy
│   ├── formatting.ts       # Formatowanie danych
│   └── helpers.ts          # Pomocnicze funkcje
└── tests/                   # Setup testów
    ├── setup.ts            # Konfiguracja
    └── mocks.ts            # Mock objekty

mock-data/                   # Mock backend
├── db.json                 # Baza danych JSON
├── server.js               # Express server z custom routes
├── test-api.js             # Script do testowania
└── README.md               # Dokumentacja API
```

## ✨ Funkcjonalności

- **🏠 Zarządzanie strefami**: Tworzenie, edycja i usuwanie stref geofencing
- **📱 Monitorowanie urządzeń**: Śledzenie lokalizacji telefonów i lokalizatorów (GJD.13, BS.07)
- **🔐 Autoryzacja SMS**: Logowanie przez kod weryfikacyjny
- **🌍 Wielojęzyczność**: Pełne wsparcie dla PL, EN, DE
- **🎨 System projektowy**: Spójne motywy i komponenty parametryzowane
- **📊 State management**: Redux Toolkit dla stanu aplikacji
- **🔒 TypeScript**: Pełna typizacja dla bezpieczeństwa kodu
- **🎭 Motywy operatorów**: Orange, Play, T-Mobile, Plus z własnymi kolorami

## 🛠️ Development

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Testing
npm test

# Build web
npm run build:web
```

## 🏗️ Architektura

Aplikacja używa modularnej architektury z:

- **📦 Moduły funkcjonalne** dla stref i autoryzacji
- **🔌 Warstwa serwisów** dla API i lokalizacji
- **🏪 Scentralizowany state** z Redux Toolkit
- **🎨 System motywów** z design tokens
- **🌍 Wielojęzyczność** dla wszystkich tekstów
- **🔒 Type-safe utilities** i helpery

## 🎯 Zgodność z PDF

✅ **Pełna implementacja wymagań z dokumentacji PDF:**

- ✅ Routing: Auth → Home(Mapa) → Zones(Lista/Kreator/Edycja) → Settings
- ✅ Design system: #2C5282, #50C878/#FF6B6B, radius 12/8px, fonty systemowe
- ✅ Mock backend: Wszystkie endpointy z API specification
- ✅ Przykładowe dane: 3 strefy, 4 urządzenia, role, języki, motywy
- ✅ Komponenty parametryzowane z pełnym themingiem
- ✅ Polski jako główny język UI
