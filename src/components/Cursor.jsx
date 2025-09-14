// Cursor.jsx
import { useEffect, useState } from "react";

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveHandler = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveHandler);

    return () => {
      window.removeEventListener("mousemove", moveHandler);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: position.y,
        left: position.x,
        width: "16pt",
        height: "16pt",
        backgroundColor: "grey",
        opacity: 0.3,
        border: "2px solid black",
        borderRadius: "50%",
        pointerEvents: "none", // makes sure it doesn’t block clicks
        transform: "translate(-50%, -50%)", // center the circle on cursor
        zIndex: 9999,
      }}
    />
  );
};

export default Cursor;
