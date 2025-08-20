import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "../state/store";
import { ThemeProvider } from "../theme/ThemeProvider";
import { I18nextWrapper } from "../i18n/I18nextProvider";
import { AuthProvider } from "../contexts/AuthContext";
import { RootNavigator } from "./navigation";
import { ToastProvider } from "./contexts/ToastContext";
import { View } from "react-native";

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <ThemeProvider>
          <I18nextWrapper>
            <AuthProvider>
              <ToastProvider>
                <View style={{ flex: 1 }}>
                  <NavigationContainer>
                    <RootNavigator />
                  </NavigationContainer>
                </View>
              </ToastProvider>
            </AuthProvider>
          </I18nextWrapper>
        </ThemeProvider>
      </Provider>
    </View>
  );
};

export default App;
