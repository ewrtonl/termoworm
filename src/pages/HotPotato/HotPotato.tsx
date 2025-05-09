import { useEffect, useState, useMemo } from "react";
import "./HotPotato.css";
import {
  ArrowsClockwise,
  Play,
  HandPalm,
  HandPointing,
  Alarm,
} from "@phosphor-icons/react";
import { topics, alfa } from "../../topics";

export default function Home() {
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [timeOver, setTimeOver] = useState(false);

  function getRandomNumber() {
    const num: number = Math.floor(Math.random() * topics.length);
    setRandomNumber(num);
  }

  useEffect(() => {
    getRandomNumber();
  }, []);

  function changeTopic() {
    getRandomNumber();
  }

  function startTimer() {
    const id = setInterval(() => {
      setTime((prev) => {
        if (prev >= 9) {
          clearInterval(id);
          setTimeOver(true);
          return 10;
        }
        return prev + 1;
      });
    }, 1000);
    setIntervalId(id);
    setTimeOver(false);
  }

  function handleStart() {
    setGameStarted(true);
    setTime(0);
    startTimer();
  }

  function handleStop() {
    if (intervalId) clearInterval(intervalId);
    setTime(0);
    setTimeOver(false);
    startTimer();
  }

  function shuffleArray(array: string[]): string[] {
    const copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  }

  const letrasAleatorias = useMemo(() => shuffleArray(alfa), []);

  return (
    <div className="hotpotato">
      <div className="hotpotato-topic">
        <p>tema</p>
        <h2>{topics[randomNumber!]}</h2>

        <button
          className={`${gameStarted ? "hidden" : ""}`}
          onClick={changeTopic}
        >
          {" "}
          <ArrowsClockwise size={34} />
        </button>

        <div
          className={`timer ${gameStarted ? "" : "hidden"} ${
            timeOver ? "timeout" : ""
          }`}
        >
          <Alarm size={32} weight="fill" />
          <p>{time}</p>
        </div>
      </div>

      <button
        className={`roundButton ${gameStarted ? "hidden" : ""}`}
        onClick={handleStart}
      >
        {" "}
        <Play size={60} weight="fill" /> start
      </button>

      <button
        className={`roundButton ${gameStarted && !timeOver ? "" : "hidden"}`}
        onClick={handleStop}
      >
        {" "}
        <HandPalm size={60} weight="fill" /> stop
      </button>

      <button className={`roundButton ${timeOver ? "" : "hidden"}`}>
        {" "}
        <HandPointing size={60} weight="fill" /> next
      </button>

      <div className="keyboard">
        {letrasAleatorias.map((letter, index) => {
          return (
            <div key={index} className="letter">
              <p>{letter}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
