console.log("Hello world");
const data_size = 1_000 * 1_000;
const interval_id = setInterval(() => {
  console.time("Generating array");
  const array = new Array(data_size).fill(0).map((_) => Math.random());
  console.timeEnd("Generating array");

  console.time("Sorting array");
  array.sort();
  console.timeEnd("Sorting array");

  console.log(array.pop());
}, 1);
