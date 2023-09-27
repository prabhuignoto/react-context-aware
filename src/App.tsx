import { useRef } from "react";
import "./App.css";
import { useMouseSelection } from "./effects/useMouseSelection";

function App() {
  const ref = useRef<HTMLDivElement>(null);
  useMouseSelection({
    targetRef: ref,
    status: "default",
    pointerStyle: {
      color: "red",
      size: 50,
    },
    selectionStyle: {
      backgroundColor: "rgba(0, 123, 255, 0.1)",
      borderColor: "rgba(0, 123, 255, 0.5)",
      borderStyle: "solid",
      borderWidth: 0,
    },
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
      <input type="text" />

      <button>Click me</button>

      <textarea name="" id="" cols={30} rows={10}></textarea>

      <a href="https://google.com">Google</a>
    </div>
  );
}

export default App;
