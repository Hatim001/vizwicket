import { useState, useEffect, useCallback } from "react";

function useResponsiveSize(ref: any) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const handleResize = useCallback(() => {
    if (ref.current) {
      setSize({
        width: ref.current.clientWidth,
        height: ref.current.clientHeight,
      });
    }
  }, [ref]);

  useEffect(() => {
    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        resizeObserver.unobserve(ref?.current);
      }
    };
  }, [ref, handleResize]);

  return size;
}

export default useResponsiveSize;
