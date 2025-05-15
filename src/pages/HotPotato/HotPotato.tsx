import { useEffect, useRef, useState } from "react";
import "./HotPotato.css";
import {
  ArrowsClockwise,
  Play,
  HandPalm,
  HandPointing,
  Alarm,
  ArrowLeft,
  ArrowCounterClockwise,
} from "@phosphor-icons/react";
import { topics, alfa } from "../../topics";
import { Link } from "react-router-dom";
import timerSound from "../../assets/tictacnew.mp3";
import endSound from "../../assets/alarmnew.mp3";

export default function HotPotato() {
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [timeOver, setTimeOver] = useState(false);
  const [letrasAleatorias, setLetrasAleatorias] = useState<string[]>(() =>
    shuffleArray(alfa)
  );
  const [letrasSelecionadas, setLetrasSelecionadas] = useState<string[]>([]);

  const timerAudioRef = useRef<HTMLAudioElement | null>(null);
  const endAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    timerAudioRef.current = new Audio(timerSound);
    endAudioRef.current = new Audio(endSound);

    if (timerAudioRef.current) timerAudioRef.current.loop = true;

    return () => {
      timerAudioRef.current?.pause();
      endAudioRef.current?.pause();
    };
  }, []);

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
    setTime(15);

    const timerAudio = timerAudioRef.current;
    const endAudio = endAudioRef.current;

    if (timerAudio) {
      timerAudio.pause();
      timerAudio.currentTime = 0;
      timerAudio.play();
    }

    const id = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(id);

          if (timerAudio) {
            timerAudio.pause();
            timerAudio.currentTime = 0;
          }

          if (endAudio) {
            endAudio.play();
          }

          setTimeOver(true);
          return 0;
        }
        return prev - 1;
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

    const timerAudio = timerAudioRef.current;
    if (timerAudio) {
      timerAudio.pause();
      timerAudio.currentTime = 0;
    }

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
    return copia.slice(0, 20);
  }

  function handleNext() {
    setGameStarted(false);
    getRandomNumber();
    if (intervalId) clearInterval(intervalId);
    setTime(0);
    setTimeOver(false);
    setLetrasSelecionadas([]);
    setLetrasAleatorias(shuffleArray(alfa));
  }

  function handleRestart() {
    setGameStarted(true);
    startTimer();
  }

  function toggleLetraSelecionada(letra: string) {
    setLetrasSelecionadas((prev) =>
      prev.includes(letra) ? prev.filter((l) => l !== letra) : [...prev, letra]
    );
  }

  return (
    <div className="hotpotato">
      <div className="hotpotato-topic">
        <div className="hotpotato-topic-head">
          <Link to={"/"} className="backButton">
            <ArrowLeft size={32} />
          </Link>

          <p>tema</p>
        </div>

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
        <Play size={60} weight="fill" /> iniciar
      </button>

      <button
        className={`roundButton ${gameStarted && !timeOver ? "" : "hidden"}`}
        onClick={handleStop}
      >
        {" "}
        <HandPalm size={60} weight="fill" /> stop
      </button>

      <button
        className={`straightButton ${timeOver ? "" : "hidden"}`}
        onClick={handleRestart}
      >
        {" "}
        continuar rodada
        <ArrowCounterClockwise size={35} weight="fill" />
      </button>

      <button
        className={`straightButton ${timeOver ? "" : "hidden"}`}
        onClick={handleNext}
      >
        {" "}
        próxima
        <HandPointing size={35} weight="fill" className="iconHandPointing" />
      </button>

      <div className="keyboard">
        {letrasAleatorias.map((letter, index) => {
          const isSelected = letrasSelecionadas.includes(letter);
          return (
            <div
              key={index}
              className={`letter ${isSelected ? "selected" : ""}`}
              onClick={() => toggleLetraSelecionada(letter)}
            >
              <p>{letter}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
