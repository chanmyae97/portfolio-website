let titleText = "Ethan Chan";
let currentIndex = 0;
let isDeleting = false;
let typingSpeed = 80;
let pauseTime = 1500;

function getRandomDelay(baseSpeed) {
  return baseSpeed + Math.random() * 40 - 20;
}

function animateTitle() {
  let displayText = titleText.substring(0, currentIndex);
  document.title = displayText + (currentIndex < titleText.length ? "|" : "");

  if (!isDeleting && currentIndex < titleText.length) {
    currentIndex++;
    setTimeout(animateTitle, getRandomDelay(typingSpeed));
  } else if (!isDeleting && currentIndex === titleText.length) {
    setTimeout(() => {
      isDeleting = true;
      animateTitle();
    }, pauseTime);
  } else if (isDeleting && currentIndex > 0) {
    currentIndex--;
    setTimeout(animateTitle, getRandomDelay(typingSpeed / 2));
  } else if (isDeleting && currentIndex === 0) {
    isDeleting = false;
    setTimeout(animateTitle, typingSpeed);
  }
}

export function startTitleAnimation() {
  animateTitle();
}
