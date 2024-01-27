import { useState } from "react";
import "./App.css";
import Inline from "./Inline";
import TestButton from "./TestButton";

function App() {
  const [load, set_load] = useState<string>();

  return (
    <>
      <div>
        <label>Load</label>
        <select onChange={(e) => set_load(e.target.value)}>
          <option>None</option>
          <option value="inline">Inline</option>
        </select>
      </div>
      <div>
        <TestButton />
      </div>
      {load === "inline" ? <Inline /> : null}
    </>
  );
}

export default App;
