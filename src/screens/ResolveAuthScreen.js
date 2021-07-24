import React, { useEffect, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { ActivityIndicator, View } from "react-native";

const ResolveAuthScreen = () => {
  const { tryLocalSignIn } = useContext(AuthContext);
  useEffect(() => {
    tryLocalSignIn();
  }, []);
  return (
    <View style={{ backgroundColor: "#21BBA1", flex: 1 }}>
      <ActivityIndicator
        size="large"
        style={{ marginTop: 200 }}
      ></ActivityIndicator>
    </View>
  );
};

export default ResolveAuthScreen;
