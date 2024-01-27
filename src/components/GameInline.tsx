import { useEffect, useRef, useState } from "react";
import "./GameInline.css";

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

  return new_data;
};

export default () => {
  const canvas_size = 1024;
  const [data, set_data] = useState<boolean[]>(
    new Array(canvas_size * canvas_size)
      .fill(0)
      .map((_) => Math.random() > 0.75)
  );
  const canvas_ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const context = canvas_ref.current?.getContext("2d");
    if (!context) {
      console.warn("Couldn't get context");
      return;
    }

    console.time("Image data create");
    const image_data = context.createImageData(canvas_size, canvas_size);
    data.forEach((v, i) => {
      image_data.data[i * 4] = v ? 255 : 0;
      //Alpha
      image_data.data[i * 4 + 3] = 255;
    });
    console.timeEnd("Image data create");
    context.putImageData(image_data, 0, 0);

    const request_id = requestAnimationFrame(() => {
      console.time("Tick time");
      set_data(tick(data, canvas_size));
      console.timeEnd("Tick time");
    });
    return () => {
      clearTimeout(request_id);
    };
  }, [data]);

  return <canvas ref={canvas_ref} width={canvas_size} height={canvas_size} />;
};
