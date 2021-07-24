import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";

import { Context as TrackContext } from "../context/TrackContext";
import MapView, { Polyline } from "react-native-maps";
import Spacer from "../components/spacer";

const TrackDetailScreen = ({ navigation }) => {
  const _id = navigation.getParam("_id");
  const { state } = useContext(TrackContext);

  const track = state.find((trak) => trak._id === _id);
  const initialCoords = track.locations[0].coords;
  return (
    <View style={{ backgroundColor: "#21BBA1", flex: 1 }}>
      <Spacer>
        <Text
          style={{
            width: "100%",
            color: "white",
            textAlign: "center",
            textTransform: "capitalize",
            textShadowColor: "rgba(0, 0, 0, 1)",
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 20,
            fontSize: 30,
            fontFamily: "antic-slab",
          }}
        >
          Track Name: {track.name}
        </Text>
      </Spacer>
      <MapView
        style={styles.map}
        initialRegion={{
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
          ...initialCoords,
        }}
      >
        <Polyline
          coordinates={track.locations.map((loc) => loc.coords)}
        ></Polyline>
      </MapView>
      <Spacer>
        <Text
          style={{
            width: "100%",
            color: "red",
            fontSize: 16,
            fontFamily: "antic-slab",
          }}
        >
          *You can find your path highlighted by a black line
        </Text>
      </Spacer>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});

export default TrackDetailScreen;
