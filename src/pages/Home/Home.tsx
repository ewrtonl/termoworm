import "./Home.css";
import { Link } from "react-router-dom";
import { Globe, Play, Question } from "@phosphor-icons/react";
import githublogo from "../../assets/githubwhite.svg";

export default function Home() {
  return (
    <div className="home">
      <div className="home-title">
        <h1>termworm</h1>
      </div>

      <div className="buttons-main">
        <Link to={"/hotpotato"}>
          <button>
            iniciar <Play size={25} weight="fill" />{" "}
          </button>
        </Link>

        <Link to={"/howtoplay"}>
          <button>
            como jogar <Question size={25} weight="fill" />
          </button>
        </Link>
      </div>

      <div className="footer">
        <a href="https://github.com/ewrtonl" target="_blank">
          <img src={githublogo} alt="" />
        </a>

        <div className="lang">
          <Globe size={22} />
          <p>Portuguese</p>
        </div>
      </div>
    </div>
  );
}
