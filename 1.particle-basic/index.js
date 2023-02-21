const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio;

// canvas의 style width,height와 canvas 자체의 width,height를 동일시 해줘야 한다.

const canvasWidth = innerWidth;
const canvasHeight = innerHeight;

canvas.style.width = canvasWidth + "px";
canvas.style.height = canvasHeight + "px";

canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;
ctx.scale(dpr, dpr);

/**
 * x : 시작 x좌표
 * y : 시작 y좌표
 * w : 너비 값
 * h : 높이 값
 */
// ctx.fillRect(10, 10, 50, 50);

// 원을 그릴때는 아크라는 메서드 사용
// ctx.beginPath(); // 나 Path를 그리기 시작할께라고 알려줘야 함

// ctx.arc(100, 100, 50, 0, (Math.PI / 180) * 360); // 라디안 각도를 사용하기 때문에 (Math.PI/180) 이 1도 이므로 여기에 360도를 곱한다.
// // ctx.stroke(); // 선을 그린다.
// ctx.fillStyle = "red";
// ctx.fill(); // 색을 채운다
// ctx.closePath();

class Particle {
  constructor(x, y, radius, vy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vy = vy;
    this.acc = 0.99;
  }
  update() {
    this.vy *= this.acc;
    this.y += this.vy;
  }
  draw() {
    ctx.beginPath(); // 나 Path를 그리기 시작할께라고 알려줘야 함
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();
  }
}

const TOTAL = 10;

const randomNumBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

let particles = [];

for (let i = 0; i < TOTAL; i++) {
  const x = randomNumBetween(0, canvasWidth);
  const y = randomNumBetween(0, canvasHeight);
  const radius = randomNumBetween(50, 100);
  const vy = randomNumBetween(1, 5);
  const particle = new Particle(x, y, radius, vy);
  particles.push(particle);
}

let interval = 1000 / 60;
let now, delta;
let then = Date.now();

function animate() {
  window.requestAnimationFrame(animate);
  now = Date.now();
  delta = now - then;
  if (delta < interval) return;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  particles.forEach((particle) => {
    particle.update();
    particle.draw();

    if (particle.y - particle.radius > canvasHeight) {
      particle.y = -particle.radius;
      particle.x = randomNumBetween(0, canvasWidth);
      particle.radius = randomNumBetween(50, 100);
      particle.vy = randomNumBetween(1, 5);
    }
  });

  then = now - (delta % interval);
}
animate();
