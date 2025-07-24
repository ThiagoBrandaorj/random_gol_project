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

// Cores modernas para os segmentos
const cores = [
    '#3498db', // Azul
    '#2ecc71', // Verde
    '#e74c3c', // Vermelho
    '#f39c12', // Laranja
    '#9b59b6'  // Roxo
];

// Criar segmentos da roleta
opcoes.forEach((opcao, index) => {
    const opcaoDiv = document.createElement('div');
    opcaoDiv.className = 'opcao';
    opcaoDiv.textContent = opcao;
    opcaoDiv.style.backgroundColor = cores[index % cores.length];
    opcaoDiv.style.transform = `rotate(${(360 / opcoes.length) * index}deg) skewY(-${90 - (360 / opcoes.length)}deg)`;
    opcoesContainer.appendChild(opcaoDiv);
});

girarBtn.addEventListener('click', () => {
    girarBtn.disabled = true;
    timeDiv.textContent = '';
    anoDiv.textContent = '';

    // Configurações do giro
    const giros = 3 + Math.random() * 2; // 3 a 5 giros
    const anguloPorOpcao = 360 / opcoes.length;
    const opcaoIndex = Math.floor(Math.random() * opcoes.length); // Sorteia o índice ANTES
    const anguloFinal = opcaoIndex * anguloPorOpcao; // Ângulo exato da opção sorteada
    const anguloTotal = 360 * giros + anguloFinal; // Giro completo + posição final

    // Aplica a rotação
    roleta.style.transform = `rotate(${-anguloTotal}deg)`;

    // Exibe o resultado (baseado no índice já sorteado)
    setTimeout(() => {
        const torneio = opcoes[opcaoIndex]; // Usa o índice pré-calculado
        const ano = torneios[torneio][Math.floor(Math.random() * torneios[torneio].length)];
        
        timeDiv.textContent = torneio;
        anoDiv.textContent = `Ano: ${ano}`;
        girarBtn.disabled = false;
    }, giros * 1000);
});