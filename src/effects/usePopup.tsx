import {
  CSSProperties,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  MouseEvent
} from "react";
import { renderToString } from "react-dom/server";

type usePopupProps = {
  containerElement: HTMLElement;
};

type ContentType = "image" | "text";

type PopupProps = {
  type: ContentType;
  data: string;
  position: string;
  targetElementRect: {
    x: number;
    y: number;
  };
  popupDimensions?: {
    height: number;
    width: number;
  };
};

const Popup: FunctionComponent<PopupProps> = ({
  type,
  data,
  position,
  targetElementRect,
  popupDimensions = {
    height: 200,
    width: 300,
  },
}) => {
  const style = useMemo(
    () =>
      ({
        position: "fixed",
        left: targetElementRect.x,
        top: targetElementRect.y - popupDimensions.height,
        zIndex: 9999,
        border: "1px solid red",
      } as CSSProperties),
    [position, targetElementRect, popupDimensions]
  );

  return (
    <div className="popup" style={style}>
      {type === "image" ? <img src={data} /> : null}
      {type === "text" ? <span>{data}</span> : null}
    </div>
  );
};

const usePopup: (props: usePopupProps) => void = (props) => {
  const { containerElement } = props;

  const targetsRef = useRef<HTMLElement[] | null>();

  const handleMouseEnter = useCallback((ev: MouseEvent) => {
    const target = ev.target as HTMLElement;
    const targetRect = target.getBoundingClientRect();

    const type = target.getAttribute("data-type");
    const position = target.getAttribute("data-position");
    const data = target.getAttribute("data-data");

    if (data && type && position) {
      const placeholder = document.createElement("div");
      placeholder.style.cssText = `
        position: fixed;
        z-index: 9999;
        height: 200px;
        width: 400px;
      `;
      const popupString = renderToString(
        <Popup
          type={type as ContentType}
          data={data}
          position={position}
          targetElementRect={{
            x: targetRect.x,
            y: targetRect.y,
          }}
        />
      );
      placeholder.innerHTML = popupString;
      containerElement.appendChild(placeholder);
    }
  }, []);

  useEffect(() => {
    if (containerElement) {
      const targets = Array.from(containerElement.querySelectorAll("[data-popup='true]")) as HTMLElement[];

      if (targets.length) {
        targetsRef.current = targets;

        targets.forEach((target) => {
          target.addEventListener("mouseenter", handleMouseEnter);
        });
      }
    }
  }, [containerElement]);

  useEffect(() => {
    return () => {
      const targets = targetsRef.current;

      if (targets?.length) {
        targets.forEach((target) => {
          target.removeEventListener("mouseenter", handleMouseEnter);
        });
      }
    };
  }, []);
};

export { usePopup };
