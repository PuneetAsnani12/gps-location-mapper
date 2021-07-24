import React, { useContext, useState } from "react";

import { Context as AuthContext } from "../context/AuthContext";

import { View, StyleSheet, StatusBar, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Authform from "../components/Authform";
import NavLink from "../components/NavLink";

const SignupScreen = () => {
  const { state, SignUp } = useContext(AuthContext);
  const [loader, setLoader] = useState(false);
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Authform
          submitButtonText="Sign Up"
          title="Sign Up for tracker"
          onSubmit={SignUp}
          onPresss={() => {
            setLoader(true);
          }}
          errorMessage={state.errorMessage}
        ></Authform>
        <NavLink
          routeName="Signin"
          text="Already have an account? Sign in instead"
          onPresss={() => {
            setLoader(false);
          }}
        ></NavLink>
        {!state.errorMessage && loader ? (
          <ActivityIndicator size="large"></ActivityIndicator>
        ) : null}
      </ScrollView>
    </View>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    header: () => {},
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#21BBA1",
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});

export default SignupScreen;
