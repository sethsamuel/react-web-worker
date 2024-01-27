const value_at_offset = (
  data: boolean[],
  size: number,
  x: number,
  y: number,
  dx: number,
  dy: number
) => {
  if (x - dx < 0 || x + dx >= size || y + dy < 0 || y + dy >= size) {
    return null;
  }
  return data[(y + dy) * size + (x + dx)];
};

const tick = (data: boolean[], size: number) => {
  console.time("Tick time");

  const new_data = new Array(data.length);
  data.forEach((v, i) => {
    // debugger;
    const x = i % size;
    const y = Math.floor(i / size);
    let live_neighbor_count = 0;
    [-1, 0, 1].forEach((dx) => {
      [-1, 0, 1].forEach((dy) =>
        (dx !== 0 || dy !== 0) && value_at_offset(data, size, x, y, dx, dy)
          ? live_neighbor_count++
          : null
      );
    });
    new_data[i] =
      live_neighbor_count < 2 || live_neighbor_count > 3
        ? false
        : live_neighbor_count === 3
        ? true
        : data[i];
  });
  console.timeEnd("Tick time");

  return new_data;
};

onmessage = (e) => {
  const { data, canvas_size }: { data: boolean[]; canvas_size: number } =
    e.data;
  postMessage(tick(data, canvas_size));
};
