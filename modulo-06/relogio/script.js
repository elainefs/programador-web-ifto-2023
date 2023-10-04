const horas = document.getElementById("horas");
const minutos = document.getElementById("minutos");
const segundos = document.getElementById("segundos");

function rotacionarPonteiro(ponteiro, angulo) {
  ponteiro.style.transform = `rotate(${angulo}deg)`;
}

function relogio() {
  horaAtual = new Date();
  let s = horaAtual.getSeconds() * 6;
  let m = horaAtual.getMinutes() * 6 + s / 60;
  let h = horaAtual.getHours() * 30 + m / 12;

  rotacionarPonteiro(segundos, s);
  rotacionarPonteiro(minutos, m);
  rotacionarPonteiro(horas, h);
}
relogio();

setInterval(relogio, 1000);
