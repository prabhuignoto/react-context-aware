import debounce from "debounce";
import { useCallback, useEffect, useState } from "react";

type MouseWheelProps = {
  targetRef: React.RefObject<HTMLElement>;
  maxScaleFactor?: number;
  minScaleFactor?: number;
};

const useMouseWheel = ({
  targetRef,
  maxScaleFactor = 2.5,
  minScaleFactor = 1.0,
}: MouseWheelProps) => {
  const [scaleFactor, setScaleFactor] = useState<number>(1.0);
  const step = 0.1;

  // Function to clamp the scale factor within the min and max limits
  const clampScale = (newScale: number) => {
    return Math.min(Math.max(newScale, minScaleFactor), maxScaleFactor);
  };

  // Debounced wheel event handler
  const handleWheelEvent = (event: WheelEvent) => {
    const delta = event.deltaY || -event.detail;
    setScaleFactor((prevScaleFactor) => {
      const newScale =
        delta > 0 ? prevScaleFactor + step : prevScaleFactor - step;
      return clampScale(newScale);
    });
  };

  // Debounced version of the wheel event handler
  const debouncedHandleWheelEvent = useCallback(
    debounce(handleWheelEvent, 10),
    [maxScaleFactor, minScaleFactor] // Dependencies that could change the behavior
  );

  // Effect to attach the event listener to the target
  useEffect(() => {
    const target = targetRef.current;

    if (target) {
      target.addEventListener("wheel", debouncedHandleWheelEvent);

      // Cleanup function to remove the event listener
      return () => {
        target.removeEventListener("wheel", debouncedHandleWheelEvent);
      };
    }
  }, [targetRef, debouncedHandleWheelEvent]);

  return {
    scaleFactor,
  };
};

export { useMouseWheel };
