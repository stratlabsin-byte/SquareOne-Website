import { useState, useEffect } from "react";

/**
 * Animated counter hook — counts from 0 to `end` over `duration` ms.
 * Only starts when `inView` is true. Returns the current count value.
 */
const useCountUp = (end, duration = 2000, inView = true) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || !end) return;

    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration, inView]);

  return count;
};

export default useCountUp;
