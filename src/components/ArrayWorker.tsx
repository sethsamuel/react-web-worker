import { useEffect, useState } from "react";

const worker = new Worker(new URL("../workers/array.ts", import.meta.url));

export default () => {
  const [data, set_data] = useState<number[]>([]);
  useEffect(() => {
    worker.postMessage("start");
    worker.onmessage = (e) => {
      set_data(e.data);
    };
    return () => {
      worker.postMessage("stop");
      worker.onmessage = null;
    };
  }, []);
  return (
    <div>
      <h1>Big Array (Worker)</h1>
      <div className="card">Biggest number is {data[0]}</div>
    </div>
  );
};
