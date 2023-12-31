const screen = document.getElementsByTagName("body")[0];
const game = new Game();
let nave;
const moveSpeed = 10;
const enemiesMax = 10;
const enemies = [];
const allyLaser = [];
const enemiesLaser = [];
const laserAcceleration = 3;
const laserDelay = 20;
let interval;

let soundtrack = document.getElementById("soundtrack");
soundtrack.volume = 0.2;

screen.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    game.isPause() ? game.start() : game.pause("Pause");
    soundtrack.play();
  } else if (event.key == "p") {
    game.pause("Pause");
    soundtrack.pause();
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
  const pageWrapper = document.querySelector('.page-wrapper');
  const panel = document.getElementById("panel");
  const scoreboard = document.getElementById("scoreboard");
  const panelMsg = document.querySelector(".msg");

  let score = 0;

  let pause = true;
  this.isPause = () => pause;

  this.w = () => screen.getBoundingClientRect().width;
  this.h = () => screen.getBoundingClientRect().height;

  this.start = () => {
    panel.style.display = "none";
    scoreboard.style.display = "flex";
    pause = false;
    if (nave == undefined) {
      nave = new GamerNave();
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
      if (raffle < enemies.length) {
        if (enemies[raffle].y() > 0) {
          enemies[raffle].fire();
        }
      }
      managerCollision();
    }, 50);
  };

  this.pause = (msg = "") => {
    pageWrapper.style.zIndex = '7';
    panel.style.display = "block";
    panelMsg.style.display = "block";
    panelMsg.textContent = msg;
    pause = true;
    nave.moveStop();
    clearInterval(interval);
  };

  this.gameOver = () => {
    this.pause("Game Over");
    pageWrapper.style.zIndex = '7';
    soundtrack.pause();
    screen.addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        location.reload();
      }
    });
  };

  this.toScore = () => {
    score++;
    scoreboard.querySelector("span").textContent = score;
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

  this.collision = () => element.remove();
  this.remove = () => element.remove();
}

function Nave(image = "wt") {
  let div = element("div", "nave");
  Ovni.call(this, div);

  let naveImg = document.createElement("img");
  naveImg.setAttribute("src", `assets/img/${image}.png`);
  div.appendChild(naveImg);

  this.onload = (fn) => (naveImg.onload = fn);
}

function GamerNave(image) {
  switch (Math.round(Math.random() * 1)) {
    case 1:
      image = "mf";
      break;
    case 2:
      image = "wf";
      break
  }

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

  this.collision = () => {
    game.gameOver();

    let explosion = element("img", "explosion");
    explosion.src = "assets/img/explosion-ally.gif";
    explosion.style.width = '100px'
    explosion.style.height = '100px'
    explosion = new Ovni(explosion);
    explosion.setXY(this.x() + 50, this.y());
    nave.remove();
    this.setBeginPosition();
  };
}

function EnemyNave(image = "cp1") {
  Nave.call(this, image);
  this.setBeginPosition = () => {
    let x = Math.round(Math.random() * (game.w() - this.w()));
    let y = Math.round(-this.h() - 10 - Math.random() * 1000);
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

  this.collision = () => {
    game.toScore();

    let explosion = element("img", "explosion");
    explosion.src = "assets/img/explosion-enemy.gif";
    explosion = new Ovni(explosion);
    explosion.setXY(this.x(), this.y());
    this.setBeginPosition();
    setTimeout(() => {
      explosion.remove();
    }, 900);
  };
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
}

function managerLasers(lasers) {
  lasers.forEach((item, index, list) => {
    item.animation();
    if (item.y() > game.h() + 10 || item.y() + item.h() + 10 < 0) {
      item.remove();
      list.splice(index, 1);
    }
  });
}

function managerCollision() {
  let collision = function (obj1, obj2) {
    let x = obj1.x() <= obj2.x() + obj2.w() && obj1.x() + obj1.w() >= obj2.x();
    let y = obj1.y() <= obj2.y() + obj2.h() && obj1.y() + obj1.h() >= obj2.y();
    if (x && y) {
      obj1.collision();
      obj2.collision();
      return true;
    }
    return false;
  };

  enemies.forEach((enemy, enemyIndex, enemies) => {
    allyLaser.forEach((laser, laserIndex, lasers) => {
      if (collision(enemy, laser)) {
        lasers.splice(laserIndex, 1);
      }
    });
    collision(nave, enemy);
  });

  enemiesLaser.forEach((laser) => {
    collision(nave, laser);
  });
}
