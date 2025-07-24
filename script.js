const opcoes = [
  "Libertadores", "Copa do Brasil", "Brasileirão",
  "Sul-americana","Brasileirão B"
];

const torneios = {
  "Libertadores": Range(1960,2024),
  "Copa do Brasil": Range(1989,2024),
  "Brasileirão": Range(2003,2024),
  "Brasileirão B": Range(2003,2024),
  "Sul-americana": Range(2002,2024)
};

function Range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

const roleta = document.getElementById("roleta");
const girarBtn = document.getElementById("girar");
const timeDiv = document.getElementById("time");
const anoDiv = document.getElementById("ano");

let anguloAtual = 0;

function desenharRoleta() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const size = 300;
  canvas.width = size;
  canvas.height = size;
  const numOpcoes = opcoes.length;
  const angulo = (2 * Math.PI) / numOpcoes;
  const cores = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#00A36C"];

  for (let i = 0; i < numOpcoes; i++) {
    ctx.beginPath();
    ctx.moveTo(size / 2, size / 2);
    ctx.fillStyle = cores[i % cores.length];
    ctx.arc(size / 2, size / 2, size / 2, i * angulo, (i + 1) * angulo);
    ctx.fill();

    ctx.save();
    ctx.translate(size / 2, size / 2);
    ctx.rotate(i * angulo + angulo / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "white";
    ctx.font = "bold 14px Arial";
    ctx.fillText(opcoes[i], size / 2 - 10, 5);
    ctx.restore();
  }

  roleta.innerHTML = "";
  roleta.appendChild(canvas);
}

desenharRoleta();

girarBtn.addEventListener("click", () => {
  girarBtn.disabled = true;
  timeDiv.textContent = "";
  anoDiv.textContent = "";

  const giros = 3 + Math.random() * 2;
  const anguloAleatorio = Math.random() * 360;
  const anguloTotal = 360 * giros + anguloAleatorio;

  anguloAtual += anguloTotal;
  roleta.style.transition = "transform 4s ease-out";
  roleta.style.transform = `rotate(-${anguloAtual}deg)`;

  roleta.addEventListener("transitionend", () => {
    const anguloPorOpcao = 360 / opcoes.length;

    const rotReal = ((-anguloAtual % 360) + 360) % 360;
    const anguloAjustado = (270 - rotReal + 360) % 360;
    const indexSelecionado = Math.floor(anguloAjustado / anguloPorOpcao) % opcoes.length;

    const torneio = opcoes[indexSelecionado];
    const ano = torneios[torneio][Math.floor(Math.random() * torneios[torneio].length)];

    timeDiv.textContent = torneio;
    anoDiv.textContent = `Ano: ${ano}`;
    girarBtn.disabled = false;
  }, { once: true });
});
