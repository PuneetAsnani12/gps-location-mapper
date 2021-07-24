import { useState, useEffect } from "react";

import {
  requestPermissionsAsync,
  watchPositionAsync,
  Accuracy,
} from "expo-location";

export default (shouldTrack, cb) => {
  const [err, setErr] = useState(null);

  useEffect(() => {
    let subscriber;
    const stopWatching = () => {
      if (subscriber) {
        subscriber.remove();
        subscriber = null;
      }
    };
    const startWatching = async () => {
      try {
        await requestPermissionsAsync();

        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10,
          },
          cb
        );
      } catch (error) {
        setErr(error);
      }
    };

    shouldTrack ? startWatching() : stopWatching();
    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [shouldTrack, cb]);

  return [err];
};
