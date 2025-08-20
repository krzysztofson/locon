import "./src/setup/useLayoutEffectShim";
import { AppRegistry } from "react-native";
import App from "./src/app/App";
import { name as appName } from "./app.json";

// Register the app
AppRegistry.registerComponent(appName, () => App);

// Run the app
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById("root"),
});
