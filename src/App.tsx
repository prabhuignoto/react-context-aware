import { useRef } from "react";
import "./App.css";
import { useMouseSelection } from "./effects/useMouseSelection";

function App() {
  const ref = useRef<HTMLDivElement>(null);
  useMouseSelection({
    targetRef: ref,
    pointerSize: 20,
    pointerColor: "rgba(0, 123, 255, 1.0)",
  });

  return (
    <div
      style={{
        width: "70vw",
        height: "70vh",
        border: "1px solid red",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
      ref={ref}
    >
      {/* <span
        style={{
          width: `${width}px`,
          height: `${height}px`,
          position: "absolute",
          left: flipX ? x - width : x,
          top: flipY ? y - height : y,
          background: "rgba(0, 123, 255, 0.5)",
          border: "1px solid rgba(0, 123, 255, 0.6)",
          transition: "background 0.2s ease-in-out",
        }}
      ></span> */}
    </div>
  );
}

export default App;
