let login = document.getElementById("login");
let senha = document.querySelector('input[name="senha"]');
let h1 = document.getElementsByTagName("h1")[0];

function createAlert(msg, tipo = "sucesso") {
  let h3 = document.createElement("h3");
  h3.classList.add("msg");
  let img = document.createElement("img");
  img.src = "img/success.png";
  let text = document.createElement("div");
  text.textContent = msg;
  let span = document.createElement("span");
  span.classList.add("close");
  span.textContent = "X";
  span.addEventListener("click", function () {
    this.parentElement.remove();
  });

  if (tipo == "erro") {
    img.src = "img/error.png";
    h3.classList.add("error");
  }

  h3.appendChild(img);
  h3.appendChild(text);
  h3.appendChild(span);
  h1.insertAdjacentElement("afterend", h3);

  setTimeout(function () {
    h3.remove();
  }, 5000);
  return h3;
}

function alertSucesso(text) {
  return createAlert(text);
}

function alertError(text) {
  return createAlert(text, "erro");
}

function bloquearLogin(bloquear = true) {
  login.disabled = bloquear;
  senha.disabled = bloquear;
}

function logar() {
  login.style.borderColor = "";
  senha.style.borderColor = "";
  if (login.value == "") {
    login.style.borderColor = "red";
  }
  if (senha.value == "") {
    senha.style.borderColor = "red";
  }

  if (login.value == "elaine" && senha.value == "123456") {
    alertSucesso("Bem vinda Elaine!");
  } else {
    alertError("Login Inválido");
  }
}
