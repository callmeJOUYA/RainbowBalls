let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");

class Ball {
  constructor(x, y) {
    this.baseR = random(5, 30);
    this.r = this.baseR;
    this.x = x || random(0 + this.r, window.innerWidth - this.r);
    this.y = y || random(0 + this.r, window.innerHeight - this.r);
    this.vx = random(-8, 8);
    this.vy = random(-8, 8);
    this.draw();
    this.rr = random(0, 255);
    this.g = random(0, 255);
    this.b = random(0, 255);
    this.a = random(0.2, 1);
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    c.fillStyle = `rgba(${this.rr}, ${this.g}, ${this.b}, ${this.a})`;
    c.fill();
  }

  update() {
    if (this.x + this.r > window.innerWidth || this.x - this.r < 0) {
      this.vx = -this.vx;
    }
    if (this.y + this.r > window.innerHeight || this.y - this.r < 0) {
      this.vy = -this.vy;
    }

    this.x += this.vx;
    this.y += this.vy;
    this.draw();
  }
}

const balls = [];
for (let i = 0; i < 500; i++) {
  balls.push(new Ball());
}

function animate() {
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  balls.forEach((b) => {
    b.update();
  });
  requestAnimationFrame(animate);
}

window.addEventListener("click", (e) => {
  balls.push(new Ball(e.clientX, e.clientY));
});

window.addEventListener("mousemove", (e) => {
  balls.forEach((ball) => {
    let distance = Math.sqrt(
      Math.pow(e.clientX - ball.x, 2) + Math.pow(e.clientY - ball.y, 2)
    );
    if (distance < 100 && ball.r < ball.baseR * 4) {
      ball.r += 2;
    } else if (ball.r > ball.baseR) {
      ball.r -= 2;
    }
  });
});

animate();

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
