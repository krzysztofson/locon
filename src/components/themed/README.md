# Design System - Bezpieczna Rodzina

Kompletny system projektowy dla aplikacji mobilnej "Bezpieczna Rodzina" oparty na specyfikacji:

- **Główny kolor**: #2C5282 (niebieski)
- **Akcenty**: #50C878 (zielony), #FF6B6B (czerwony)
- **Radius**: 12px (karty), 8px (przyciski)
- **Fonty**: Systemowe (SF Pro na iOS, Roboto na Android)
- **Ikony**: Material Design / SF Symbols

## 🎨 Tokeny projektowe

### Kolory

```typescript
// Główny kolor marki
primary: #2C5282

// Kolory akcentowe
success: #50C878  // Pozytywne akcje
error: #FF6B6B    // Błędy i ostrzeżenia

// Neutralne
gray: 50-900      // Skalowane odcienie szarości
white: #FFFFFF
black: #000000
```

### Przestrzeń

```typescript
spacing: {
  xs: 4,   sm: 8,   md: 12,  lg: 16,  xl: 20,
  xxl: 24, xxxl: 32, xxxxl: 40, xxxxxl: 48
}
```

### Typografia

```typescript
fontSize: {
  xs: 12, sm: 14, base: 16, lg: 18, xl: 20,
  '2xl': 24, '3xl': 28, '4xl': 32, '5xl': 36
}

fontWeight: {
  light: 300, normal: 400, medium: 500,
  semibold: 600, bold: 700, extrabold: 800
}
```

### Radius

```typescript
borderRadius: {
  none: 0, sm: 4, base: 8,    // Przyciski
  md: 12,                     // Karty
  lg: 16, xl: 20, full: 9999
}
```

## 🧱 Komponenty parametryzowane

### Button

```typescript
<Button
  variant="primary" | "secondary" | "success" | "error" | "outline"
  size="sm" | "md" | "lg"
  disabled={boolean}
  loading={boolean}
  title="Tekst przycisku"
  onPress={() => {}}
/>
```

### Text

```typescript
<Text
  variant="h1" | "h2" | "h3" | "h4" | "body" | "caption" | "label"
  color="primary" | "secondary" | "tertiary" | "inverse" | "success" | "error"
  weight="light" | "normal" | "medium" | "semibold" | "bold"
  size="xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl"
  align="left" | "center" | "right" | "justify"
>
  Treść tekstu
</Text>
```

### Input

```typescript
<Input
  variant="default" | "filled" | "outline"
  size="sm" | "md" | "lg"
  state="default" | "error" | "success"
  placeholder="Wprowadź tekst"
  label="Etykieta"
  error="Komunikat błędu"
  disabled={boolean}
  multiline={boolean}
  value={value}
  onChangeText={setValue}
/>
```

### Card

```typescript
<Card
  variant="default" | "elevated" | "outlined"
  padding="sm" | "md" | "lg"
  style={customStyles}
>
  <Text>Zawartość karty</Text>
</Card>
```

### IconButton

```typescript
<IconButton
  variant="primary" | "secondary" | "ghost" | "danger"
  size="sm" | "md" | "lg"
  icon={<IconComponent />}
  onPress={() => {}}
  disabled={boolean}
/>
```

### Modal

```typescript
<Modal
  visible={isVisible}
  title="Tytuł modala"
  size="sm" | "md" | "lg" | "full"
  onClose={() => setVisible(false)}
  dismissOnBackdrop={true}
  showCloseButton={true}
  footerActions={[
    { label: "Anuluj", onPress: handleCancel, variant: "secondary" },
    { label: "Zapisz", onPress: handleSave, variant: "primary" }
  ]}
>
  <Text>Zawartość modala</Text>
</Modal>
```

### Container

```typescript
<Container
  padding="sm" | "md" | "lg" | "xl"
  background="primary" | "secondary" | "surface" | "transparent"
  scrollable={boolean}
  safeArea={boolean}
  centered={boolean}
>
  {children}
</Container>
```

### Switch

```typescript
<Switch
  value={isEnabled}
  onValueChange={setEnabled}
  size="sm" | "md" | "lg"
  disabled={boolean}
/>
```

### Loader

```typescript
<Loader
  size="small" | "large"
  color="primary" | "secondary" | "white"
  message="Ładowanie danych..."
  overlay={boolean}
/>
```

## 🎭 Themowanie

### Provider

```typescript
import { ThemeProvider } from "./src/theme/ThemeProvider";

function App() {
  return (
    <ThemeProvider variant="light">
      <YourApp />
    </ThemeProvider>
  );
}
```

### Hook użycia

```typescript
import { useTheme, useThemeVariant } from "./src/components/themed";

function MyComponent() {
  const { theme } = useTheme();
  const themeVariant = useThemeVariant();

  return (
    <View
      style={{
        backgroundColor: themeVariant.surface,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
      }}
    >
      <Text style={{ color: themeVariant.text }}>Themed component</Text>
    </View>
  );
}
```

### Warianty tematów

```typescript
// Jasny motyw (domyślny)
<ThemeProvider variant="light">

// Ciemny motyw
<ThemeProvider variant="dark">

// Niestandardowy motyw
<ThemeProvider
  variant="custom"
  customVariant={{
    primary: '#custom-color',
    background: '#custom-bg'
  }}
>
```

## 📁 Struktura plików

```
src/
├── theme/
│   ├── tokens.ts          # Tokeny projektowe
│   ├── types.ts           # Definicje typów
│   ├── ThemeProvider.tsx  # Provider kontekstu
│   └── index.ts          # Eksporty
├── components/
│   ├── themed/           # Komponenty z systemem projektowym
│   │   ├── Button.tsx
│   │   ├── Text.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Container.tsx
│   │   ├── IconButton.tsx
│   │   ├── Switch.tsx
│   │   ├── Loader.tsx
│   │   └── index.ts
│   └── index.ts          # Główne eksporty komponentów
```

## 🚀 Użycie w projekcie

1. **Import komponentów**:

```typescript
import { Button, Text, Card, Container } from "./src/components/themed";
```

2. **Użycie w ekranach**:

```typescript
function HomeScreen() {
  return (
    <Container>
      <Card>
        <Text variant="h2">Witaj w aplikacji</Text>
        <Text variant="body" color="secondary">
          Zarządzaj bezpieczeństwem swojej rodziny
        </Text>
        <Button variant="primary" title="Rozpocznij" onPress={handleStart} />
      </Card>
    </Container>
  );
}
```

3. **Niestandardowe style z tematami**:

```typescript
function CustomComponent() {
  const { theme } = useTheme();
  const themeVariant = useThemeVariant();

  return (
    <View
      style={{
        backgroundColor: themeVariant.surface,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.lg,
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: theme.borderRadius.sm,
      }}
    >
      {/* Zawartość */}
    </View>
  );
}
```

## ✅ Zalety systemu

- **Spójność**: Wszystkie komponenty używają tych samych tokenów
- **Parametryzacja**: Łatwa konfiguracja wariantów komponentów
- **Themowanie**: Wsparcie dla jasnych/ciemnych motywów
- **TypeScript**: Pełne typowanie dla bezpieczeństwa
- **Wydajność**: Optymalizowane re-renderowanie
- **Łatwość użycia**: Intuicyjne API komponentów
- **Zgodność**: Spełnia wymagania UX aplikacji "Bezpieczna Rodzina"
