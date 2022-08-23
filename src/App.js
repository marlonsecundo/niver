import logo from "./logo.svg";
import "./App.css";

import backImg from "./images/background.png";
import { useEffect, useState } from "react";

import mrLogo from "./images/mrrobot-logo.png";

import confetti from "canvas-confetti";

import Mouse from "./mouse";

function App() {
  const [homeVisible, setHomeVisible] = useState(false);

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");

  const handleConfirm = (d, m) => {
    const nDay = Number(d);
    const nMonth = Number(m);
    // startFireworks();

    if (nDay === 9 && nMonth === 5) {
      setHomeVisible(true);
      startFireworks();
    }
  };

  const startFireworks = () => {
    var duration = 15 * 10000000;
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

  useEffect(() => {
    // startFireworks();
  }, []);

  return (
    <div className="App">
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <Mouse></Mouse>

      {!homeVisible && (
        <section className="lockscreen">
          <p className="areaText">AREA PROTEGIDA...</p>
          <div className="content">
            <img src={mrLogo}></img>
            <h2 className="digiteText">Data Chave</h2>

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
          <h1 className="happyMsg">
            Parabens
            <br></br>
            Julia
          </h1>
        </section>
      )}
    </div>
  );
}

export default App;
