const dvd = document.getElementById('dvd');
const DVD_WIDTH = dvd.offsetWidth;
const DVD_HEIGHT = dvd.offsetHeight;
const SPEED = 2.5;
let posX = Math.random() * (window.innerWidth - DVD_WIDTH);
let posY = Math.random() * (window.innerHeight - DVD_HEIGHT);
let speedX = SPEED * (Math.random() > 0.5 ? 1 : -1);
let speedY = SPEED * (Math.random() > 0.5 ? 1 : -1);

let lastTouchTime = 0;
const doubleTapThreshold = 300;
let collisionCount = 0;
let glitchActive = false;

function changeColor() {
  const randomHue = Math.floor(Math.random() * 360);
  dvd.style.filter = `hue-rotate(${randomHue}deg)`;
}

function moveDVD() {
  posX += speedX;
  posY += speedY;

  let bounced = false;
  if (posX + DVD_WIDTH >= window.innerWidth || posX <= 0) {
    speedX *= -1;
    bounced = true;
  }
  if (posY + DVD_HEIGHT >= window.innerHeight || posY <= 0) {
    speedY *= -1;
    bounced = true;
  }
  if (bounced) {
    changeColor();
    collisionCount++;
    updateCounter();
  }

  dvd.style.left = posX + 'px';
  dvd.style.top = posY + 'px';

  requestAnimationFrame(moveDVD);
}

function updateCounter() {
  let counter = document.getElementById('counter');
  if (!counter) {
    counter = document.createElement('div');
    counter.id = 'counter';
    counter.style.position = 'fixed';
    counter.style.top = '20px';
    counter.style.right = '30px';
    counter.style.color = '#0ff';
    counter.style.fontSize = '1.5em';
    counter.style.fontFamily = 'monospace';
    counter.style.textShadow = '0 0 8px #000, 0 0 2px #fff';
    counter.style.zIndex = '1000';
    document.body.appendChild(counter);
  }
  counter.textContent = `Отскоков: ${collisionCount}`;
}

function startGlitch() {
  if (glitchActive) return;
  glitchActive = true;
  dvd.classList.add('glitch');
}

function stopGlitch() {
  glitchActive = false;
  dvd.classList.remove('glitch');
}

function handleGlitchAlert(message) {
  startGlitch();
  showCustomAlert(message, stopGlitch);
}

moveDVD();

window.addEventListener('resize', () => {
  posX = Math.min(posX, window.innerWidth - DVD_WIDTH);
  posY = Math.min(posY, window.innerHeight - DVD_HEIGHT);
});

document.body.addEventListener('dblclick', () => {
  handleGlitchAlert('ЗАЧЕМ ДВАЖДЫ КЛИКАШИ? 😎');
});

document.body.addEventListener('touchstart', (e) => {
  const currentTime = new Date().getTime();
  if (currentTime - lastTouchTime < doubleTapThreshold) {
    handleGlitchAlert('ШО ТЫ ЖМАЕШЬ С ВОЕГО ТЕЛЬФОНА? 😎');
  }
  lastTouchTime = currentTime;
});

function showCustomAlert(message, onClose) {
  let alertBox = document.getElementById('custom-alert');
  if (!alertBox) {
    alertBox = document.createElement('div');
    alertBox.id = 'custom-alert';
    alertBox.style.position = 'fixed';
    alertBox.style.left = '50%';
    alertBox.style.top = '10%';
    alertBox.style.transform = 'translate(-50%, 0)';
    alertBox.style.background = 'rgba(34,34,34,0.95)';
    alertBox.style.color = '#fff';
    alertBox.style.padding = '1.2em 2em';
    alertBox.style.borderRadius = '16px';
    alertBox.style.boxShadow = '0 0 24px #0ff, 0 0 2px #fff';
    alertBox.style.fontSize = '1.3em';
    alertBox.style.fontFamily = 'Segoe UI, Arial, sans-serif';
    alertBox.style.zIndex = '9999';
    alertBox.style.textAlign = 'center';
    document.body.appendChild(alertBox);
  }
  alertBox.textContent = message;
  alertBox.style.display = 'block';
  setTimeout(() => {
    alertBox.style.display = 'none';
    if (typeof onClose === 'function') onClose();
  }, 1800);
}
