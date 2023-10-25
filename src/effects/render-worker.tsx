// worker.js

import { renderToString } from "react-dom/server";

onmessage = ({ data }) => {
  try {
    // Deserialize JSON to element
    const { type, popupData } = data;

    // Render the component to a string
    const componentString = renderToString(
      <div>
        {type === "image" ? <img src={popupData} loading="lazy" /> : null}
        {type === "text" ? <span>{popupData}</span> : null}
      </div>,
    );

    postMessage(componentString);
  } catch (err: any) {
    // Report errors back to main thread
    postMessage({ error: err.message });
  }
};
