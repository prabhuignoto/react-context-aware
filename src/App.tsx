import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faCoffee,
  faCopy,
  faCut,
  faPaste,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import "./App.css";
import { useMouseSelection } from "./effects/useMouseSelection";

library.add(faCoffee, faCopy, faCut, faTrash, faCheck, faPaste);

function App() {
  const ref = useRef<HTMLDivElement>(null);
  useMouseSelection({
    targetRef: ref,
    status: "default",
    pointerStyle: {
      color: "blue",
      size: 20,
    },
    contextMenu: {
      items: [
        {
          name: "Copy",
          icon: <FontAwesomeIcon icon="copy" size="2x" />,
        },
        {
          name: "Cut",
          icon: <FontAwesomeIcon icon="cut" size="2x" />,
        },
        {
          divider: true,
        },
        {
          name: "Paste",
          icon: <FontAwesomeIcon icon="paste" size="2x" />,
        },
        {
          name: "Delete",
          icon: <FontAwesomeIcon icon="trash" size="2x" />,
        },
        {
          name: "Select All",
          disabled: true,
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
      <input type="text" />
      <button onClick={() => alert("red")}>Click me</button>
      <textarea name="" id="" cols={30} rows={10}></textarea>
      <a href="https://google.com">Google</a>
    </div>
  );
}

export default App;
