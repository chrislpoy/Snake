const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake;
let fruit;

(function setup() {
  snake = new Snake();
  fruit = new Fruit();
  fruit.pickLocation();

  window.setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fruit.draw();
    snake.update();
    snake.draw();

    if (snake.eat(fruit)) {
      fruit.pickLocation();
    }

    snake.checkCollision();
    document.querySelector('.score').innerText = snake.total;
  }, 100);

  document.addEventListener("keydown", keydown);
})();

function keydown(event) {
  const direction = event.key.replace("Arrow", "");
  snake.changeDirection(direction);
}

function Snake() {
  this.x = 0;
  this.y = 0;
  this.xSpeed = scale;
  this.ySpeed = 0;
  this.total = 0;
  this.tail = [];

this.draw = function() {
  ctx.fillStyle = "#1ca7d5";
  const lineWidth = 2; // Width of the outline

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "#000000"; // Black color for the outline

  for (let i = 0; i < this.tail.length; i++) {
    drawRoundRect(ctx, this.tail[i].x, this.tail[i].y, scale, scale, 5); // Adjust the radius as needed
  }

  drawRoundRect(ctx, this.x, this.y, scale, scale, 5); // Adjust the radius as needed
};

function drawRoundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
  ctx.fill();
  ctx.stroke(); // Draw the outline
}


  this.update = function() {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }

    this.tail[this.total - 1] = { x: this.x, y: this.y };

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x >= canvas.width) {
      this.x = 0;
    }

    if (this.y >= canvas.height) {
      this.y = 0;
    }

    if (this.x < 0) {
      this.x = canvas.width - scale;
    }

    if (this.y < 0) {
      this.y = canvas.height - scale;
    }
  };

  this.changeDirection = function(direction) {
    switch (direction) {
      case "Up":
        if (this.ySpeed === 0) {
          this.xSpeed = 0;
          this.ySpeed = -scale;
        }
        break;
      case "Down":
        if (this.ySpeed === 0) {
          this.xSpeed = 0;
          this.ySpeed = scale;
        }
        break;
      case "Left":
        if (this.xSpeed === 0) {
          this.xSpeed = -scale;
          this.ySpeed = 0;
        }
        break;
      case "Right":
        if (this.xSpeed === 0) {
          this.xSpeed = scale;
          this.ySpeed = 0;
        }
        break;
    }
  };

  this.eat = function(fruit) {
    if (this.x === fruit.x && this.y === fruit.y) {
      this.total++;
      return true;
    }
    return false;
  };

  this.checkCollision = function() {
    for (let i = 0; i < this.tail.length; i++) {
      if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
        this.total = 0;
        this.tail = [];
      }
    }
  };
}

function Fruit() {
  this.x;
  this.y;

  this.pickLocation = function() {
    this.x = (Math.floor(Math.random() * rows)) * scale;
    this.y = (Math.floor(Math.random() * columns)) * scale;
  };

  this.draw = function() {
    ctx.fillStyle = "#ff69b4";
    const radius = 5; // Adjust the radius as needed
    const lineWidth = 2; // Width of the outline

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "#000000"; // Black color for the outline
    drawRoundRect(ctx, this.x, this.y, scale, scale, radius);
  };
  
  function drawRoundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
    ctx.fill();
    ctx.stroke(); // Draw the outline
  }
  
}
