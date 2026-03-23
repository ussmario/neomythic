import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polygon } from "react-native-maps";
import QueueResolver from "../components/QueueResolver";
import { biomes } from "../data/biomes";
import { getDebugState, wipeAllData } from "../systems/debug/debugStore";
import { evaluateEchoCriteria } from "../systems/encounter/echoCriteriaEngine";
import { getQueue } from "../systems/encounter/echoQueue";
import { createMovementTracker } from "../systems/utils";
import { setVirtualAvatarTarget, virtualAvatarTick } from "../systems/virtualAvatar/virtualAvatar";
import { getGamePhase, GamePhase } from "../game/gameState"
import BattleScreen from "../screens/BattleScreen"

export default function MapScreen() {
  const [physicalCoords, setPhysicalCoords] = useState<Location.LocationObjectCoords | null>(null);
  const [virtualAvatar, setVirtualAvatar] = useState<any>(null); // virtual avatar object
  const [debugInfo, setDebugInfo] = useState(getDebugState());
  const mapRef = useRef<MapView>(null);
  const gpsTracker = useRef(createMovementTracker()).current
  const avatarTracker = useRef(createMovementTracker()).current

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null
    let interval: ReturnType<typeof setInterval>
    let debugInterval: ReturnType<typeof setInterval>

    async function startTracking() {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("Location permission denied");
        return;
      }

      // Physical location tracking
      subscription = await Location.watchPositionAsync(
        {
          //Location.Accuracy.Balanced, interval 3000, distance 5 for real device testing
          //Location.Accuracy.Highest, interval 1000, distance 1 for testing
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 3000,
          distanceInterval: 5,
        },
        (location) => {
          const newCoords = location.coords;
          setPhysicalCoords(newCoords);

          // Initialize virtual avatar if first run
          setVirtualAvatar((prev) => prev ?? {
            coords: newCoords,
            movementEnergy: 100,
            mode: "DRIFT",
          });

          // Feed movement systems
          const movementEvent = gpsTracker?.(newCoords)

          if (movementEvent) {
            evaluateEchoCriteria(movementEvent)
          }
        }
      );

      // Virtual avatar tick loop
      interval = setInterval(() => {
        setVirtualAvatar((prev) => {
          if (!prev) return prev;

          const updated = virtualAvatarTick(prev);
          const movementEvent = avatarTracker?.(updated.coords)

          if (movementEvent) {
            evaluateEchoCriteria(movementEvent)
          }

          return updated;
        });
      }, 1000);

      debugInterval = setInterval(() => {
        setDebugInfo({ ...getDebugState() })
      }, 500)
    }

    startTracking()

    return () => {
      subscription?.remove()
      clearInterval(interval)
      clearInterval(debugInterval)
    }
  }, [])

  if (!physicalCoords || !virtualAvatar) {
    return (
      <View style={styles.center}>
        <Text>Locating...</Text>
      </View>
    );
  }

  if (getGamePhase() === GamePhase.BATTLE) {
    return <BattleScreen />
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation
        initialRegion={{
          latitude: physicalCoords.latitude,
          longitude: physicalCoords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={(e) => {
          const coords = e.nativeEvent.coordinate;
          setVirtualAvatar((prev) => prev ? setVirtualAvatarTarget(prev, coords) : prev);
        }}
        >

        {biomes
          .filter((biome) => biome.polygon && biome.polygon.length > 0)
          .map((biome) => (
            <Polygon
            key={biome.id}
            coordinates={biome.polygon!}
            {...polygonStyle  }
            />
          ))}

        {/* Virtual Avatar */}
        <Marker
          coordinate={{
            latitude: virtualAvatar.coords.latitude,
            longitude: virtualAvatar.coords.longitude,
          }}
          pinColor="purple"
          title="Virtual Avatar"
          />
      </MapView>
      <View style={styles.queueResolver}>
        <QueueResolver />
      </View>
      <View style={styles.debugPanel}>
        <Text>Seeds: {debugInfo.seeds}</Text>
        <Button
          title="New Game"
          onPress={() => wipeAllData()}
        />
        {getQueue().map((seed, index) => (
          <Text key={index}>
            {index + 1}. {seed.debugLabel}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  debugPanel: {
    position: "absolute",
    bottom: 60,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 10,
    borderRadius: 8,
    maxWidth: 220,
  },
  queueResolver: {
    position: "absolute",
    top: 120,
    left: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 10,
    borderRadius: 8
  },
});

const polygonStyle = {
  fillColor: "rgba(0,255,0,0.15)",
  strokeColor: "rgba(0,150,0,0.8)",
  strokeWidth: 2
}