import React from "react";
import { Platform } from "react-native";

// Conditional imports based on platform
let MapComponent: React.ComponentType<any>;
let Marker: React.ComponentType<any>;
let Circle: React.ComponentType<any>;

if (Platform.OS === "web") {
  // For web, we'll use placeholders for now
  MapComponent = React.forwardRef(
    (
      {
        children,
        initialRegion,
        showsUserLocation,
        showsMyLocationButton,
        onRegionChangeComplete,
        ...props
      }: any,
      ref: any
    ) => {
      React.useImperativeHandle(ref, () => ({
        animateToRegion: (region: any, duration: number = 1000) => {
          console.log("Web map: animateToRegion called", region);
          // In a real implementation, this would animate the map
        },
      }));

      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#E8F5E8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div style={{ textAlign: "center", color: "#666" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🗺️</div>
            <div>Mapa (Web fallback)</div>
            <div style={{ fontSize: "12px", marginTop: "8px" }}>
              Lokalizacje: Warszawa, PL
            </div>
          </div>
          {children}
        </div>
      );
    }
  );

  Marker = ({
    children,
    title,
    description,
    coordinate,
    onPress,
    ...props
  }: any) => (
    <div
      style={{
        position: "absolute",
        top: "45%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 10,
        cursor: onPress ? "pointer" : "default",
      }}
      title={title}
      onClick={onPress}
    >
      {children || <div style={{ fontSize: "24px" }}>📍</div>}
    </div>
  );

  Circle = ({
    center,
    radius,
    fillColor,
    strokeColor,
    strokeWidth,
    ...props
  }: any) => (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        border: `${strokeWidth || 2}px solid ${strokeColor || "#2196F3"}`,
        backgroundColor: fillColor || "rgba(33, 150, 243, 0.1)",
        transform: "translate(-50%, -50%)",
        zIndex: 5,
      }}
    />
  );
} else {
  // For native platforms, use react-native-maps
  const maps = require("react-native-maps");
  MapComponent = maps.default;
  Marker = maps.Marker;
  Circle = maps.Circle;
}

// Export default as the main MapView component
export default MapComponent;

// Export named components
export { Marker, Circle };

// Export additional types/constants that might be needed
export const MAP_TYPES =
  Platform.OS === "web"
    ? { STANDARD: "standard" }
    : require("react-native-maps").MAP_TYPES;
