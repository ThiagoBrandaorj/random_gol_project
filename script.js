const torneios = {
  "Brasileirão Série A": range(2003, 2024),
  "Copa do Brasil": range(1989, 2024),
  "Libertadores": range(1960, 2024),
  "Sul-Americana": range(2002, 2024),
  "Brasileirão Série B": range(2003, 2024)
};

function range(start, end) {
  return Array.from({ length: end - start }, (_, i) => start + i);
}

const opcoes = Object.keys(torneios);
const opcoesContainer = document.getElementById('opcoes');
const roleta = document.getElementById('roleta');
const girarBtn = document.getElementById('girar');
const timeDiv = document.getElementById('time');
const anoDiv = document.getElementById('ano');

const cores = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6'];

// Criar segmentos SVG
opcoes.forEach((opcao, index) => {
  const angle = 360 / opcoes.length;
  const startAngle = angle * index;
  const endAngle = angle * (index + 1);
  const rad = Math.PI / 180;

  const x1 = 100 + 100 * Math.cos(rad * startAngle);
  const y1 = 100 + 100 * Math.sin(rad * startAngle);
  const x2 = 100 + 100 * Math.cos(rad * endAngle);
  const y2 = 100 + 100 * Math.sin(rad * endAngle);

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const largeArc = angle > 180 ? 1 : 0;

  path.setAttribute("d", `M100,100 L${x1},${y1} A100,100 0 ${largeArc} 1 ${x2},${y2} Z`);
  path.setAttribute("fill", cores[index % cores.length]);

  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  const textAngle = (startAngle + endAngle) / 2;
  const tx = 100 + 60 * Math.cos(rad * textAngle);
  const ty = 100 + 60 * Math.sin(rad * textAngle);

  text.setAttribute("x", tx);
  text.setAttribute("y", ty);
  text.setAttribute("fill", "white");
  text.setAttribute("font-size", "10");
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("alignment-baseline", "middle");
  text.setAttribute("transform", `rotate(${textAngle}, ${tx}, ${ty})`);
  text.textContent = opcao;

  opcoesContainer.appendChild(path);
  opcoesContainer.appendChild(text);
});

let anguloAtual = 0;

girarBtn.addEventListener('click', () => {
  girarBtn.disabled = true;
  timeDiv.textContent = '';
  anoDiv.textContent = '';

  const giros = 3 + Math.random() * 2;
  const anguloPorOpcao = 360 / opcoes.length;
  const opcaoIndex = Math.floor(Math.random() * opcoes.length);
  const anguloFinal = opcaoIndex * anguloPorOpcao;
  const anguloTotal = 360 * giros + anguloFinal;

  anguloAtual += anguloTotal;
  roleta.style.transform = `rotate(-${anguloAtual}deg)`;

  setTimeout(() => {
    const torneio = opcoes[opcaoIndex];
    const ano = torneios[torneio][Math.floor(Math.random() * torneios[torneio].length)];

    timeDiv.textContent = torneio;
    anoDiv.textContent = `Ano: ${ano}`;
    girarBtn.disabled = false;
  }, giros * 1000);
});
