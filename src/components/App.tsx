import { useState } from "react";
import "./App.css";
import ArrayInline from "./ArrayInline";
import TestButton from "./TestButton";
import ArrayWorker from "./ArrayWorker";
import GameInline from "./GameInline";
import GameWorker from "./GameWorker";

enum Demos {
  none,
  array_inline,
  array_worker,
  game_inline,
  game_worker,
}

function App() {
  const [load, set_load] = useState<Demos>(Demos.game_worker);

  const on_demo_change: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    set_load(parseInt(e.target.value));
  };
  return (
    <>
      <div>
        <label>Load</label>
        <select value={load} onChange={on_demo_change}>
          <option value={Demos.none}>None</option>
          <option value={Demos.array_inline}>Big Array (Inline)</option>
          <option value={Demos.array_worker}>Big Array (Worker)</option>
          <option value={Demos.game_inline}>Game (Inline)</option>
          <option value={Demos.game_worker}>Game (Worker)</option>
        </select>
      </div>
      <div>
        <TestButton />
      </div>
      {load === Demos.array_inline ? (
        <ArrayInline />
      ) : load === Demos.array_worker ? (
        <ArrayWorker />
      ) : load === Demos.game_inline ? (
        <GameInline />
      ) : load === Demos.game_worker ? (
        <GameWorker />
      ) : null}
    </>
  );
}

export default App;
