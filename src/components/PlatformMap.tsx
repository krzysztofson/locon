import React from "react";
import { Platform } from "react-native";

// We'll provide a react-native-maps compatible surface. On web we leverage Leaflet via react-leaflet.
let MapComponent: React.ComponentType<any>;
let Marker: React.ComponentType<any>;
let Circle: React.ComponentType<any>;

if (Platform.OS === "web") {
  // Lazy-load heavy leaflet libs only on web.
  const {
    MapContainer,
    TileLayer,
    Circle: LeafletCircle,
    Marker: LeafletMarker,
    useMap,
  } = require("react-leaflet");
  const L = require("leaflet");
  const ReactDOMServer = require("react-dom/server");

  // Inject Leaflet CSS (CDN) since we have no css-loader configured.
  if (
    typeof document !== "undefined" &&
    !document.getElementById("leaflet-css")
  ) {
    const link = document.createElement("link");
    link.id = "leaflet-css";
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);
  }

  // Helpers to translate region <-> leaflet zoom.
  const longitudeDeltaToZoom = (lonDelta: number) => {
    const raw = Math.log2(360 / lonDelta);
    return Math.min(20, Math.max(1, raw));
  };
  const zoomToLongitudeDelta = (zoom: number) => 360 / Math.pow(2, zoom);

  interface RegionLike {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }

  const MapInnerEvents: React.FC<{
    onRegionChangeComplete?: (r: RegionLike) => void;
  }> = ({ onRegionChangeComplete }) => {
    const map = useMap();
    React.useEffect(() => {
      if (!onRegionChangeComplete) return;
      const handler = () => {
        const center = map.getCenter();
        const zoom = map.getZoom();
        const longitudeDelta = zoomToLongitudeDelta(zoom);
        const latitudeDelta =
          longitudeDelta * (map.getSize().y / map.getSize().x);
        onRegionChangeComplete({
          latitude: center.lat,
          longitude: center.lng,
          latitudeDelta,
          longitudeDelta,
        });
      };
      map.on("moveend", handler);
      map.on("zoomend", handler);
      return () => {
        map.off("moveend", handler);
        map.off("zoomend", handler);
      };
    }, [map, onRegionChangeComplete]);
    return null;
  };

  MapComponent = React.forwardRef(
    (
      {
        style,
        initialRegion,
        onRegionChangeComplete,
        children,
        mapType,
        ...rest
      }: any,
      ref: any
    ) => {
      const region: RegionLike = initialRegion || {
        latitude: 52.2297,
        longitude: 21.0122,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };
      const zoom = longitudeDeltaToZoom(region.longitudeDelta);
      const mapRef = React.useRef<any>(null);

      React.useImperativeHandle(ref, () => ({
        animateToRegion: (next: RegionLike, duration: number = 1000) => {
          if (mapRef.current) {
            const z = longitudeDeltaToZoom(
              next.longitudeDelta || region.longitudeDelta
            );
            mapRef.current.flyTo([next.latitude, next.longitude], z, {
              duration: duration / 1000,
            });
          }
        },
      }));

      return (
        <div style={{ width: "100%", height: "100%", ...(style || {}) }}>
          <MapContainer
            center={[region.latitude, region.longitude]}
            zoom={zoom}
            style={{ width: "100%", height: "100%" }}
            ref={mapRef}
            attributionControl={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <MapInnerEvents onRegionChangeComplete={onRegionChangeComplete} />
            {children}
          </MapContainer>
        </div>
      );
    }
  );

  Marker = ({ coordinate, children, title, onPress }: any) => {
    const icon = React.useMemo(() => {
      const html = ReactDOMServer.renderToString(
        <div style={{ transform: "translate(-50%, -50%)" }}>{children}</div>
      );
      return L.divIcon({
        html,
        className: "",
        iconSize: undefined, // size derives from child content
      });
    }, [children]);
    return (
      <LeafletMarker
        position={[coordinate.latitude, coordinate.longitude]}
        icon={icon}
        eventHandlers={onPress ? { click: onPress } : undefined}
        title={title}
      />
    );
  };

  Circle = ({
    center,
    radius,
    fillColor,
    strokeColor,
    strokeWidth = 2,
  }: any) => (
    <LeafletCircle
      center={[center.latitude || center.lat, center.longitude || center.lon]}
      radius={radius}
      pathOptions={{
        color: strokeColor || "#2196F3",
        weight: strokeWidth,
        fillColor: fillColor || strokeColor || "#2196F3",
        fillOpacity: fillColor ? 0.4 : 0.2,
      }}
    />
  );
} else {
  // Native platforms: delegate to react-native-maps
  const maps = require("react-native-maps");
  MapComponent = maps.default;
  Marker = maps.Marker;
  Circle = maps.Circle;
}

export default MapComponent;
export { Marker, Circle };
export const MAP_TYPES =
  Platform.OS === "web"
    ? { STANDARD: "standard" }
    : require("react-native-maps").MAP_TYPES;
