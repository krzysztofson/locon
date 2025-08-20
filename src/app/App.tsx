import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "../state/store";
import { ThemeProvider } from "../theme/ThemeProvider";
import { I18nProvider } from "../i18n/I18nProvider";
import { AuthProvider } from "../contexts/AuthContext";
import { RootNavigator } from "./navigation";
import { View } from "react-native";

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <ThemeProvider>
          <I18nProvider>
            <AuthProvider>
              <View style={{ flex: 1 }}>
                <NavigationContainer>
                  <RootNavigator />
                </NavigationContainer>
              </View>
            </AuthProvider>
          </I18nProvider>
        </ThemeProvider>
      </Provider>
    </View>
  );
};

export default App;
