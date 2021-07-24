import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import Spacer from "./spacer";
import BigSpacer from "./BigSpacer";

const Authform = ({
  errorMessage,
  title,
  onSubmit,
  onPresss,
  submitButtonText,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <BigSpacer>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "antic-slab",
            fontSize: 38,
          }}
        >
          {title}
        </Text>
      </BigSpacer>
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
          label="Email"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        ></Input>
      </View>
      <Spacer />
      <View
        style={{
          margin: 15,
          marginTop: 0,
          marginBottom: 0,
          backgroundColor: "white",
          borderRadius: 5,
          padding: 5,
          paddingBottom: 0,
        }}
      >
        <Input
          secureTextEntry
          label="Password"
          autoCapitalize="none"
          autoCorrect={false}
          value={password}
          onChangeText={setPassword}
        ></Input>
      </View>

      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}

      <Spacer>
        <Button
          title={submitButtonText}
          raised={true}
          onPress={() => {
            onPresss();
            onSubmit({ email, password });
          }}
        ></Button>
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    fontFamily: "antic-slab",
    color: "red",
    marginLeft: 15,
    marginTop: 15,
  },
});

export default Authform;
