import React, { useEffect, useState } from "react";
import cursor from "./images/cursor.png";

function Mouse() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.addEventListener("mousemove", (ev) => {
      console.log(ev.clientX);

      setPos({ x: ev.clientX, y: ev.clientY });
    });
  }, []);

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
