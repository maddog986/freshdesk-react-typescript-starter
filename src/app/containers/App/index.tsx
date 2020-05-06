import * as React from "react";
import { FreshdeskClient } from "../../../types";
import "./index.scss";

const App = (client: FreshdeskClient) => {
  return <h1 className="hello">Hello from React</h1>;
};

export default App;
