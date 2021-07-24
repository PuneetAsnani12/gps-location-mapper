import React, { useContext } from "react";

import { ListItem } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import { StyleSheet, FlatList, View, ActivityIndicator } from "react-native";
import { Context as TrackContext } from "../context/TrackContext";

import TouchableScale from "react-native-touchable-scale";
const TrackListScreen = ({ navigation }) => {
  const { fetchTracks, state } = useContext(TrackContext);
  return (
    <View style={{ backgroundColor: "#21BBA1", flex: 1 }}>
      <NavigationEvents onWillFocus={fetchTracks}></NavigationEvents>
      {state.length ? (
        <FlatList
          data={state}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <View style={{ margin: 15 }}>
                <ListItem
                  Component={TouchableScale}
                  friction={90} //
                  tension={100} // These props are passed to the parent component (here TouchableScale)
                  activeScale={0.95} //
                  containerStyle={{ borderRadius: 10 }}
                  linearGradientProps={{
                    colors: ["#FF9800", "#F44336"],
                    start: { x: 1, y: 0 },
                    end: { x: 0.2, y: 0 },
                  }}
                  onPress={() =>
                    navigation.navigate("TrackDetail", { _id: item._id })
                  }
                  title={item.name}
                  titleStyle={{
                    color: "white",
                    fontFamily: "antic-slab",
                    textTransform: "capitalize",
                  }}
                  chevron={{ color: "white" }}
                />

                {/* <TouchableOpacity
                //   style={{ borderStartWidth: 10, backgroundColor: "#45ffff" }}
                //   onPress={() => {
                //     navigation.navigate("TrackDetail", { _id: item._id });
                //   }}
                // >
                //   <ListItem chevron title={item.name}></ListItem>
                // </TouchableOpacity> */}
              </View>
            );
          }}
        ></FlatList>
      ) : (
        <ActivityIndicator
          size="large"
          style={{ marginTop: 200 }}
        ></ActivityIndicator>
      )}
    </View>
  );
};

TrackListScreen.navigationsOptions = {
  title: "Saved Tracks",
};

const styles = StyleSheet.create({});

export default TrackListScreen;
