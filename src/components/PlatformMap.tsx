import React from "react";
import { Platform } from "react-native";
// Type fallback for dynamic server renderer import (avoid needing full @types/react-dom here)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - dynamic import of react-dom/server used only for HTML string

// We'll provide a react-native-maps compatible surface. On web we leverage Leaflet via react-leaflet.
let MapComponent: React.ComponentType<any>;
let Marker: React.ComponentType<any>;
let Circle: React.ComponentType<any>;

if (Platform.OS === "web") {
  // Lazy dynamic import AFTER mount to avoid useLayoutEffect on server/initial parse.
  interface RegionLike {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }
  type PendingProps = any;

  // Hold loaded leaflet modules in module scope (shared across instances)
  let leafletMods: any = null;
  let loadingPromise: Promise<any> | null = null;
  const ensureLeaflet = () => {
    if (leafletMods) return Promise.resolve(leafletMods);
    if (!loadingPromise) {
      loadingPromise = Promise.all([
        import("react-leaflet"),
        import("leaflet"),
      ]).then(([rl, L]) => {
        leafletMods = { rl, L: L.default || L };
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
        return leafletMods;
      });
    }
    return loadingPromise;
  };

  const longitudeDeltaToZoom = (lonDelta: number) => {
    const raw = Math.log2(360 / lonDelta);
    return Math.min(20, Math.max(1, raw));
  };
  const zoomToLongitudeDelta = (zoom: number) => 360 / Math.pow(2, zoom);

  const MapWeb = React.forwardRef((props: PendingProps, ref: any) => {
    const { style, initialRegion, onRegionChangeComplete, children } = props;
    const region: RegionLike = initialRegion || {
      latitude: 52.2297,
      longitude: 21.0122,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    };
    const [ready, setReady] = React.useState(false);
    const mapRef = React.useRef<any>(null);
    const mods = React.useRef<any>(null);

    React.useEffect(() => {
      let active = true;
      ensureLeaflet().then((m) => {
        if (!active) return;
        mods.current = m;
        setReady(true);
      });
      return () => {
        active = false;
      };
    }, []);

    React.useImperativeHandle(
      ref,
      () => ({
        animateToRegion: (next: RegionLike, duration: number = 1000) => {
          if (!ready || !mapRef.current) return;
          const z = longitudeDeltaToZoom(
            next.longitudeDelta || region.longitudeDelta
          );
          mapRef.current.flyTo([next.latitude, next.longitude], z, {
            duration: duration / 1000,
          });
        },
      }),
      [ready]
    );

    if (!ready) {
      return (
        <div style={{ width: "100%", height: "100%", ...(style || {}) }} />
      ); // placeholder
    }

    const { rl, L, ReactDOMServer } = mods.current;
    const {
      MapContainer,
      TileLayer,
      useMap,
      Circle: LeafletCircle,
      Marker: LeafletMarker,
    } = rl;
    const zoom = longitudeDeltaToZoom(region.longitudeDelta);

    const MapInnerEvents: React.FC = () => {
      const map = useMap();
      React.useEffect(() => {
        if (!onRegionChangeComplete) return;
        const handler = () => {
          const center = map.getCenter();
          const z = map.getZoom();
          const longitudeDelta = zoomToLongitudeDelta(z);
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
      }, [map]);
      return null;
    };

    // Build wrapped children (replace Marker/Circle placeholders if present)
    const enhancedChildren = React.Children.map(
      children,
      (child: any) => child
    );

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
          <MapInnerEvents />
          {enhancedChildren}
        </MapContainer>
      </div>
    );
  });

  const MarkerWeb: React.FC<any> = ({
    coordinate,
    children,
    title,
    onPress,
  }) => {
    const [mods, setMods] = React.useState<any>(null);
    React.useEffect(() => {
      ensureLeaflet().then(setMods);
    }, []);
    const icon = React.useMemo(() => {
      if (!mods) return null;
      const { L } = mods;
      let html: string;

      // Extract text content from React children for simple icon rendering
      const extractText = (element: any): string => {
        if (typeof element === "string" || typeof element === "number") {
          return String(element);
        }
        if (element?.props?.children) {
          if (
            typeof element.props.children === "string" ||
            typeof element.props.children === "number"
          ) {
            return String(element.props.children);
          }
          if (Array.isArray(element.props.children)) {
            return element.props.children.map(extractText).join("");
          }
          return extractText(element.props.children);
        }
        return "";
      };

      const textContent = extractText(children);
      if (textContent) {
        html = `<div style="transform:translate(-50%, -50%);font-size:16px;font-weight:bold;padding:4px 8px;background:#fff;border:2px solid #2C5282;border-radius:20px;box-shadow:0 2px 8px rgba(0,0,0,0.2);color:#2C5282;">${textContent}</div>`;
      } else {
        // Fallback dot
        html =
          '<div style="transform:translate(-50%, -50%);width:14px;height:14px;background:#2C5282;border:2px solid #fff;border-radius:50%;box-shadow:0 0 4px rgba(0,0,0,0.3);"></div>';
      }
      return L.divIcon({ html, className: "", iconSize: undefined });
    }, [mods, children]);
    if (!mods || !icon) return null;
    const { rl } = mods;
    const { Marker: LeafletMarker } = rl;
    return (
      <LeafletMarker
        position={[coordinate.latitude, coordinate.longitude]}
        icon={icon}
        eventHandlers={onPress ? { click: onPress } : undefined}
        title={title}
      />
    );
  };

  const CircleWeb: React.FC<any> = ({
    center,
    radius,
    fillColor,
    strokeColor,
    strokeWidth = 2,
  }) => {
    const [mods, setMods] = React.useState<any>(null);
    React.useEffect(() => {
      ensureLeaflet().then(setMods);
    }, []);
    if (!mods) return null;
    const { rl } = mods;
    const { Circle: LeafletCircle } = rl;
    return (
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
  };

  MapComponent = MapWeb as any;
  Marker = MarkerWeb as any;
  Circle = CircleWeb as any;
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
