const screen = document.getElementsByTagName("body")[0];
const game = new Game();
let nave;
const moveSpeed = 10;
const enemiesMax = 0;
const enemies = [];
const allyLaser = [];
let interval;

screen.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    game.isPause() ? game.start() : game.pause("Pause");
  } else if (event.key == "p") {
    game.pause("Pause");
  }

  if (event.key == " ") {
    nave.fire();
  }
});

screen.addEventListener("keydown", function (event) {
  if (!game.isPause()) {
    if (event.key == "ArrowLeft") {
      nave.setXY(nave.x() - moveSpeed, nave.y);
    } else if (event.key == "ArrowRight") {
      nave.setXY(nave.x() + moveSpeed, nave.y);
    }
  }
});

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
      for (let cont = 0; cont < enemiesMax; cont++) {
        let image = "cp1";
        switch (Math.round(Math.random() * 2)) {
          case 1:
            image = "iba";
            break;
          case 2:
            image = "iy";
            break;
        }
        enemies.push(new EnemyNave(image));
      }
    }
    interval = setInterval(() => {
      enemies.forEach((enemy) => {
        enemy.animation();
      });
    }, 100);
  };

  this.pause = (msg = "") => {
    panel.style.display = "block";
    // scoreboard.style.display = 'none';
    panelMsg.style.display = "block";
    panelMsg.textContent = msg;
    pause = true;
    clearInterval(interval);
  };
}

function Ovni(element) {
  this.w = () => element.getBoundingClientRect().width;
  this.h = () => element.getBoundingClientRect().height;
  this.x = () => element.getBoundingClientRect().x;
  this.y = () => element.getBoundingClientRect().y;

  this.setXY = (x, y) => {
    if (x < 0) {
      x = 0;
    } else if (x > game.w() - this.w()) {
      x = game.w() - this.w();
    }
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
  };
}

function Nave(image = "wt") {
  let div = element("div", "nave");
  Ovni.call(this, div);

  let naveImg = document.createElement("img");
  naveImg.setAttribute("src", `assets/img/${image}.png`);
  div.appendChild(naveImg);

  let beginPosition = () => {
    this.setXY(game.w() / 2 - this.w() / 2, game.h() - this.h() - 10);
  };

  naveImg.onload = beginPosition;
  this.onload = (fn) => (naveImg.onload = fn);

  this.fire = () => {
    laser = new Laser();
    let x = this.x() + this.w() / 2 - laser.w() / 2;
    let y = this.y() - laser.h() - 1;
    laser.setXY(x, y);
    allyLaser.push(laser);
  };
}

function EnemyNave(image = "cp1") {
  Nave.call(this, image);
  this.setBeginPosition = () => {
    let x = Math.round(Math.random() * (game.w() - this.w()));
    let y = Math.round(-this.h() - 10 - Math.random() * 1000);
    // y = 50;
    this.setXY(x, y);
  };

  this.animation = () => {
    this.setXY(this.x(), this.y() + moveSpeed);
    if (this.y() > game.h() + 20) {
      this.setBeginPosition();
    }
  };

  this.onload(this.setBeginPosition);
}

function element(tag, classe) {
  let element = document.createElement(tag);
  element.classList.add(classe);
  screen.appendChild(element);
  return element;
}

function Laser() {
  let div = element("div", "laser");
  Ovni.call(this, div);
}

game.start();
