const screen = document.getElementsByTagName("body")[0];
const game = new Game();
let nave;
const moveSpeed = 20;
const enemiesMax = 10;
const enemies = [];
const allyLaser = [];
const enemiesLaser = [];
const laserAcceleration = 3;
const laserDelay = 10;
let interval;

screen.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    game.isPause() ? game.start() : game.pause("Pause");
  } else if (event.key == "p") {
    game.pause("Pause");
  }
  if (!game.isPause()) {
    if (event.key == " ") {
      nave.fire();
    }
    if (event.key == "ArrowLeft" || event.key == "ArrowRight") {
      nave.moveStop();
    }
  }
});

screen.addEventListener("keydown", function (event) {
  if (!game.isPause()) {
    if (event.key == "ArrowLeft") {
      nave.moveLeft();
    } else if (event.key == "ArrowRight") {
      nave.moveRight();
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
      nave = new GamerNave(); //'mf' muda para millennium falcon
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
      nave.animation();
      enemies.forEach((enemy) => {
        enemy.animation();
      });
      managerLasers(allyLaser);
      managerLasers(enemiesLaser);
      let raffle = Math.round(Math.random() * laserDelay);
      if(raffle < enemies.length) {
        if(enemies[raffle].y() > 0){
          enemies[raffle].fire();
        }
      }
    }, 100);
  };

  this.pause = (msg = "") => {
    panel.style.display = "block";
    panelMsg.style.display = "block";
    panelMsg.textContent = msg;
    pause = true;
    nave.moveStop();
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

  this.onload = (fn) => (naveImg.onload = fn);
}

function GamerNave(image = "wt") {
  Nave.call(this, image);
  let displacement = 0;

  let beginPosition = () => {
    this.setXY(game.w() / 2 - this.w() / 2, game.h() - this.h() - 10);
  };

  this.onload(beginPosition);

  this.fire = () => {
    laser = new Laser();
    let x = this.x() + this.w() / 2 - laser.w() / 2;
    let y = this.y() - laser.h() - 1;
    laser.setXY(x, y);
    allyLaser.push(laser);
  };

  this.moveStop = () => (displacement = 0);
  this.moveLeft = () => (displacement = -1);
  this.moveRight = () => (displacement = 1);

  this.animation = () => {
    this.setXY(this.x() + moveSpeed * displacement, this.y());
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

  this.fire = () => {
    laser = new Laser(true);
    let x = this.x() + this.w() / 2 - laser.w() / 2;
    let y = this.y() + this.h() + 1;
    laser.setXY(x, y);
    enemiesLaser.push(laser);
  };

  this.onload(this.setBeginPosition);
}

function element(tag, classe) {
  let element = document.createElement(tag);
  element.classList.add(classe);
  screen.appendChild(element);
  return element;
}

function Laser(enemy = false) {
  let div = element("div", "laser");
  let displacement = -1;
  Ovni.call(this, div);
  if (enemy) {
    div.classList.add("enemy");
    displacement = 1;
  }

  this.animation = () => {
    this.setXY(
      this.x(),
      this.y() + moveSpeed * laserAcceleration * displacement
    );
  };

  this.remove = () => div.remove();
}

function managerLasers(lasers) {
  lasers.forEach((item, index, list) => {
    item.animation();
    if(item.y() > game.h() + 10 || item.y() + item.h() + 10 < 0){
      item.remove();
      list.splice(index, 1);
    }
  });
}

game.start();
