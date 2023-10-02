import debounce from "debounce";
import { useCallback, useEffect, useState } from "react";

type MouseWheelProps = {
  targetRef: React.RefObject<HTMLElement>;
  maxScaleFactor?: number;
  minScaleFactor?: number;
};

type UseMouseWheelFunction = (props: MouseWheelProps) => {
  scaleFactor: number;
};

const useMouseWheel: UseMouseWheelFunction = ({
  targetRef,
  maxScaleFactor = 2.5,
  minScaleFactor = 1.0,
}) => {
  const [scaleFactor, setScaleFactor] = useState(1.0);
  const step = 0.1;

  const handleMouseWheel = useCallback(
    debounce((event: WheelEvent) => {
      const delta = event.deltaY || -event.detail;

      if (delta > 0) {
        setScaleFactor((prevScaleFactor) => {
          if (prevScaleFactor <= maxScaleFactor) {
            return prevScaleFactor + step;
          } else {
            return prevScaleFactor;
          }
        });
      } else if (delta < 0) {
        setScaleFactor((prevScaleFactor) => {
          if (prevScaleFactor >= minScaleFactor) {
            return prevScaleFactor - step;
          } else {
            return prevScaleFactor;
          }
        });
      }
    }, 10),
    []
  );

  useEffect(() => {
    const target = targetRef.current;

    if (target) {
      target.addEventListener("wheel", handleMouseWheel);

      return () => {
        target.removeEventListener("wheel", handleMouseWheel);
      };
    }
  }, [targetRef]);

  return {
    scaleFactor,
  };
};

export { useMouseWheel };
