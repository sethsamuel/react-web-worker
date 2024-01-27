import { useEffect, useRef, useState } from "react";
import "./GameInline.css";

const worker = new Worker(new URL("../workers/game.ts", import.meta.url));

export default () => {
  const canvas_size = 1024;
  const [data, set_data] = useState<boolean[]>(
    new Array(canvas_size * canvas_size)
      .fill(0)
      .map((_) => Math.random() > 0.75)
  );

  useEffect(() => {
    worker.onmessage = (e) => {
      set_data(e.data);
    };
    return () => {
      worker.onmessage = null;
    };
  }, []);

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
      worker.postMessage({ data, canvas_size });
    });
    return () => {
      clearTimeout(request_id);
    };
  }, [data]);

  return <canvas ref={canvas_ref} width={canvas_size} height={canvas_size} />;
};
