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
      size: 20,
    },
    contextMenu: {
      items: [
        {
          name: "Copy",
        },
        {
          name: "Cut",
        },
        {
          name: "Paste",
        },
      ],
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
        display: "flex",
        justifyContent: "center",
        border: "1px solid red",
        alignItems: "center",
        position: "relative",
      }}
      ref={ref}
    >
      {/* <input type="text" />
      <button>Click me</button>
      <textarea name="" id="" cols={30} rows={10}></textarea>
      <a href="https://google.com">Google</a> */}
    </div>
  );
}

export default App;
