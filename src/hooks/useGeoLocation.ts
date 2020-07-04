import { useState, useEffect } from "react";

export interface Position {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

const defaultSettings = {
  isWatchModeOn: false,
  enableHighAccuracy: false,
  timeout: Infinity,
  maximumAge: 0,
};

export interface Settings {
  isWatchModeOn: boolean;
  enableHighAccuracy: boolean;
  timeout: number;
  maximumAge: number;
}

export const useGeoLocation = (providedSettings: Partial<Settings>) => {
  const [position, setPosition] = useState<Position>({
    latitude: 0,
    longitude: 0,
    accuracy: 0,
    timestamp: 0,
  });

  const [error, setError] = useState("");

  const settings = {
    ...defaultSettings,
    ...providedSettings,
  };

  const onChange: PositionCallback = ({ coords, timestamp }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
      accuracy: coords.accuracy,
      timestamp,
    });
  };

  const onError: PositionErrorCallback = (error: PositionError) => {
    setError(error.message);
  };

  useEffect(() => {
    if (!navigator || !navigator.geolocation) {
      setError("Geo location is not supported");
      return;
    }

    let watcher: number;
    if (settings.isWatchModeOn) {
      watcher = navigator.geolocation.watchPosition(
        onChange,
        onError,
        settings
      );
    } else {
      navigator.geolocation.getCurrentPosition(onChange, onError, settings);
    }

    return () => navigator.geolocation.clearWatch(watcher);
  }, [
    settings.isWatchModeOn,
    settings.enableHighAccuracy,
    settings.timeout,
    settings.maximumAge,
    settings,
  ]);

  return { ...position, error };
};
