import React, { useState } from "react";
import { setNavigator } from "./src/navigationRef";
import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";

import { Provider as LocationProvider } from "./src/context/LocationContext";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as TrackProvider } from "./src/context/TrackContext";

import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { Feather } from "@expo/vector-icons";

import { AppLoading } from "expo";
import * as Font from "expo-font";

import { RootSiblingParent } from "react-native-root-siblings";

const trackListFlow = createStackNavigator({
  TrackList: TrackListScreen,
  TrackDetail: TrackDetailScreen,
});

trackListFlow.navigationOptions = {
  title: "Tracks",
  tabBarIcon: <Feather name="list" size={24} color="black" />,
};
const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
  }),
  mainFlow: createBottomTabNavigator({
    trackListFlow,
    TrackCreate: TrackCreateScreen,
    Account: AccountScreen,
  }),
});

const App = createAppContainer(switchNavigator);

const getFont = () =>
  Font.loadAsync({
    "antic-slab": require("./assets/fonts/AnticSlab-Regular.ttf"),
  });

export default () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={getFont}
        onFinish={() => setFontsLoaded(true)}
      ></AppLoading>
    );
  }
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <RootSiblingParent>
            <App
              ref={(navigator) => {
                setNavigator(navigator);
              }}
            ></App>
          </RootSiblingParent>
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
};
