import React from "react";
import { View } from "react-native";
import {
  Container,
  Text,
  Loader,
  useThemeVariant,
} from "../../components/themed";

const SplashScreen: React.FC = () => {
  const themeVariant = useThemeVariant();

  return (
    <Container centered style={{ backgroundColor: themeVariant.primary }}>
      <View style={{ alignItems: "center" }}>
        <Text
          variant="h1"
          color="inverse"
          weight="bold"
          align="center"
          style={{ marginBottom: 40 }}
        >
          Bezpieczna Rodzina
        </Text>
        <Loader
          size="large"
          color="white"
          message="Sprawdzanie autoryzacji..."
        />
      </View>
    </Container>
  );
};

export default SplashScreen;
