import createDataContext from "./createDataContext";
import { navigate } from "../navigationRef";
import trackerApi from "../api/tracker";
const trackReducer = (state, action) => {
  switch (action.type) {
    case "fetch_tracks":
      return action.payload;
    default:
      return state;
  }
};

const fetchTracks = (dispatch) => async () => {
  const response = await trackerApi.get("/tracks");
  dispatch({ type: "fetch_tracks", payload: response.data });
};
const createTrack = (dispatch) => async (name, locations) => {
  try {
    // console.log(name, locations);
    const res = await trackerApi.post("/tracks", { name, locations });
    // console.log(res.data);
    navigate("TrackList");
  } catch (err) {}
};

export const { Provider, Context } = createDataContext(
  trackReducer,
  { fetchTracks, createTrack },
  []
);
