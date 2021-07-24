import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import AsyncStorage from "@react-native-community/async-storage";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signin":
    case "signup":
      return { errorMessage: "", token: action.payload };
    case "sign_out":
      return { errorMessage: "", token: "" };
    default:
      return state;
  }
};

const tryLocalSignIn = (dispatch) => {
  return async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch({ type: "signin", payload: token });
      navigate("TrackList");
    } else {
      navigate("Signup");
    }
  };
};

const SignUp = (dispatch) => {
  return async ({ email, password }) => {
    // make api req. to sign up with that email and password
    try {
      const response = await trackerApi.post("/signup", { email, password });
      //if we sign up, modify our state, and say that we are authenticated
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signup", payload: response.data.token });

      // navigate to mainFlow
      navigate("TrackList");
    } catch (err) {
      // if we signing up fails, we probably need to reflect an error message somewhere
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign up",
      });
    }
  };
};

const SignIn = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const response = await trackerApi.post("/signin", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });
      navigate("TrackList");
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign in",
      });
    }
  };
};

const SignOut = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "sign_out" });
  navigate("loginFlow");
};

const clearErrorMessage = (dispatch) => {
  return () => {
    dispatch({ type: "clear_error_message" });
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    SignIn,
    SignUp,
    SignOut,
    clearErrorMessage,
    tryLocalSignIn,
  },
  { token: null, errorMessage: "" }
);
