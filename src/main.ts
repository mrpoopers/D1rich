import banana from "./banana.png";
import "./style.css";

let clickCount = 0;
let bananasPer = 1;

interface Item {
  name: string;
  cost: number;
  rate: number;
  level: number;
  costMultiplier: number;
}

const availableItems: Item[] = [
  {
    name: "Banana Auto-Clicker",
    cost: 10,
    rate: 0.1,
    level: 0,
    costMultiplier: 1.5,
  },
  { name: "Banana Farmer", cost: 100, rate: 2, level: 0, costMultiplier: 1.6 },
  { name: "Banana Boss", cost: 1000, rate: 50, level: 0, costMultiplier: 2 },
];

// === Base Layout ===
document.body.innerHTML = `
  <h1 class="title">Banana Game</h1>
  <div class="image-container">
    <img src="${banana}" class="icon" id="clickable-image" />
    <div class="counter" id="click-count">0</div>
  </div>

  <p class="cps-display">Bananas per second: <span id="cps-display">1.0</span></p>

  <div id="upgrades-container"></div>
  <div id="message" class="message"></div>
`;

// ===== References =====
const image = document.getElementById("clickable-image");
const countDisplay = document.getElementById("click-count");
const cpsDisplay = document.getElementById("cps-display");
const messageBox = document.getElementById("message");
const upgradesContainer = document.getElementById("upgrades-container");

// ===== Upgrade Buttons =====
if (upgradesContainer) {
  availableItems.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("upgrade-row");
    div.innerHTML = `
      <span class="owned" id="owned-${index}">${item.level}</span>
      <button id="upgrade-${index}" class="upgrade-btn">
        ${item.name} (+${item.rate} bananas/sec) — Cost: ${item.cost}
      </button>
    `;
    upgradesContainer.appendChild(div);
  });
}

// ===== Utility Functions =====
function showMessage(text: string, duration = 1200) {
  if (!messageBox) return;
  messageBox.textContent = text;
  messageBox.style.opacity = "1";
  setTimeout(() => (messageBox.style.opacity = "0"), duration);
}

function updateBananasPerDisplay() {
  if (cpsDisplay) cpsDisplay.textContent = bananasPer.toFixed(1);
}

function updateCountDisplay() {
  if (countDisplay) countDisplay.textContent = clickCount.toFixed(1);
}

// ===== Manual Clicks =====
if (image) {
  image.addEventListener("click", () => {
    clickCount++;
    updateCountDisplay();

    image.classList.add("clicked");

    setTimeout(() => {
      image.classList.remove("clicked");
    }, 100);
  });
}

// ===== Auto Bananas =====
setInterval(() => {
  clickCount += bananasPer;
  updateCountDisplay();
}, 1000);

// ===== Event Listeners for Upgrades =====
availableItems.forEach((item, index) => {
  const button = document.getElementById(`upgrade-${index}`);
  const ownedDisplay = document.getElementById(`owned-${index}`);

  if (button) {
    button.addEventListener("click", () => {
      if (clickCount >= item.cost) {
        clickCount -= item.cost;
        item.level++;
        bananasPer += item.rate;
        item.cost = Math.floor(item.cost * item.costMultiplier);

        if (ownedDisplay) ownedDisplay.textContent = item.level.toString();
        updateCountDisplay();
        updateBananasPerDisplay();

        button.textContent =
          `${item.name} (+${item.rate} bananas/sec) — Cost: ${item.cost}`;
      } else {
        showMessage("Not enough bananas!");
      }
    });
  }
});
