import { useState, useEffect } from "react";
import { LeafletMouseEvent } from "leaflet";

export default function useLongMapPress(
  callback: (e: LeafletMouseEvent) => void,
  ms = 500
) {
  const [startLongPress, setStartLongPress] = useState(false);
  const [event, setEvent] = useState<LeafletMouseEvent>();

  useEffect(() => {
    let timerID: any;
    if (startLongPress && event) {
      timerID = setTimeout(() => callback(event), ms);
    } else {
      clearTimeout(timerID);
    }

    return () => {
      clearTimeout(timerID);
    };
  }, [event, callback, ms, startLongPress]);

  return {
    onmousedown: (e: LeafletMouseEvent) => {
      setStartLongPress(true);
      setEvent(e);
    },
    onmouseup: () => setStartLongPress(false),
    onmouseleave: () => setStartLongPress(false),
    ontouchstart: (e: LeafletMouseEvent) => {
      setStartLongPress(true);
      setEvent(e);
    },
    ontouchend: () => setStartLongPress(false),
  };
}
