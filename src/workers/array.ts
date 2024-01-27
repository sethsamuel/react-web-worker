let interval_id = 0;
onmessage = (e) => {
  if (e.data === "start") {
    interval_id = setInterval(() => {
      const data_size = 1_000_000;
      console.time("Generating array");
      const array = new Array(data_size).fill(0).map((_) => Math.random());
      console.timeEnd("Generating array");

      console.time("Sorting array");
      array.sort();
      console.timeEnd("Sorting array");

      postMessage(array);
    }, 1);
  } else if (e.data === "stop") {
    clearInterval(interval_id);
  } else {
    console.warn("Unknown message", e);
  }
};
