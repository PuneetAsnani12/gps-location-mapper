import React, { useContext, useState } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { View, StyleSheet, StatusBar, ActivityIndicator } from "react-native";
import Authform from "../components/Authform";
import NavLink from "../components/NavLink";
const SigninScreen = () => {
  const { state, SignIn } = useContext(AuthContext);
  const [loader, setLoader] = useState(false);

  return (
    <View style={styles.container}>
      <Authform
        submitButtonText="Sign in"
        title="Sign In for tracker"
        onSubmit={SignIn}
        onPresss={() => {
          setLoader(true);
        }}
        errorMessage={state.errorMessage}
      ></Authform>
      <NavLink
        routeName="Signup"
        text="Don't have an account? Sign up instead"
        onPresss={() => {
          setLoader(false);
        }}
      ></NavLink>
      {!state.errorMessage && loader ? (
        <ActivityIndicator size="large"></ActivityIndicator>
      ) : null}
    </View>
  );
};

SigninScreen.navigationOptions = () => {
  return {
    header: () => {},
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#21BBA1",
    marginTop: StatusBar.currentHeight,
  },
});

export default SigninScreen;
