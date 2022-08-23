import React, { useState, useEffect } from "react";

const useAudio = ({ url, loop = false }) => {
  const [audio] = useState(new Audio(url));

  audio.loop = loop;

  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

export default useAudio;
