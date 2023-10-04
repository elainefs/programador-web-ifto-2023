let vez = "X";
let start = true;
const jogo = document.querySelector("table");
const textvez = document.querySelector("h1");
jogo.addEventListener("click", function (event) {
  const clicado = event.target;
  const fundo = clicado.parentNode.querySelector(".fundo");
  if (clicado.textContent == "" && start) {
    clicado.textContent = vez;
    fundo.textContent = "";
    vez = vez == "X" ? "O" : "X";
    textvez.textContent = `Vez do ${vez}`;
    start = !calcularResultado();
  }
  if (!start) {
    document.getElementById("reset").style.display = "block";
  }
});

function calcularResultado() {
  let apostas = jogo.querySelectorAll("td .content");
  let jogadas = [];
  let velha = true;
  apostas.forEach((item) => {
    jogadas.push(item.textContent);
    if (item.textContent == "") {
      velha = false;
    }
  });

  let jogadas_possiveis = [];
  //colunas
  jogadas_possiveis.push([0, 1, 2]);
  jogadas_possiveis.push([3, 4, 5]);
  jogadas_possiveis.push([6, 7, 8]);

  //linhas
  jogadas_possiveis.push([0, 3, 6]);
  jogadas_possiveis.push([1, 4, 7]);
  jogadas_possiveis.push([2, 5, 8]);

  //diagonais
  jogadas_possiveis.push([0, 4, 8]);
  jogadas_possiveis.push([2, 4, 6]);

  gameover = false;
  jogadas_possiveis.forEach((i) => {
    if (
      jogadas[i[0]] == jogadas[i[1]] &&
      jogadas[i[1]] == jogadas[i[2]] &&
      jogadas[i[0]] != ""
    ) {
      textvez.innerHTML = `Parabéns o ${jogadas[i[0]]} ganhou!`;
      gameover = true;
    }
  });
  if (velha) {
    textvez.textContent = `Fim de jogo! deu velha`;
    jogo.style.background = "#ff0000";
    return true;
  }

  return gameover;
}
