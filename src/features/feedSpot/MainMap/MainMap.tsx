import React, { FunctionComponent, useEffect } from "react";
import { Map, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";

import { useFeedSpotState, useFeedSpotActions } from "../FeedSpotContext";
import useLongMapPress from "../../../hooks/useLongMapPress";

const MainMap: FunctionComponent = () => {
  const { feedSpots, isFetching, currentSpot } = useFeedSpotState();
  const {
    fetchFeedSpots,
    selectSpot,
    clearCurrentSpot,
    addFeedSpot,
  } = useFeedSpotActions();

  const handleMapPress = (e: LeafletMouseEvent) => {
    const newSpot = {
      id: "unassigned",
      name: "",
      specie: "",
      coordinates: [e.latlng.lat, e.latlng.lng],
      animalsCount: 0,
    };
    addFeedSpot(newSpot);
    setTimeout(() => selectSpot(newSpot), 300);
  };

  const longPressHandlers = useLongMapPress(handleMapPress);

  useEffect(() => {
    fetchFeedSpots();
  }, [fetchFeedSpots]);

  if (isFetching) {
    return <h1>Loading...</h1>;
  }

  return (
    <Map
      center={[32.1340922, 34.8721972]}
      zoom={16}
      zoomControl={false}
      {...longPressHandlers}
    >
      {currentSpot && (
        <Popup
          position={[currentSpot.coordinates[0], currentSpot.coordinates[1]]}
          onClose={() => {
            clearCurrentSpot();
          }}
        >
          <div>
            <h2>Name: {currentSpot.name}</h2>
            <p>Specie: {currentSpot.specie}</p>
            <p>Animal's count: {currentSpot.animalsCount}</p>
          </div>
        </Popup>
      )}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {feedSpots.map((it) => (
        <Marker
          key={it.id}
          position={[it.coordinates[0], it.coordinates[1]]}
          onClick={() => {
            selectSpot(it);
          }}
        />
      ))}
      <ZoomControl position="bottomright" />
    </Map>
  );
};

export default MainMap;
