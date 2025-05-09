import "./Home.css";
import { Link } from "react-router-dom";
import { Play, Question } from "@phosphor-icons/react";

export default function Home() {
  return (
    <div className="home">
      <div className="home-title">
        <h1>termoworm</h1>
      </div>

      <div className="buttons-main">
        <Link to={"/hotpotato"}>
          <button>iniciar <Play size={25} weight="fill" /> </button>
        </Link>

        <Link to={"/howtoplay"}>
          <button>como jogar <Question size={25} weight="fill" /></button>
        </Link>
      </div>
    </div>
  );
}
