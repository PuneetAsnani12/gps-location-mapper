import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import Spacer from "./spacer";
import { Input, Button } from "react-native-elements";
import { Context as LocationContext } from "../context/LocationContext";
import useSaveTrack from "../hooks/useSaveTrack";
import Toast from "react-native-root-toast";
const TrackForm = () => {
  const {
    state: { name, recording, locations },
    startRecording,
    stopRecording,
    changeName,
    reset,
  } = useContext(LocationContext);

  const [saveTrack] = useSaveTrack();
  return (
    <>
      <View
        style={{
          margin: 15,
          marginBottom: 0,
          backgroundColor: "white",
          borderRadius: 5,
          padding: 5,
          paddingBottom: 0,
        }}
      >
        <Input
          value={name}
          onChangeText={changeName}
          placeholder="Enter Name"
        ></Input>
      </View>
      {recording ? (
        <Spacer>
          <Button raised={true} title="Stop" onPress={stopRecording}></Button>
        </Spacer>
      ) : (
        <Spacer>
          <Button
            raised={true}
            title="Start Recording"
            onPress={startRecording}
          ></Button>
        </Spacer>
      )}
      {!recording && locations.length ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Button
            raised={true}
            title="Save"
            containerStyle={{
              flexGrow: 1,
              margin: 8,
            }}
            onPress={() => {
              const retVal = saveTrack();
              retVal.then((data) => {
                if (data) {
                  Toast.show(data.err, {
                    duration: Toast.durations.SHORT,
                    position: 0,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    backgroundColor: "white",
                    delay: 0,
                    textColor: "black",
                    textStyle: {
                      fontFamily: "antic-slab",
                    },
                    opacity: 0.8,
                  });
                }
              });
            }}
          ></Button>
          <Button
            raised={true}
            onPress={reset}
            containerStyle={{
              flexGrow: 1,
              margin: 8,
            }}
            title="Clear"
          ></Button>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({});

export default TrackForm;
