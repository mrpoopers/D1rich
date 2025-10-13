import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

let clickCount = 0;
let cps = 1;

// Upgrade 1
let upgradeLevel = 0;
let upgradeCost = 10;

// Upgrade 2
let upgradeLevelOne = 0;
let upgradeCostOne = 100;

// Upgrade 3
let upgradeLevelTwo = 0;
let upgradeCostTwo = 1000;

document.body.innerHTML = `
  <h1 class="title">Counter Game</h1>
  <div class="image-container">
    <img src="${exampleIconUrl}" class="icon" id="clickable-image" />
    <div class="counter" id="click-count">0</div>
  </div>

  <p class="cps-display">CPS: <span id="cps-display">1.0</span></p>

  <div class="upgrade-row">
    <span class="owned" id="owned-one">0</span>
    <button id="upgrade-one" class="upgrade-btn">
      Upgrade Auto Click (+0.1 cps) — Cost: ${upgradeCost}
    </button>
  </div>

  <div class="upgrade-row">
    <span class="owned" id="owned-two">0</span>
    <button id="upgrade-two" class="upgrade-btn">
      Buy Super Auto Click (+2.0 cps) — Cost: ${upgradeCostOne}
    </button>
  </div>

  <div class="upgrade-row">
    <span class="owned" id="owned-three">0</span>
    <button id="upgrade-three" class="upgrade-btn">
      Buy Super Duper Auto Click (+50 cps) — Cost: ${upgradeCostTwo}
    </button>
  </div>

  <div id="message" class="message"></div>
`;

const image = document.getElementById("clickable-image");
const countDisplay = document.getElementById("click-count");
const upgradeOne = document.getElementById("upgrade-one");
const upgradeTwo = document.getElementById("upgrade-two");
const upgradeThree = document.getElementById("upgrade-three");
const cpsDisplay = document.getElementById("cps-display");
const messageBox = document.getElementById("message");

const ownedOne = document.getElementById("owned-one");
const ownedTwo = document.getElementById("owned-two");
const ownedThree = document.getElementById("owned-three");

// Manual clicks
if (image && countDisplay) {
  image.addEventListener("click", () => {
    clickCount++;
    if (countDisplay) countDisplay.textContent = clickCount.toFixed(1);
  });
}

// Auto clicks (every second)
setInterval(() => {
  clickCount += cps;
  if (countDisplay) countDisplay.textContent = clickCount.toFixed(1);
}, 1000);

function showMessage(text: string, duration = 1200) {
  if (!messageBox) return;
  messageBox.textContent = text;
  messageBox.style.opacity = "1";
  setTimeout(() => {
    messageBox.style.opacity = "0";
  }, duration);
}

function updateCpsDisplay() {
  if (cpsDisplay) cpsDisplay.textContent = cps.toFixed(1);
}

// ===== Upgrade 1 =====
if (upgradeOne) {
  upgradeOne.addEventListener("click", () => {
    if (clickCount >= upgradeCost) {
      clickCount -= upgradeCost;
      upgradeLevel++;
      cps += 0.1;
      upgradeCost = Math.floor(upgradeCost * 1.5);
      if (ownedOne) ownedOne.textContent = upgradeLevel.toString();
      if (countDisplay) countDisplay.textContent = clickCount.toFixed(1);
      upgradeOne.textContent =
        `Upgrade Auto Click (+0.1 cps) — Cost: ${upgradeCost}`;
      updateCpsDisplay();
    } else {
      showMessage("Not enough clicks!");
    }
  });
}

// ===== Upgrade 2 =====
if (upgradeTwo) {
  upgradeTwo.addEventListener("click", () => {
    if (clickCount >= upgradeCostOne) {
      clickCount -= upgradeCostOne;
      upgradeLevelOne++;
      cps += 2.0;
      upgradeCostOne = Math.floor(upgradeCostOne * 1.6);
      if (ownedTwo) ownedTwo.textContent = upgradeLevelOne.toString();
      if (countDisplay) countDisplay.textContent = clickCount.toFixed(1);
      upgradeTwo.textContent =
        `Buy Super Auto Click (+2.0 cps) — Cost: ${upgradeCostOne}`;
      updateCpsDisplay();
    } else {
      showMessage("Not enough clicks!");
    }
  });
}

// ===== Upgrade 3 =====
if (upgradeThree) {
  upgradeThree.addEventListener("click", () => {
    if (clickCount >= upgradeCostTwo) {
      clickCount -= upgradeCostTwo;
      upgradeLevelTwo++;
      cps += 50.0;
      upgradeCostTwo = Math.floor(upgradeCostTwo * 2);
      if (ownedThree) ownedThree.textContent = upgradeLevelTwo.toString();
      if (countDisplay) countDisplay.textContent = clickCount.toFixed(1);
      upgradeThree.textContent =
        `Buy Super Duper Auto Click (+50 cps) — Cost: ${upgradeCostTwo}`;
      updateCpsDisplay();
    } else {
      showMessage("Not enough clicks!");
    }
  });
}
