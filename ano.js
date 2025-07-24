document.addEventListener("DOMContentLoaded", () => {
  const torneio = localStorage.getItem("torneioSorteado");
  const div = document.getElementById("torneio");

  if (torneio) {
    div.textContent = torneio;
  } else {
    div.textContent = "Nenhum torneio foi selecionado.";
  }
});
