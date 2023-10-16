import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAreaChart,
  faBagShopping,
  faCheck,
  faCoffee,
  faCopy,
  faCut,
  faEarth,
  faGear,
  faPaste,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import "./App.css";
import { useMouseSelection } from "./effects/useMouseSelection";

library.add(
  faCoffee,
  faCopy,
  faCut,
  faTrash,
  faCheck,
  faPaste,
  faAreaChart,
  faBagShopping,
  faEarth,
  faGear,
  faSave,
  faTrash
);

function App() {
  const ref = useRef<HTMLDivElement>(null);
  useMouseSelection({
    targetRef: ref,
    status: "default",
    pointerStyle: {
      color: "blue",
      size: 20,
    },
    theme: {
      primary: "#007FFF",
      secondary: "#6495ED",
      iconSize: "1.1rem",
    },
    toolbar: {
      icons: [
        { name: "gear", icon: <FontAwesomeIcon icon="gear" size="2x" /> },
        { name: "earth", icon: <FontAwesomeIcon icon="earth" size="2x" /> },
        { name: "coffee", icon: <FontAwesomeIcon icon="coffee" size="2x" /> },
        {
          name: "area-chart",
          icon: <FontAwesomeIcon icon="area-chart" size="2x" />,
        },
      ],
      onSelect: (item) => {
        console.log(item);
      },
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
        {
          divider: true,
        },
        {
          name: "Save",
          icon: <FontAwesomeIcon icon="save" size="2x" />,
        },
        {
          name: "Discard",
          icon: <FontAwesomeIcon icon="trash" size="2x" />,
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
