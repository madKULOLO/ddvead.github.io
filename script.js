const dvd = document.getElementById('dvd');
let posX = Math.random() * window.innerWidth;
let posY = Math.random() * window.innerHeight;
let speedX = 2;
let speedY = 2;

let lastTouchTime = 0;
const doubleTapThreshold = 300; 

function changeColor() {
  const randomHue = Math.floor(Math.random() * 360);
  dvd.style.filter = `hue-rotate(${randomHue}deg)`;
}

function moveDVD() {
  posX += speedX;
  posY += speedY;

  if (posX + dvd.offsetWidth >= window.innerWidth || posX <= 0) {
    speedX *= -1;
    changeColor();
  }
  if (posY + dvd.offsetHeight >= window.innerHeight || posY <= 0) {
    speedY *= -1;
    changeColor();
  }

  dvd.style.left = posX + 'px';
  dvd.style.top = posY + 'px';

  requestAnimationFrame(moveDVD);
}

moveDVD();

window.addEventListener('resize', () => {
  posX = Math.min(posX, window.innerWidth - dvd.offsetWidth);
  posY = Math.min(posY, window.innerHeight - dvd.offsetHeight);
});

document.body.addEventListener('dblclick', () => {
  alert('ЗАЧЕМ ДВАЖДЫ КЛИКАШИ? 😎');
});

document.body.addEventListener('touchstart', (e) => {
  const currentTime = new Date().getTime();
  if (currentTime - lastTouchTime < doubleTapThreshold) {
    alert('ШО ТЫ ЖМАЕШЬ С ВОЕГО ТЕЛЬФОНА? 😎');
  }
  lastTouchTime = currentTime;
});
