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
  faTrash,
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
    // darkMode: true,
    theme: {
      primary: "#007FFF",
      secondary: "#6495ED",
      iconSize: "1rem",
      darkMode: {
        menuBackgroundColor: "#1E1E1E",
        menuColor: "#fff",
        menuItemHoverColor: "#333",
      },
      defaultMode: {
        menuBackgroundColor: "#fff",
        menuColor: "#000",
        menuItemHoverColor: "#f5f5f5",
      },
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
    },
    onContextMenuSelected: (item) => {
      console.log(item);
    },
    contextMenu: {
      items: [
        {
          name: "Copy",
          // icon: <FontAwesomeIcon icon="copy" size="2x" />,
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
          // icon: <FontAwesomeIcon icon="trash" size="2x" />,
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
          // icon: <FontAwesomeIcon icon="save" size="2x" />,
        },
        {
          name: "Discard",
          // icon: <FontAwesomeIcon icon="trash" size="2x" />,
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
      <a href="https://google.com">Google</a>
      <input
        type="text"
        data-popup="true"
        data-type="text"
        data-content="This is a google site"
        data-position="right"
        data-width="200"
        data-height="100"
      />
      <button onClick={() => alert("red")}>Click me</button>
      <textarea name="" id="" cols={30} rows={10}></textarea>
      <a
        data-popup="true"
        data-type="image"
        data-content="https://cdn.pixabay.com/photo/2023/10/13/14/39/book-8312948_1280.jpg"
        data-position="left"
        data-width="900"
        data-height="700"
      >
        show image
      </a>
    </div>
  );
}

export default App;
