import { useEffect, useState } from "react";

export default () => {
  const [data, set_data] = useState<number[]>([]);
  const data_size = 1_000_000;
  useEffect(() => {
    const interval_id = setInterval(() => {
      console.time("Generating array");
      const array = new Array(data_size).fill(0).map((_) => Math.random());
      console.timeEnd("Generating array");

      console.time("Sorting array");
      array.sort();
      console.timeEnd("Sorting array");

      set_data(array);
    }, 1);
    return () => {
      clearInterval(interval_id);
    };
  }, []);
  return (
    <div>
      <h1>Big Array</h1>
      <div className="card">Biggest number is {data[0]}</div>
    </div>
  );
};
