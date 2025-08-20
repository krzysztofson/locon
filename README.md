# Family Safety / Location App (React Native + Web)

Cross‑platform (iOS / Android / Web) geofencing & family location management app with role‑based access control, theming, internationalization (EN/PL/DE) and a fully featured mock backend.

</div>

---

## 1. Overview

This project showcases a production‑style architecture for a location aware application:

- Geofenced Zones: create, edit, list, delete
- Role Based Access Control (RBAC): admin / user / viewer with UI guarding
- Multi‑language UI (i18next) with persistence & lazy loading
- Theming & Design System (light/dark/operator themes) with typed tokens
- Unified codebase running on React Native (mobile) and React Native Web (browser)
- Fully documented mock API (JSON Server + custom routes)
- TypeScript throughout for safety & DX

## 2. Key Features

| Domain  | Highlights                                                                                              |
| ------- | ------------------------------------------------------------------------------------------------------- |
| Zones   | 4‑step creation wizard, edit screen, list with empty & error states                                     |
| Map     | Native maps on mobile, Leaflet on web (shared abstraction)                                              |
| Auth    | SMS style (send / verify code) stubbed via mock API                                                     |
| RBAC    | Capability matrix (create/read/update/delete) enforced in UI helpers                                    |
| i18n    | EN / PL / DE resources, fallback, async storage persistence, runtime switching                          |
| Theming | Operator & base themes, tokens for color/spacing/typography, dark mode ready                            |
| State   | Redux Toolkit slices (auth, zones) + localized context and lightweight local state (Zustand for wizard) |
| UX      | Consistent design system components (Button, Text, Input, Card, Modal, Switch, Loader, IconButton)      |
| Tooling | Jest tests (utilities, i18n, RBAC), ESLint, TypeScript strictness                                       |

## 3. Tech Stack

Core:

- React 18 / React Native 0.72 / React Native Web
- TypeScript
- Redux Toolkit & React Redux
- Zustand (zone creator local workflow)
- i18next + react-i18next + async persistence
- react-native-maps (mobile) + Leaflet / react-leaflet (web)
- react-hook-form + zod (validation)

Tooling & Dev Experience:

- Jest + @testing-library/react-native / jest-native
- ESLint, Prettier, Type checking (tsc)
- Webpack (web target) + Metro (native)
- JSON Server (mock backend) with custom endpoints

## 4. Quick Start

```bash
# Install dependencies
npm install

# Run web + mock API concurrently (port 3001 for API)
npm run dev

# Run mobile (Metro) + mock API
npm run dev:mobile

# Individual targets
npm run web        # Web (webpack dev server)
npm start          # Metro bundler
npm run ios        # iOS (requires Xcode + simulator)
npm run android    # Android (emulator or device)

# Mock backend only
npm run mock-server

# Test API contract sample
node mock-data/test-api.js
```

## 5. Mock Backend

Implements all documented endpoints:

- `GET /api/zones` – list zones
- `POST /api/zones` – create
- `PUT /api/zones/:id` – update
- `DELETE /api/zones/:id` – delete
- `GET /api/devices` – device inventory
- `GET /api/user/permissions` – RBAC matrix
- `GET /api/themes/:operator` – themed color sets
- `GET /api/i18n/:lang` – remote translation bundle ({ translations })
- `POST /api/auth/send-code` / `POST /api/auth/verify-code` – auth flow stub

Sample data includes 3 zones, 4 devices, 3 roles, 5 themes, and 3 languages centered around Warsaw coordinates.

Further details: see `mock-data/README.md`.

## 6. Internationalization

- Local resource bundles (`en`, `pl`, `de`)
- Fallback language: `en`
- Persisted selection via AsyncStorage
- Runtime language switching (Settings screen)
- Namespaced key structure with consistent prefixes (zones._, auth._, common._, settings._)
- Defensive `t(key, { defaultValue })` usage for resiliency

## 7. RBAC Model

Defined in `modules/auth/rbac.ts`:

```ts
roleCapabilities = {
  admin: { zones: { create: true, read: true, update: true, delete: true } },
  user: { zones: { create: true, read: true, update: true, delete: true } },
  viewer: {
    zones: { create: false, read: true, update: false, delete: false },
  },
};
```

Helpers: `can(user, action, resource)`, `isAdmin`, `isUser`, `isViewer`.
Used to drive conditional rendering (buttons, navigation paths, destructive actions).

## 8. Design System & Theming

- Token file: `theme/tokens.ts`
- Provider: `theme/ThemeProvider.tsx`
- Supports operator themes (Orange, Play, T-Mobile, Plus) + base
- Components consume typed theme via props & styled primitives
- Consistent radii (cards: 12, buttons: 8) & color palette (#2C5282 primary, #50C878 success, #FF6B6B danger)
- Components live under `components/themed/` – each with explicit prop types

More: `components/themed/README.md`.

## 9. Architecture

Layered, modular structure:

- `app/` navigation & screen composition
- `modules/` feature domains (auth, zones)
- `services/` cross‑cutting integrations (api, location/geofencing)
- `state/` Redux store & slices
- `theme/` design system & tokens
- `i18n/` translation config + provider
- `utils/` pure functions (validation, formatting, helpers)
- `mock-data/` local API

### Directory Snapshot

```
src/
    app/
    modules/
    services/
    state/
    theme/
    components/
    i18n/
    utils/
    __tests__/
mock-data/
```

## 10. State Management

- Redux Toolkit for global auth & zones domain state
- Async thunks (where applicable) hitting mock API
- Local transient UI flows (zone creation wizard) use lightweight Zustand store
- Selective context providers: i18n, Theme

## 11. Forms & Validation

- `react-hook-form` for performant form state
- `zod` schemas for declarative validation (see `utils/validation.ts`)
- Error messages surfaced via localized strings

## 12. Mapping Layer

- Mobile: `react-native-maps` (downgraded for peer compatibility)
- Web: `Leaflet` + `react-leaflet`
- Shared abstraction component isolates platform specifics

## 13. Testing

- Jest configured with React Native preset
- Setup file: `src/tests/setup.ts`
- Current suites (20 tests): utilities (formatting, helpers, validation), i18n behavior, RBAC permissions
- Extend by adding `.test.ts(x)` under `src/__tests__/`

Run:

```bash
npm test
```

## 14. Development Scripts

| Script                    | Purpose                                     |
| ------------------------- | ------------------------------------------- |
| `npm run dev`             | Web + mock backend concurrently             |
| `npm run dev:mobile`      | Metro + mock backend                        |
| `npm run web`             | Web dev server                              |
| `npm start`               | Metro bundler                               |
| `npm run ios` / `android` | Launch native app (env prerequisites apply) |
| `npm run mock-server`     | Start mock API only                         |
| `npm run type-check`      | TypeScript project check                    |
| `npm run lint`            | ESLint validation                           |
| `npm test`                | Jest test suites                            |
| `npm run build:web`       | Production web build                        |

## 15. Extensibility Ideas (Roadmap)

- Real authentication & refresh token rotation
- Device live location streaming (WebSocket)
- Push notifications integration
- Offline caching & optimistic updates
- Accessibility audit & enhancements (talkback/voiceover)
- E2E tests (Detox / Playwright)
- CI pipeline (lint/type/test) + coverage gating

## 16. Contributing

1. Fork & branch from `main`
2. `npm install`
3. Make changes with tests
4. Ensure: `npm run lint && npm run type-check && npm test`
5. Open PR with concise description

## 17. Troubleshooting

| Issue                     | Tip                                                      |
| ------------------------- | -------------------------------------------------------- |
| Metro cache oddities      | `rm -rf $TMPDIR/metro-* && npm start --reset-cache`      |
| iOS build fails (pods)    | Run from `ios/`: `pod install` (if native modules added) |
| Translations missing      | Ensure key exists or rely on `defaultValue` fallback     |
| Map not displaying on web | Check Leaflet CSS inclusion & dev console errors         |
