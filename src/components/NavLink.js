import React, { useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";
import Spacer from "./spacer";

const NavLink = ({ navigation, text, onPresss, routeName }) => {
  const { clearErrorMessage } = useContext(AuthContext);

  return (
    <TouchableOpacity
      onPress={() => {
        clearErrorMessage();
        onPresss();
        navigation.navigate(routeName);
      }}
    >
      <Spacer>
        <Text style={styles.link}>{text}</Text>
      </Spacer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: "blue",
    fontFamily: "antic-slab",
    alignSelf: "center",
    fontSize: 17,
  },
});

export default withNavigation(NavLink);
