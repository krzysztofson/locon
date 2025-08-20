import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "../state/store";
import { ThemeProvider } from "../theme/ThemeProvider";
import { I18nProvider } from "../i18n/I18nProvider";
import { AuthProvider } from "../contexts/AuthContext";
import { RootNavigator } from "./navigation";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <I18nProvider>
          <AuthProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </AuthProvider>
        </I18nProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
