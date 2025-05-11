import "./Info.css";
import { X } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import Tutorial from "../../assets/tutorial.png";

export default function Info() {
  return (
    <div className="infoContainer">
      <Link to={"/"} className="infoCloseBtn">
        <X size={27} />
      </Link>
      <div className="infoContent">
        <div className="infoContentOne">
          <h3>Como Jogar?</h3>
          <p>
            <span>1.</span> Escolha uma categoria e prepare-se para o desafio!
          </p>

          <p>
            <span>2.</span> Inicie a rodada – Você tem apenas 15 segundos para:
          </p>

          <ul>
            <li>
              • Dar uma resposta que se encaixe na categoria e comece com uma
              das letras disponíveis.
            </li>
            <li> • Pressionar a primeira letra da sua resposta.</li>
            <li> • Passar a vez antes do tempo acabar!</li>
          </ul>

          <p>
            <span>3.</span> Após pressionar a primeira letra da resposta e dar
            sua resposta, reinicie o cronômetro e passe a vez.
          </p>

          <img src={Tutorial} alt="" />
        </div>

        <div className="infoContentTwo">
          <h3>Cuidado!</h3>
          <p>
            ⏳ Jogadores são eliminados da rodada se não responderem antes do
            cronômetro chegar ao fim.
          </p>

          <p>
            🚫 Os jogadores também são eliminados se derem uma resposta
            considerada inaceitável pelos demais participantes.
          </p>

          <p>
            🔥 Após pressionar STOP, o cronômetro é reiniciado
            automaticamente. Você deve passar para o próximo jogador o mais
            rápido possível.
          </p>

          <p>
            🔠 As letras pressionadas não podem ser reutilizadas na mesma
            rodada, o que aumenta a pressão à medida que o jogo avança, tornando
            cada vez mais difícil pensar em uma nova resposta.
          </p>
        </div>

        <div className="infoContentTwo">
          <h3>Vitória</h3>
          <p>
            🏆 Continue jogando e eliminando participantes até que reste apenas
            um jogador. Esse jogador será o vencedor da rodada e receberá a
            pontuação.
          </p>
        </div>

        <div className="infoContentTwo">
          <h3>Desempate</h3>
          <p>
            ⚔️ No jogo, não há possibilidade de empate. Se mais de um jogador
            ainda estiver na rodada após todas as letras terem sido utilizadas,
            eles disputam uma rodada de desempate. Uma nova categoria é
            escolhida, e os jogadores restantes continuam jogando até que haja
            um vencedor.
          </p>
        </div>
      </div>
    </div>
  );
}
