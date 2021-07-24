import React, { useContext, useState } from "react";
import { View, StatusBar, ActivityIndicator } from "react-native";
import { Text, Button, Image } from "react-native-elements";
import Spacer from "../components/spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { Feather } from "@expo/vector-icons";

const AccountScreen = () => {
  const {
    SignOut,
    state: { token },
  } = useContext(AuthContext);
  const [show, setShow] = useState(null);
  return (
    <View
      style={{
        backgroundColor: "#21BBA1",
        flex: 1,
        marginTop: StatusBar.currentHeight,
      }}
    >
      {show ? (
        <ActivityIndicator
          size="large"
          style={{ top: 500, left: 180, position: "absolute" }}
        />
      ) : null}
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
          Account Details
        </Text>
      </Spacer>
      <Spacer>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/new.png")}
            style={{ width: 200, height: 200 }}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
      </Spacer>
      <Spacer>
        <Text
          style={{
            width: "100%",
            color: "white",
            textAlign: "center",
            textShadowColor: "rgba(0, 0, 0, 1)",
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 7,
            fontSize: 18,
            padding: 5,
            fontFamily: "antic-slab",
          }}
        >
          You are logged in, Tap to sign out
        </Text>
      </Spacer>
      <Spacer>
        <Button
          title="Sign Out"
          raised={true}
          onPress={() => {
            setShow(true);
            SignOut();
          }}
        ></Button>
      </Spacer>
    </View>
  );
};

AccountScreen.navigationOptions = {
  title: "Profile",
  tabBarIcon: <Feather name="user" size={20} color="black" />,
};

export default AccountScreen;
