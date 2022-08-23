import logo from "./logo.svg";
import "./App.css";
import "./animations.css";

import backImg from "./images/background.png";
import { useEffect, useRef, useState } from "react";

import mrLogo from "./images/mrrobot-logo.png";

import confetti from "canvas-confetti";

import elliot from "./images/elliot.png";

import cakeday from "./images/cakeday.png";

import Mouse from "./mouse";

function App() {
  const [keys, setKeys] = useState(new Array(10).fill(""));

  const [homeVisible, setHomeVisible] = useState(false);

  const index = useRef(0);

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");

  const handleConfirm = (d, m) => {
    const nDay = Number(d);
    const nMonth = Number(m);

    if (nDay === 9 && nMonth === 5) {
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

  useEffect(() => {}, []);

  useEffect(() => {
    if (homeVisible) {
      console.log("fsf");
      window.addEventListener("keydown", (ev) => {
        if (index.current >= keys.length) {
          index.current = 0;
        }
        keys[index.current] = ev.key;

        setKeys(keys.map((v) => v));

        index.current += 1;
      });
    }
  }, [homeVisible]);

  useEffect(() => {
    console.log(keys);
    if (keys === ["w", "w", "s", "s", "a", "d", "a", "d", "b", "a"]) {
      console.log("foi");
    }
  }, [keys]);

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
      <div className="area">
        <ul className="circles">{squares}</ul>
      </div>
      <Mouse happyVisible={homeVisible}></Mouse>

      {!homeVisible && (
        <section className="lockscreen">
          <p className="areaText">AREA PROTEGIDA...</p>
          <div className="content">
            <img src={mrLogo}></img>
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
              Juliaaaa
            </h1>
            <p className="happyText">
              Ahhhhhhh, my frieeeendd parabenssss kkkkkk, venho por este site
              trazer de maneira bem formal meu parabpens e felicidades por esta
              incrivel pessoa que tu es. Pq fazer esse site todo e dedicar meu
              tempo pra comemorar? pq sim e pq eu quis, eh isso.
              <br></br>
              <br></br>
              (Se achou que eu ia elogiar, haha)
              <br></br>
              <br></br>
              Feliz niver, eu quero bolo, e vc ja ta me devendo o groot....
              (vale lembrar)
              <br></br>
              S2
              <br></br>
              <br></br>
              <br></br>
              Ahhh tem um cod no site, vamos ver se vc descobre, e não são os
              confetes do mouse... (DICA: codigo universal dos jogos)
            </p>

            <p className="bottomText">
              Ahhh e como levou um tempo pra fazer, quero um PIX de 10 reais.
            </p>
          </div>

          <img className="elliotImage" src={elliot}></img>
          <img className="cakedayImage" src={cakeday}></img>
        </section>
      )}
    </div>
  );
}

export default App;
