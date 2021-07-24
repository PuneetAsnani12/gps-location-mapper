import { useContext } from "react";
import { Context as TrackContext } from "../context/TrackContext";
import { Context as LocationContext } from "../context/LocationContext";
import { navigate } from "../navigationRef";

export default () => {
  const { createTrack } = useContext(TrackContext);
  const {
    state: { name, locations },
    reset,
  } = useContext(LocationContext);

  const saveTrack = async () => {
    await createTrack(name, locations);
    if (name && locations.length) {
      reset();
    } else {
      return { err: "You Must provide a name and locations" };
    }
  };

  return [saveTrack];
};
