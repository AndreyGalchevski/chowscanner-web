import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import L from "leaflet";

import "normalize.css";
import "leaflet/dist/leaflet.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { FeedSpotProvider } from "./features/feedSpot/FeedSpotContext";
import { I18nProvider } from "./features/i18n/I18nContext";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

ReactDOM.render(
  <React.StrictMode>
    <I18nProvider>
      <FeedSpotProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FeedSpotProvider>
    </I18nProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
