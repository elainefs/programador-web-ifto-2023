const screen = document.getElementsByTagName("body")[0];
const game = new Game();
let nave;
const moveSpeed = 10;

screen.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    game.isPause() ? game.start() : game.pause("Pause");
  } else if (event.key == "p") {
    game.pause("Pause");
  }
});

screen.addEventListener('keydown', function(event) {
  if(!game.isPause()){
    if(event.key == 'ArrowLeft') {
      nave.setXY(nave.x() - moveSpeed, nave.y);
    } else if(event.key == 'ArrowRight') {
      nave.setXY(nave.x() + moveSpeed, nave.y);
    }
  }
})

function Game() {
  const panel = document.getElementById("panel");
  const scoreboard = document.getElementById("scoreboard");
  const panelMsg = document.querySelector(".msg");

  let pause = true;
  this.isPause = () => pause;

  this.w = () => screen.getBoundingClientRect().width;
  this.h = () => screen.getBoundingClientRect().height;

  this.start = () => {
    panel.style.display = "none";
    scoreboard.style.display = "flex";
    pause = false;
    if (nave == undefined) {
      nave = new Nave(); //'mf' muda para millennium falcon
    }
  };

  this.pause = (msg = "") => {
    panel.style.display = "block";
    // scoreboard.style.display = 'none';
    panelMsg.style.display = "block";
    panelMsg.textContent = msg;
    pause = true;
  };
}

function Nave(image = "wt") {
  let div = document.createElement("div");
  div.classList.add("nave");
  screen.appendChild(div);

  let nave = document.createElement("img");
  nave.setAttribute("src", `assets/img/${image}.png`);
  div.appendChild(nave);

  this.setXY = (x, y) => {
    if(x < 0) {
      x = 0;
    } else if (x > game.w() - this.w()) {
      x = game.w() - this.w();
    }
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;
  };

  this.w = () => div.getBoundingClientRect().width;
  this.h = () => div.getBoundingClientRect().height;
  this.x = () => div.getBoundingClientRect().x;
  this.y = () => div.getBoundingClientRect().y;

  let beginPosition = () => {
    this.setXY(game.w() / 2 - this.w() / 2, game.h() - this.h() - 10);
  };

  nave.onload = beginPosition;
}

game.start();
