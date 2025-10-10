import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

let clickCount = 0;
let cps = 0; // clicks per second
let upgradeLevel = 0;
let upgradeCost = 10; // initial cost

document.body.innerHTML = `
  <h1 class="title">Counter Game</h1>
  <div class="image-container">
    <img src="${exampleIconUrl}" class="icon" id="clickable-image" />
    <div class="counter" id="click-count">0</div>
  </div>
  <button id="count-upgrade" class="upgrade-btn">
    Upgrade Auto Click (+0.1 cps) — Cost: ${upgradeCost}
  </button>
  <div id="message" class="message"></div>
`;

const image = document.getElementById("clickable-image");
const countDisplay = document.getElementById("click-count");
const upgradeButton = document.getElementById("count-upgrade");
const messageBox = document.getElementById("message");

// Manual clicks
if (image && countDisplay) {
  image.addEventListener("click", () => {
    clickCount++;
    if (countDisplay) {
      countDisplay.textContent = clickCount.toFixed(1);
    }
  });
}

// Auto clicks every second
setInterval(() => {
  clickCount += cps;
  if (countDisplay) {
    countDisplay.textContent = clickCount.toFixed(1);
  }
}, 1000);

function showMessage(text: string, duration = 1200) {
  if (!messageBox) return;
  messageBox.textContent = text;
  messageBox.style.opacity = "1";
  setTimeout(() => {
    messageBox.style.opacity = "0";
  }, duration);
}

// Upgrade button
if (upgradeButton) {
  upgradeButton.addEventListener("click", () => {
    if (clickCount >= upgradeCost) {
      clickCount -= upgradeCost;
      upgradeLevel++;
      cps = 0.1 * upgradeLevel; // +0.1 per upgrade
      upgradeCost = Math.floor(upgradeCost * 1.5); // grows exponentially
      if (countDisplay) {
        countDisplay.textContent = clickCount.toFixed(1);
      }
      upgradeButton.textContent =
        `Upgrade Auto Click (+0.1 cps) — Cost: ${upgradeCost}`;
    } else {
      showMessage("Not enough clicks!");
    }
  });
}
