import { useState } from "react";
import "./TestButton.css";

export default () => {
  const [count, set_count] = useState(0);

  const onClick = () => {
    set_count((c) => c + 1);
  };
  return (
    <button onClick={onClick}>
      Click Me! ({count})<div className="animation_conatiner" />
    </button>
  );
};
