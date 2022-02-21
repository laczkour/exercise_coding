import { useEffect, useRef, useState } from "react";
import "./mandelbrot.css";

const MAX_ITERATION = 255;

/* method is copy pasted from the much more sophisticated https://github.com/foqc/mandelbrot-set implementation */
const mandelbrot = (c) => {
  let z = { x: 0, y: 0 },
    n = 0,
    p,
    d;
  do {
    p = {
      x: Math.pow(z.x, 2) - Math.pow(z.y, 2),
      y: 2 * z.x * z.y,
    };
    z = {
      x: p.x + c.x,
      y: p.y + c.y,
    };
    d = 0.5 * (Math.pow(z.x, 2) + Math.pow(z.y, 2));
    n += 1;
  } while (d <= 2 && n < MAX_ITERATION);

  return [n, d <= 2];
};

const initialOptions = {
  width: 80,
  height: 45,
  centerX: 0,
  centerY: 0,
  coord_width: 4,
  zoom: {
    zoomCenterUpdateFrequency: 50,
    zoomCenterCounter: 0,
    zoomCenter: {
      x: -1,
      y: -0.5,
    },
    centerPanSpeed: 0.1,
    zoomSpeed: 0.98,
  },
};

const update = (canvas, setCanvas) => {
  //console.log(canvas);
  if (canvas === null) {
    canvas = {
      matrix: Array.from(
        Array(initialOptions.height),
        () => new Array(initialOptions.width)
      ),
      options: { ...initialOptions },
    };
    canvas.options.halfWidth = canvas.options.width / 2;
    canvas.options.halfHeight = canvas.options.height / 2;
    canvas.options.pixelZoom =
      canvas.options.coord_width / canvas.options.width;
  }
  canvas = { ...canvas };
  const options = canvas.options;
  const zoom = options.zoom;

  const matrix = canvas.matrix;
  for (let x = 0; x < options.width; x++) {
    for (let y = 0; y < options.height; y++) {
      const coord = {
        x: (x - options.halfWidth) * options.pixelZoom + options.centerX,
        y: (y - options.halfHeight) * options.pixelZoom + options.centerY,
      };
      if (x === 0 && y === 0) {
        //       console.log(coord);
      }
      const value = mandelbrot(coord);
      matrix[y][x] = { coord: coord, value: value };
    }
  }

  if (++zoom.zoomCenterCounter === zoom.zoomCenterUpdateFrequency) {
    zoom.zoomCenterCounter = 0;
    let zoomCoord = {};
    let bestValue = 0;
    for (let x = 1; x < options.width - 1; x++) {
      for (let y = 1; y < options.height - 1; y++) {
        const centerValue = matrix[y][x].value[0];
        let value = 0;
        for (let xx = -1; xx < 2; xx++) {
          for (let yy = -1; yy < 2; yy++) {
            value += Math.abs(centerValue - matrix[y + yy][x + xx].value[0]);
          }
        }
        const szorzo =
          1 -
          (Math.abs(x - options.halfWidth) / options.halfWidth +
            Math.abs(y - options.halfHeight) / options.halfHeight);
        value = value * szorzo;
        if (value > bestValue) {
          bestValue = value;
          zoomCoord = matrix[y][x].coord;
        }
      }
    }
    zoom.zoomCenter = zoomCoord;
  }

  options.pixelZoom *= zoom.zoomSpeed;
  options.centerX =
    options.centerX * (1 - zoom.centerPanSpeed) +
    zoom.zoomCenter.x * zoom.centerPanSpeed;
  options.centerY =
    options.centerY * (1 - zoom.centerPanSpeed) +
    zoom.zoomCenter.y * zoom.centerPanSpeed;

  setCanvas(canvas);
};

function _color(value) {
  if (value[1]) {
    return "white";
  } else {
    const iteration = value[0];
    const r = (iteration % 32) * 8;
    const g = (iteration % 16) * 16;
    const b = (iteration % 8) * 32;
    return `rgb(${r},${g},${b})`;
  }
}

function Pixel({ pixel, onClick }) {
  const color = _color(pixel.value);
  return (
    <div
      className="pixel"
      onClick={() => onClick(pixel.coord)}
      style={{ backgroundColor: color }}
    ></div>
  );
}

function Mandelbrot() {
  const [canvas, setCanvas] = useState(null);
  const currentCanvas = useRef(null);
  currentCanvas.current = canvas;
  //console.log('updated main');
  useEffect(() => {
    const timer = setTimeout(() => {
      console.timeEnd("rendering + timeout");
      console.time("calculation        ");
      update(currentCanvas.current, setCanvas);
      console.timeEnd("calculation        ");
      console.time("rendering + timeout");
    }, 10);

    return () => clearTimeout(timer);
  });

  const onClick = (coord) => {
    const canvas = { ...currentCanvas.current };
    canvas.options.zoom.zoomCenterCounter = 0;
    canvas.options.zoom.zoomCenter = { ...coord };

    setCanvas(canvas);
  };

  const matrix = canvas?.matrix?.map((row, rowIndex) => {
    const pixels = row.map((pixel, columnIndex) => {
      return (
        <Pixel
          pixel={pixel}
          onClick={onClick}
          key={rowIndex + " " + columnIndex}
        ></Pixel>
      );
    });
    return (
      <div className="pixelRow" key={rowIndex}>
        {pixels}
      </div>
    );
  });

  const changeZoomSpeed = (x) => {
    const canvas = { ...currentCanvas.current };
    if (x === 0) {
      canvas.options.zoom.zoomSpeed = 1;
    } else {
      canvas.options.zoom.zoomSpeed *= x;
    }

    setCanvas(canvas);
  };

  return (
    <div>
      <div className="Mandelbrot">{matrix}</div>

      <div className="buttonStorage">
        <div className="buttonDiv" onClick={() => changeZoomSpeed(1 / 1.01)}>
          <span>Zoom Speed++</span>
        </div>
        <div className="buttonDiv" onClick={() => changeZoomSpeed(1.01)}>
          <span>Zoom Speed--</span>
        </div>
        <div className="buttonDiv" onClick={() => changeZoomSpeed(0)}>
          <span>Stop zooming</span>
        </div>
      </div>
    </div>
  );
}

export default Mandelbrot;
