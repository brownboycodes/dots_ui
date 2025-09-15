import { useEffect, useRef, useState } from "react";

const AnimatedCounter = ({ value, duration = 500 }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const previousValue = useRef(value);

  const tabCountStyle = {
    color: "#a3a3a3",
    fontSize: "0.75rem",
    fontWeight: "600",
    backgroundColor: "#f2f2f2",
    padding: "1px 4px 1px",
    borderRadius: "4px",
  };

  useEffect(() => {
    const start = previousValue.current;
    const end = value;
    const startTime = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const current = Math.floor(start + (end - start) * progress);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        previousValue.current = end; // update reference after animation completes
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span style={tabCountStyle}>{displayValue}</span>;
};

export default AnimatedCounter;
