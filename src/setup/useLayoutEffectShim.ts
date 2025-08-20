// React 18 SSR / react-native-web warning suppressor for useLayoutEffect.
// On the server (or non-DOM env) we map useLayoutEffect -> useEffect.
import * as React from "react";

if (typeof window === "undefined" || typeof document === "undefined") {
  // @ts-ignore override for non-DOM
  React.useLayoutEffect = React.useEffect;
}
