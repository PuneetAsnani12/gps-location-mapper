import React, { useContext, useCallback } from "react";
import { Feather } from "@expo/vector-icons";

import { View, StatusBar } from "react-native";
import { Text } from "react-native-elements";
import { withNavigationFocus } from "react-navigation";

import useLocation from "../hooks/useLocation";
import { Context as LocationContext } from "../context/LocationContext";
import Map from "../components/Map";
import TrackForm from "../components/TrackForm";
import { ScrollView } from "react-native-gesture-handler";
import Spacer from "../components/spacer";

const TrackCreateScreen = ({ isFocused }) => {
  const {
    state: { recording },
    addLocation,
  } = useContext(LocationContext);
  const callback = useCallback(
    (location) => {
      addLocation(location, recording);
    },
    [recording]
  );
  const [err] = useLocation(isFocused || recording, callback);

  return (
    <View
      style={{
        backgroundColor: "#21BBA1",
        flex: 1,
        marginTop: StatusBar.currentHeight,
      }}
    >
      <ScrollView>
        <Spacer>
          <Text
            style={{
              width: "100%",
              color: "white",
              textAlign: "center",
              textShadowColor: "rgba(0, 0, 0, 1)",
              textShadowOffset: { width: -1, height: 1 },
              textShadowRadius: 20,
              fontSize: 40,
              fontFamily: "antic-slab",
            }}
          >
            Create a Track
          </Text>
        </Spacer>
        <Map></Map>
        {err ? <Text>Please Enable location services</Text> : null}
        <TrackForm></TrackForm>
      </ScrollView>
    </View>
  );
};

TrackCreateScreen.navigationOptions = {
  title: "Add Track",
  tabBarIcon: <Feather name="plus" size={20} color="black" />,
};

export default withNavigationFocus(TrackCreateScreen);
