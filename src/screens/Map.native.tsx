import React, { useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import MapView, { Polygon } from "react-native-maps";
import * as Location from "expo-location";
import { zones } from "../data/zones";
import { trackMovement } from "../systems/movementTracker";
import { evaluateEchoCriteria } from "../systems/echoCriteriaEngine";

export default function MapScreen() {
  const [coords, setCoords] = useState<Location.LocationObjectCoords | null>(null);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    let subscription;

    async function startTracking() {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("Location permission denied");
        return;
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 3000,
          distanceInterval: 5,
        },
        (location) => {
          const newCoords = location.coords;

          setCoords(newCoords);

          // 🔥 Feed systems
          const movementData = trackMovement(newCoords);
          evaluateEchoCriteria(movementData);
        }
      );
    }

    startTracking();

    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  if (!coords) {
    return <Text>Locating...</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        showsUserLocation
        initialRegion={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {zones.map((zone) => (
          <Polygon
            key={zone.id}
            coordinates={zone.coordinates}
            fillColor="rgba(0,255,0,0.15)"
            strokeColor="rgba(0,150,0,0.8)"
            strokeWidth={2}
          />
        ))}
      </MapView>
    </View>
  );
}