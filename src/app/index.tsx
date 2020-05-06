// import styles for public side
import * as React from "react";
import * as ReactDOM from "react-dom";
import { FreshdeskApp, FreshdeskClient } from "../types";
import App from "./containers/App/index";
import "./index.scss";

declare var app: FreshdeskApp; // freshdesk app. loaded in html

// boolean to prevent React app from being reinitialized
let appActivated = false;

$(document).ready(function () {
  app.initialized().then(function (client: FreshdeskClient) {
    client.events.on("app.activated", function () {
      if (appActivated) return;
      appActivated = true;

      ReactDOM.render(<App client={client} />, document.getElementById("app"));
    });

    client.events.on("app.deactivated", function () {
      // make sure app isnt reactivated
      if (!appActivated) return;

      ReactDOM.unmountComponentAtNode(document.getElementById("app"));
      appActivated = false;
    });
  });
});
