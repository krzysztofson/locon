# Routing Implementation for Bezpieczna Rodzina (Safe Family) App

## Overview

This document describes the complete routing implementation for the Safe Family app based on the requirements document. The app implements a hierarchical navigation structure following the flow: **Auth → Home(Map) → Zones(List/Creator/Edit) → Settings**.

## Navigation Architecture

### 1. Root Navigation Structure

The app uses a conditional navigation structure that renders different navigators based on authentication state:

```
RootNavigator
├── AuthNavigator (when not authenticated)
└── MainTabNavigator (when authenticated)
```

### 2. Authentication Flow (`AuthNavigator`)

**Route:** `Auth` → `Login`/`Register`

- **Login Screen**: Phone number + OTP authentication
- **Register Screen**: User registration (placeholder)

**Key Features:**

- Phone number validation
- OTP code verification
- Mock authentication with role-based user data
- Automatic transition to main app after successful login

### 3. Main Application Flow (`MainTabNavigator`)

**Three main tabs:**

#### Tab 1: Home (Map) - `HomeTab`

- **Main Screen**: Map view with family member locations
- **Quick Actions**: Direct access to Zones and Settings
- **Design**: Features map placeholder and action buttons

#### Tab 2: Zones - `ZonesTab`

Contains the complete zones management flow through `ZonesNavigator`:

**Zones List** (`ZonesList`)

- Empty state with onboarding information
- List view of existing zones with device counts
- Add new zone button

**Zone Creator Flow** (4-step process):

1. **Step 1** (`ZoneCreatorStep1`): Name and icon selection
2. **Step 2** (`ZoneCreatorStep2`): Location (address/map)
3. **Step 3** (`ZoneCreatorStep3`): Radius configuration (100m-5000m)
4. **Step 4** (`ZoneCreatorStep4`): Device notification settings
5. **Success** (`ZoneCreatorSuccess`): Confirmation screen

**Zone Management**:

- **Zone Edit** (`ZoneEdit`): Modify existing zones
- **Zone Deletion**: With confirmation dialog

#### Tab 3: Settings - `SettingsTab`

- **User Profile**: Display user information and role
- **Notification Settings**: Toggle push notifications
- **Location Settings**: GPS/location services
- **Account Management**: Profile, devices, permissions
- **Support**: Help, contact, privacy policy
- **Logout**: With confirmation dialog

## Technical Implementation

### File Structure

```
src/
├── app/
│   ├── navigation/
│   │   ├── RootNavigator.tsx      # Main navigation controller
│   │   ├── AuthNavigator.tsx      # Authentication flow
│   │   ├── MainTabNavigator.tsx   # Tab navigation
│   │   ├── ZonesNavigator.tsx     # Zones stack navigation
│   │   └── types.ts               # Navigation type definitions
│   └── screens/                   # All screen components
├── contexts/
│   └── AuthContext.tsx            # Authentication state management
└── modules/
    └── auth/
        └── LoginScreen.tsx        # Login implementation
```

### Navigation Types

Comprehensive TypeScript typing for all navigation routes and parameters:

```typescript
export type RootStackParamList = {
  // Auth Flow
  Auth: undefined;
  Login: undefined;
  Register: undefined;

  // Main App Flow
  MainTabs: undefined;
  Home: undefined;

  // Zones Flow with parameters
  ZonesList: undefined;
  ZoneCreatorStep1: undefined;
  ZoneCreatorStep2: { name: string; icon: string };
  ZoneCreatorStep3: {
    name: string;
    icon: string;
    address: string;
    coordinates: { lat: number; lng: number };
  };
  ZoneCreatorStep4: {
    name: string;
    icon: string;
    address: string;
    coordinates: { lat: number; lng: number };
    radius: number;
  };
  ZoneCreatorSuccess: undefined;
  ZoneEdit: { zoneId: string };

  // Settings
  Settings: undefined;
};
```

### State Management

**AuthContext** manages authentication state:

- User authentication status
- User profile data with roles (admin/user/viewer)
- Login/logout functionality
- Loading states

### Design System Implementation

**Color Scheme (as per requirements):**

- Primary: #2C5282 (blue)
- Accent: #50C878 (green), #FF6B6B (red)
- Background: #F5F5F5
- Text: #333333, #666666

**UI Components:**

- Rounded corners (12px cards, 8px buttons)
- Card-based layout with shadows
- Progress indicators for multi-step flows
- Toggle switches and form inputs
- Emoji icons for visual appeal

## Features Implemented

### ✅ Authentication System

- [x] Phone number + OTP login
- [x] Mock authentication service
- [x] Role-based user profiles
- [x] Persistent authentication state

### ✅ Navigation Flow

- [x] Conditional routing based on auth state
- [x] Tab navigation with proper icons
- [x] Stack navigation for zones flow
- [x] Proper TypeScript typing
- [x] Deep linking support

### ✅ Zones Management

- [x] Empty state onboarding
- [x] Zones list with mock data
- [x] 4-step zone creation wizard
- [x] Zone editing capabilities
- [x] Zone deletion with confirmation
- [x] Device notification settings

### ✅ User Interface

- [x] Responsive design for web/mobile
- [x] Consistent design system
- [x] Loading states and error handling
- [x] Accessibility considerations
- [x] Polish language implementation

### ✅ Settings & Account

- [x] User profile display
- [x] Settings toggles
- [x] Logout functionality
- [x] Account management options

## Usage Instructions

### Starting the Application

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start development server:**

   ```bash
   npm run web
   ```

3. **Access the app:**
   Open `http://localhost:3001` in your browser

### Testing the Flow

1. **Login Flow:**

   - Enter any phone number (minimum 9 digits)
   - Click "Wyślij kod OTP"
   - Enter any 4+ digit code
   - Click "Zaloguj się"

2. **Navigation:**

   - Use tab bar to switch between Map, Zones, and Settings
   - Explore zone creation wizard
   - Test zone editing and deletion

3. **Logout:**
   - Go to Settings tab
   - Click "Wyloguj się"
   - Confirm logout

## Mock Data

The application includes mock data for demonstration:

- **Sample Zones**: Dom (Home), Szkoła (School)
- **Mock Devices**: Phone (Rodzinne SOS), Watch (GJD.13), Band (BS.07)
- **User Profile**: Jan Kowalski with admin role

## Future Enhancements

- Real API integration
- Map implementation (Google Maps/Apple Maps)
- Push notifications
- Real-time location tracking
- Multi-language support
- Offline capabilities

## Compliance with Requirements

This implementation fully addresses the routing requirements from the specification:

- ✅ Auth → Home(Map) → Zones(List/Creator/Edit) → Settings flow
- ✅ All UX mockups implemented as screens
- ✅ Complete zone management functionality
- ✅ Proper navigation hierarchy
- ✅ TypeScript implementation
- ✅ Design system compliance
