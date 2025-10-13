import banana from "./banana.png";
import "./style.css";

let clickCount = 0;
let bananasPer = 1;

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
  <h1 class="title">Banana Game</h1>
  <div class="image-container">
    <img src="${banana}" class="icon" id="clickable-image" />
    <div class="counter" id="click-count">0</div>
  </div>

  <p class="cps-display">Bananas per second: <span id="cps-display">1.0</span></p>

  <div class="upgrade-row">
    <span class="owned" id="owned-one">0</span>
    <button id="upgrade-one" class="upgrade-btn">
      Banana Auto-Clicker (+0.1 bananas/sec) — Cost: ${upgradeCost}
    </button>
  </div>

  <div class="upgrade-row">
    <span class="owned" id="owned-two">0</span>
    <button id="upgrade-two" class="upgrade-btn">
      Banana Farmer (+2.0 bananas/sec) — Cost: ${upgradeCostOne}
    </button>
  </div>

  <div class="upgrade-row">
    <span class="owned" id="owned-three">0</span>
    <button id="upgrade-three" class="upgrade-btn">
      Banana Boss (+50.0 bananas/sec) — Cost: ${upgradeCostTwo}
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

// Auto bananas (every second)
setInterval(() => {
  clickCount += bananasPer;
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

function updateBananasPerDisplay() {
  if (cpsDisplay) cpsDisplay.textContent = bananasPer.toFixed(1);
}

// ===== Upgrade 1 =====
if (upgradeOne) {
  upgradeOne.addEventListener("click", () => {
    if (clickCount >= upgradeCost) {
      clickCount -= upgradeCost;
      upgradeLevel++;
      bananasPer += 0.1;
      upgradeCost = Math.floor(upgradeCost * 1.5);
      if (ownedOne) ownedOne.textContent = upgradeLevel.toString();
      if (countDisplay) countDisplay.textContent = clickCount.toFixed(1);
      upgradeOne.textContent =
        `Banana Auto-Clicker (+0.1 bananas/sec) — Cost: ${upgradeCost}`;
      updateBananasPerDisplay();
    } else {
      showMessage("Not enough bananas!");
    }
  });
}

// ===== Upgrade 2 =====
if (upgradeTwo) {
  upgradeTwo.addEventListener("click", () => {
    if (clickCount >= upgradeCostOne) {
      clickCount -= upgradeCostOne;
      upgradeLevelOne++;
      bananasPer += 2.0;
      upgradeCostOne = Math.floor(upgradeCostOne * 1.6);

      if (ownedTwo) ownedTwo.textContent = upgradeLevelOne.toString();
      if (countDisplay) countDisplay.textContent = clickCount.toFixed(1);

      upgradeTwo.textContent =
        `Banana Farmer (+2.0 bananas/sec) — Cost: ${upgradeCostOne}`;
      updateBananasPerDisplay();
    } else {
      showMessage("Not enough bananas!");
    }
  });
}

// ===== Upgrade 3 =====
if (upgradeThree) {
  upgradeThree.addEventListener("click", () => {
    if (clickCount >= upgradeCostTwo) {
      clickCount -= upgradeCostTwo;
      upgradeLevelTwo++;
      bananasPer += 50.0;
      upgradeCostTwo = Math.floor(upgradeCostTwo * 2);
      if (ownedThree) ownedThree.textContent = upgradeLevelTwo.toString();

      upgradeThree.textContent =
        `Banana Boss (+50.0 bananas/sec) — Cost: ${upgradeCostTwo}`;
      if (countDisplay) countDisplay.textContent = clickCount.toFixed(1);
      updateBananasPerDisplay();
    } else {
      showMessage("Not enough bananas!");
    }
  });
}
