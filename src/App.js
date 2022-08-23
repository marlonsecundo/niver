import logo from "./logo.svg";
import "./App.css";
import "./animations.css";

import backImg from "./images/background.png";
import { useCallback, useEffect, useRef, useState } from "react";

import mrLogo from "./images/mrrobot-logo.png";

import confetti from "canvas-confetti";

import elliot from "./images/elliot.png";

import cakeday from "./images/cakeday.png";

import Mouse from "./mouse";

import amem from "./images/amem.png";

import ReactAudioPlayer from "react-audio-player";

import robotAudio from "./ost/main.mp3";
import holyAudio from "./ost/holy.mp3";
import clapAudio from "./ost/claps.mp3";

import useAudio from "./hooks/useAudio";

import startImage from "./images/start.png";

const code = ["w", "w", "s", "s", "a", "d", "a", "d", "b", "a"];

const errors = ["kkkk", "não consegue né", "incrivel", "pq choras julia?"];

function App() {
  const keys = useRef(new Array(10).fill(""));
  const [viewKeys, setViewKeys] = useState(new Array(10).fill(""));
  const [homeVisible, setHomeVisible] = useState(false);
  const [codeUnlocked, setCodeUnlocked] = useState(false);
  const [started, setStart] = useState(false);

  const [playingMR, toggleMR] = useAudio({ url: robotAudio, loop: true });
  const [playingClaps, toggleClaps] = useAudio({ url: clapAudio, loop: false });
  const [, toggleHoly] = useAudio({ url: holyAudio, loop: true });

  const rap = useRef();

  const index = useRef(0);

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");

  const handleConfirm = (d, m) => {
    const nDay = Number(d);
    const nMonth = Number(m);

    if (nDay === 9 && nMonth === 5) {
      toggleMR();
      toggleClaps();
      setHomeVisible(true);
      startFireworks();
    }
  };

  const startFireworks = () => {
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);
  };

  const updateViewKeys = () => {
    setViewKeys([...keys.current]);
  };

  useEffect(() => {
    if (codeUnlocked) {
      toggleHoly();
      var duration = 15 * 10000000;
      var animationEnd = Date.now() + duration;
      var skew = 1;

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      (function frame() {
        var timeLeft = animationEnd - Date.now();
        var ticks = Math.max(200, 500 * (timeLeft / duration));
        skew = Math.max(0.8, skew - 0.001);

        confetti({
          particleCount: 1,
          startVelocity: 0,
          ticks: ticks,
          origin: {
            x: Math.random(),
            // since particles fall down, skew start toward the top
            y: Math.random() * skew - 0.2,
          },
          colors: ["#ffffff"],
          shapes: ["circle"],
          gravity: randomInRange(0.4, 0.6),
          scalar: randomInRange(0.4, 1),
          drift: randomInRange(-0.4, 0.4),
        });

        if (timeLeft > 0) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }, [codeUnlocked]);

  useEffect(() => {
    if (homeVisible) {
      const handleKeyDown = (ev) => {
        if (ev.key === "Backspace") {
          index.current = 0;
          keys.current = new Array(10).fill("");
          updateViewKeys();
          return;
        }

        if (ev)
          if (index.current >= keys.current.length) {
            index.current = 0;
          }

        keys.current[index.current] = ev.key;

        updateViewKeys();

        const result = keys.current.every((v, i) => v == code[i]);

        if (result) {
          setCodeUnlocked(true);
        }

        index.current += 1;
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [homeVisible]);

  const squares = new Array(10).fill("").map((v, i) => {
    return (
      <li
        key={i}
        style={{
          "--animColor": homeVisible ? "red" : "gray",
        }}
      ></li>
    );
  });

  return (
    <div className="App">
      {!started && (
        <section className="start">
          <button
            className="startButton"
            onClick={() => {
              toggleMR();
              setStart(true);
            }}
          >
            <img src={startImage}></img>
          </button>
        </section>
      )}
      <div className="area">
        <ul className="circles">{squares}</ul>
      </div>
      <Mouse happyVisible={homeVisible}></Mouse>

      {!homeVisible && (
        <section className="lockscreen">
          <p className="areaText">AREA PROTEGIDA...</p>
          <div className="content">
            <img draggable={false} src={mrLogo}></img>
            <h2 className="digiteText">
              <span style={{ "--i": 1 }}>D</span>
              <span style={{ "--i": 2 }}>A</span>
              <span style={{ "--i": 3 }}>T</span>
              <span style={{ "--i": 4 }}>A</span>
              <span>_</span>
              <span style={{ "--i": 5 }}>C</span>
              <span style={{ "--i": 6 }}>H</span>
              <span style={{ "--i": 7 }}>A</span>
              <span style={{ "--i": 8 }}>V</span>
              <span style={{ "--i": 9 }}>E</span>
            </h2>

            <div className="inputs">
              <div className="column align-itens-center">
                <label className="label" htmlFor="dia">
                  DIA
                </label>
                <input
                  pattern="\d*"
                  maxLength="2"
                  className="dateInput"
                  name="dia"
                  type={"text"}
                  onChange={(ev) => setDay(ev.target.value)}
                ></input>
              </div>

              <div className="space"></div>

              <div className="column align-itens-center">
                <label className="label" htmlFor="mes">
                  MES
                </label>
                <input
                  pattern="\d*"
                  maxLength={2}
                  className="dateInput"
                  name="mes"
                  type={"text"}
                  onChange={(ev) => setMonth(ev.target.value)}
                ></input>
              </div>
            </div>

            <button
              className="confirm-button"
              onClick={() => {
                handleConfirm(day, month);
              }}
            >
              ACESSAR
            </button>
          </div>
        </section>
      )}

      {homeVisible && (
        <section className={"home"}>
          <div className="column">
            <h1 className="happyMsg">
              Parabeeens
              <br></br>
              Juliaaaa!!
            </h1>
            <p className="happyText">
              🎉🎉🎉
              <br></br>
              <br></br>
              Ahhhhhhh, my frieeeendd parabenssss 🥳 kkkkkk, venho por este site
              trazer de maneira bem formal meu parabpens e felicidades por esta
              incrivel pessoa que tu es. Pq fazer esse site todo e dedicar meu
              tempo pra comemorar? pq sim e pq eu quis, eh isso <br></br>
              <br></br>
              🎉🎉🎉
              <br></br>
              <br></br>
              <br></br>
              (Se achou que eu ia elogiar, haha)
              <br></br>
              <br></br>
              <br></br>
              Feliz niver, eu quero bolo, e vc ja ta me devendo o groot....
              (vale lembrar)
              <br></br>❤<br></br>
            </p>

            <p className="bottomText">
              Ahhh tem um cod no site, vamos ver se vc descobre, e não são os
              confetes do mouse... (DICA: codigo universal dos jogos)
              <br></br>
              <p>
                {viewKeys.map((v, i) => {
                  if (v === "") return <span key={i}>_ </span>;

                  return <span key={i}>{v} </span>;
                })}
              </p>
            </p>
          </div>

          <img draggable={false} className="elliotImage" src={elliot}></img>
          <img draggable={false} className="cakedayImage" src={cakeday}></img>
        </section>
      )}

      {codeUnlocked && (
        <section className="codeContent">
          <img draggable={false} className="amemImage" src={amem}></img>
          <p className="amemText">kkkk</p>
        </section>
      )}
    </div>
  );
}

export default App;
