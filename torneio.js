const opcoes = [
  "Libertadores",
  "Copa do Brasil",
  "Brasileirão",
  "Sul-americana",
  "Brasileirão B"
];

const imagens = {
  "Libertadores": "img/libertadores.png",
  "Copa do Brasil": "img/copadobrasil.png",
  "Brasileirão": "img/brasileirao.png",
  "Sul-americana": "img/sulamericana.png",
  "Brasileirão B": "img/brasileiraob.png"
};

const roleta = document.getElementById("roleta");
const girarBtn = document.getElementById("girar");
const timeDiv = document.getElementById("time");

let anguloAtual = 0;

function desenharRoleta() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const size = 300;
  canvas.width = size;
  canvas.height = size;
  const centro = size / 2;
  const numOpcoes = opcoes.length;
  const angulo = (2 * Math.PI) / numOpcoes;
  const cores = ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"];

  let imagensCarregadas = 0;
  const imagensObj = {};

  for (let i = 0; i < opcoes.length; i++) {
    const opcao = opcoes[i];
    const img = new Image();
    img.src = imagens[opcao];
    img.onload = () => {
      imagensCarregadas++;
      imagensObj[opcao] = img;
      if (imagensCarregadas === opcoes.length) {
        desenharTudo();
      }
    };
  }

  function desenharTudo() {
    for (let i = 0; i < numOpcoes; i++) {
      const inicio = i * angulo;
      const fim = inicio + angulo;

      // Desenhar fatia
      ctx.beginPath();
      ctx.moveTo(centro, centro);
      ctx.fillStyle = cores[i % cores.length];
      ctx.arc(centro, centro, centro, inicio, fim);
      ctx.fill();
      // Adicionar borda
      ctx.strokeStyle = '#000000'; // Cor da borda (preto neste exemplo)
      ctx.lineWidth = 1; // Largura da borda em pixels
      ctx.stroke();

      // Desenhar imagem
      const img = imagensObj[opcoes[i]];
      const anguloCentro = inicio + angulo / 2;
      const imgX = centro + Math.cos(anguloCentro) * centro * 0.6 - 25;
      const imgY = centro + Math.sin(anguloCentro) * centro * 0.6 - 25;
      ctx.save();
      ctx.translate(imgX + 25, imgY + 25);
      ctx.rotate(anguloCentro);
      ctx.drawImage(img, -25, -25, 60, 60);
      ctx.restore();
    }

    roleta.innerHTML = "";
    roleta.appendChild(canvas);
  }
}

desenharRoleta();

girarBtn.addEventListener("click", () => {
  document.getElementById("proximoBtn").style.display = "none";
  girarBtn.disabled = true;
  timeDiv.textContent = "";

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
    timeDiv.textContent = torneio;
    localStorage.setItem("torneioSorteado", torneio);
    girarBtn.disabled = false;

    const proximoBtn = document.getElementById("proximoBtn");
    proximoBtn.style.display = "block"; // mostrar botão após giro
    
  }, { once: true });
});

proximoBtn.addEventListener("click", () => {
  window.location.href = "ano.html";
});
