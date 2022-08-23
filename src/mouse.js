import React, { useEffect, useState } from "react";
import cursor from "./images/cursor.png";
import confetti from "canvas-confetti";

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function Mouse({ happyVisible }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (ev) => {
      setPos({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const handleMouseClick = (ev) => {
      if (happyVisible) {
        confetti({
          angle: randomInRange(0, 360),
          spread: randomInRange(50, 70),
          particleCount: randomInRange(50, 100),
          origin: { y: ev.y / window.innerHeight, x: ev.x / window.innerWidth },
        });
      }
    };

    window.addEventListener("mousedown", handleMouseClick);
    return () => {
      window.removeEventListener("mousedown", handleMouseClick);
    };
  }, [happyVisible]);

  return (
    <img
      style={{
        zIndex: 45,
        position: "absolute",
        width: 70,
        height: 70,
        left: pos.x - 35,
        top: pos.y - 35,
        pointerEvents: "none",
      }}
      src={cursor}
    ></img>
  );
}

export default Mouse;
