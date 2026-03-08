import { useState, useEffect, useRef } from "react";

/**
 * Intersection Observer hook for scroll-triggered animations.
 * Returns { isInView, ref } — attach ref to the element you want to observe.
 * Once the element enters the viewport (by the given threshold), isInView becomes true permanently.
 */
const useInView = (threshold = 0.2) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { isInView, ref };
};

export default useInView;
