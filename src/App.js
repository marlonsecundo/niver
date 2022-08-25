import logo from "./logo.svg";
import "./App.css";
import "./animations.css";
import "./backgroundAnim.css";
import "./hackerSection.css";

import backImg from "./images/background.png";
import { useCallback, useEffect, useRef, useState } from "react";

import mrLogo from "./images/mrrobot-logo.png";

import confetti from "canvas-confetti";

import elliot from "./images/elliot.png";
import cakeday from "./images/cakeday.png";
import darlene from "./images/darlene.png";
import office2 from "./images/office2.png";

import Mouse from "./mouse";

import amem from "./images/amem.png";

import ReactAudioPlayer from "react-audio-player";

import robotAudio from "./ost/main.mp3";
import holyAudio from "./ost/holy.mp3";
import clapAudio from "./ost/claps.mp3";
import officeAudio from "./ost/office.mp3";
import hackingAudio from "./ost/hacking.mp3";

import useAudio from "./hooks/useAudio";

import startImage from "./images/start.png";
import useIsMobile from "./hooks/useIsMobile";
import { useDeviceSelectors } from "react-device-detect";
import HackerText, { hackerTextFunction } from "react-hacker-text";

const code = ["w", "w", "s", "s", "a", "d", "a", "d", "b", "a"];

const errorList = ["kkkk", "não consegue né", "incrivel", "pq choras julia?"];

function App() {
  const keys = useRef(new Array(10).fill(""));
  const [viewKeys, setViewKeys] = useState(new Array(10).fill(""));
  const [homeVisible, setHomeVisible] = useState(false);
  const [codeUnlocked, setCodeUnlocked] = useState(false);
  const [started, setStart] = useState(false);
  const isMobile = useIsMobile();
  const [selectors, data] = useDeviceSelectors(window.navigator.userAgent);
  const { isDesktop } = selectors;

  const [playingMR, toggleMR] = useAudio({ url: robotAudio, loop: true });
  const [playingClaps, toggleClaps] = useAudio({ url: clapAudio, loop: false });
  const [, toggleHoly] = useAudio({ url: holyAudio, loop: true });
  const [, toggleOffice] = useAudio({ url: officeAudio, loop: true });
  const [, toggleHacking] = useAudio({ url: hackingAudio, loop: true });

  const [squares, setSquares] = useState(
    new Array(10).fill("").map((v, i) => {
      return (
        <li
          key={i}
          style={{
            "--animColor": homeVisible ? "red" : "gray",
          }}
        ></li>
      );
    })
  );

  const [hackerTextVisible, setHackerTextVisible] = useState(false);

  const [error, setError] = useState();

  const rap = useRef();

  const index = useRef(0);

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");

  const handleConfirm = (d, m) => {
    try {
      const nDay = Number(d);
      const nMonth = Number(m);

      if (nDay === 9 && nMonth === 5) {
        setHackerTextVisible(true);
        toggleHacking();
        toggleMR();

        return;
      }
    } finally {
      setError(errorList[Math.floor(Math.random() * errorList.length)]);
    }
  };

  const showHappyBirthday = () => {
    setHomeVisible(true);

    toggleHacking();
    toggleClaps();
    toggleOffice();
    setHomeVisible(true);
    startFireworks();
  };

  const startFireworks = useCallback(() => {
    var duration = 60 * 1000;
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
          zIndex: 1,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          zIndex: 1,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);
  }, []);

  const updateViewKeys = () => {
    setViewKeys([...keys.current]);
  };

  const showSnow = useCallback(() => {
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
        zIndex: 3,
      });

      if (timeLeft > 0) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  useEffect(() => {
    if (codeUnlocked) {
      toggleHoly();
      toggleOffice();

      showSnow();
    }
  }, [codeUnlocked]);

  useEffect(() => {
    setSquares(
      new Array(10).fill("").map((v, i) => {
        return (
          <li
            key={i}
            style={{
              "--animColor": homeVisible ? "red" : "gray",
            }}
          ></li>
        );
      })
    );

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

  const [hackerIndex, setHackerIndex] = useState(0);

  if (isMobile || !isDesktop) {
    return (
      <div className="App">
        <section className="isMobile">
          <h1 className="mobileText">
            O SITE SÓ FUNCIONA NUM NAVEGADOR DE PC/NOTEBOOK
          </h1>
        </section>
      </div>
    );
  }

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

          <p className="startText">
            AUMENTE O SOM E DEIXE EM TELA CHEIA! (F11)
          </p>
        </section>
      )}
      <div className="area">
        <ul className="circles">{squares}</ul>
      </div>
      <Mouse happyVisible={homeVisible}></Mouse>

      {!hackerTextVisible && (
        <section className="lockscreen">
          <p className="areaText">AREA PROTEGIDA...</p>
          <div className="content">
            <p className="errorText">{error && `ERROR: ${error}`}</p>
            <img className="mrLogoImage" draggable={false} src={mrLogo}></img>

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

      {hackerTextVisible && !homeVisible && (
        <section className="hackerText">
          <p className="areaText">ESTABELECENDO CONEXÃO...</p>

          <HackerText
            text="$ AUTENTICANDO REQUISIÇÃO COM O SERVIDOR BASE..."
            speed={15}
            onFinished={() => setHackerIndex(hackerIndex + 1)}
          />

          {hackerIndex >= 1 && (
            <HackerText
              text="$ ABRINDO CONEXÃO PEER TO PEER E CRIANDO AMBIENTE SEGURO..."
              speed={15}
              delay={1000}
              onFinished={() => setHackerIndex(hackerIndex + 1)}
            />
          )}

          {hackerIndex >= 2 && (
            <HackerText
              text="$ FAZENDO O DOWNLOAD DOS DADOS CRIPTOGRAFADOS..."
              speed={15}
              delay={2000}
              onFinished={() => setHackerIndex(hackerIndex + 1)}
            />
          )}

          {hackerIndex >= 3 && (
            <HackerText
              text="$ BAIXANDO O VOLUME 8 DE MR ROBOT (QUEM DERA...)"
              speed={15}
              delay={1000}
              onFinished={() => setHackerIndex(hackerIndex + 1)}
            />
          )}

          {hackerIndex >= 4 && (
            <HackerText
              text="$ DESCRIPTOGRAFANDO DADOS COM A DATA_CHAVE... (QUASE LÁ)"
              speed={15}
              delay={4000}
              onFinished={() => setHackerIndex(hackerIndex + 1)}
            />
          )}

          {hackerIndex >= 5 && (
            <HackerText
              text="$ LIBERANDO O ACESSO..."
              speed={15}
              delay={1000}
              onFinished={() => setHackerIndex(hackerIndex + 1)}
            />
          )}

          {hackerIndex >= 6 && (
            <HackerText
              text="$ 3... 2... 1..."
              speed={150}
              delay={1000}
              onFinished={() => setHackerIndex(hackerIndex + 1)}
            />
          )}

          {hackerIndex >= 7 && (
            <HackerText
              text="CONCLUÍDO"
              speed={5}
              onFinished={() => showHappyBirthday()}
            />
          )}

          <span className="hackerDot">$</span>
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
              (Se achou que eu ia elogiar, haha)
              <br></br>
              Feliz niver, eu quero bolo, e vc ja ta me devendo o groot....
              (vale lembrar) ❤️<br></br>
            </p>

            <p className="bottomText">
              Ahhh tem um cod no site, vamos ver se vc descobre, e não são os
              confetes do mouse, e nem o the office... (DICA: codigo famoso dos
              jogos)
              <br></br>
              <p>
                {viewKeys.map((v, i) => {
                  if (v === "") return <span key={i}>_ </span>;

                  return <span key={i}>{v} </span>;
                })}
              </p>
            </p>
          </div>

          <a target={"_blank"} href="https://youtu.be/1LyZvcUAU0E">
            <img draggable={false} className="elliotImage" src={elliot}></img>
          </a>

          <a
            target={"_blank"}
            href="https://www.youtube.com/watch?v=xb2fjZa_L74&ab_channel=FlashbackFM_%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B0%D1%8F%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%8F"
          >
            <img draggable={false} className="cakedayImage" src={cakeday}></img>
          </a>
          <img draggable={false} className="darleneImage" src={darlene}></img>
          <a
            target={"_blank"}
            href="https://www.youtube.com/watch?v=o-YBDTqX_ZU&ab_channel=MusRest"
          >
            <img draggable={false} className="office2Image" src={office2}></img>
          </a>
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
