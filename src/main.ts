import banana from "./banana.png";
import singlebanana from "./singlebanana.png";
import bananamascot from "./bananamascot.png";
import background from "./farmbackround.jpg";
import "./style.css";

document.body.style.setProperty("--farm-bg", `url(${background})`);

let clickCount = 300000000000;
let bananasPerSecond = 1;

interface Item {
  name: string;
  cost: number;
  rate: number;
  level: number;
  costMultiplier: number;
  description?: string;
}

const UpgradeItems: Item[] = [
  {
    name: "Banana Man",
    cost: 10,
    rate: 0.1,
    level: 0,
    costMultiplier: 1.5,
    description: "He's just a regular guy who loves bananas.",
  },
  {
    name: "Banana Farmer",
    cost: 100,
    rate: 2,
    level: 0,
    costMultiplier: 1.6,
    description: "A farmer who grows bananas.",
  },
  {
    name: "Banana Boss",
    cost: 1000,
    rate: 50,
    level: 0,
    costMultiplier: 2,
    description: "A boss who manages banana production.",
  },
  {
    name: "Banana Factory",
    cost: 5000,
    rate: 200,
    level: 0,
    costMultiplier: 2.5,
    description: "A factory that mass-produces bananas.",
  },
  {
    name: "Banana Planet",
    cost: 20000,
    rate: 1000,
    level: 0,
    costMultiplier: 3,
    description: "An entire planet dedicated to bananas.",
  },
];

// === Base Layout ===
document.body.innerHTML = `
  <h1 class="title">Banana Game</h1>
  <img src="${bananamascot}" alt="A banana" class="mascot">
  </div>
  <div class="image-container">
    <img src="${banana}" class="icon" id="clickable-image" />
    <div class="counter" id="click-count">0</div>
  </div>
  <div class="upgrade-wrapper">
    <h1 class="utitle">Upgrades</h1>
    <div id="upgrades-container"></div>
    <div id="message" class="message"></div>
  </div>
  <p class="cps-display">Bananas per second: <span id="cps-display">1.0</span></p>
  <div id="banana-bottom-bar"></div>
`;

// ===== References =====
const image = document.getElementById("clickable-image");
const countDisplay = document.getElementById("click-count");
const cpsDisplay = document.getElementById("cps-display");
const messageBox = document.getElementById("message");
const upgradesContainer = document.getElementById("upgrades-container");

// ===== Upgrade Buttons =====
if (upgradesContainer) {
  UpgradeItems.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("upgrade-row");
    div.innerHTML = `
  <span class="owned" id="owned-${index}">
    ${item.level}
  </span>

  <button
    id="upgrade-${index}"
    class="upgrade-btn"
    data-description="${item.description}"
  >
    ${item.name} (+${item.rate} bananas/sec) — Cost: ${item.cost}
  </button>
`;

    upgradesContainer.appendChild(div);
  });
}

// ===== Utility Functions =====

// shows a temporary on-screen message
function _showMessage(text: string, duration = 1200) {
  if (!messageBox) return;
  messageBox.textContent = text;
  messageBox.style.opacity = "1";
  setTimeout(() => (messageBox.style.opacity = "0"), duration);
}

//Updates the UI element that displays bananas per second
function updateBananasPerDisplay() {
  if (cpsDisplay) cpsDisplay.textContent = bananasPerSecond.toFixed(1);
}

//Updates the UI element that displays how many upgrades you have
function updateCountDisplay() {
  if (countDisplay) countDisplay.textContent = clickCount.toFixed(1);
}

function spawnBottomBanana() {
  const bar = document.getElementById("banana-bottom-bar");
  if (!bar) return;

  const emoji = document.createElement("span");
  emoji.textContent = "🍌";
  emoji.style.opacity = "0";
  emoji.style.transition = "opacity 0.4s ease";

  bar.appendChild(emoji);

  requestAnimationFrame(() => {
    emoji.style.opacity = "1";
  });
}

// ===== Manual Clicks =====
if (image) {
  image.addEventListener("click", () => {
    clickCount++;
    updateCountDisplay();

    //Banana Click Effect
    image.classList.add("clicked");
    setTimeout(() => {
      image.classList.remove("clicked");
    }, 100);

    //Spawn Banana Effect
    const bananaEl = document.createElement("img");
    bananaEl.src = singlebanana;
    bananaEl.className = "floating-banana";

    const rect = image.getBoundingClientRect();
    bananaEl.style.left = rect.left + rect.width / 2 - 25 + "px";
    bananaEl.style.top = rect.top + "px";
    document.body.appendChild(bananaEl);

    setTimeout(() => {
      bananaEl.remove();
    }, 1000);
  });
}

// ===== Auto Bananas =====
setInterval(() => {
  clickCount += bananasPerSecond;
  updateCountDisplay();
}, 1000);

// ===== Event Listeners for Upgrades =====
UpgradeItems.forEach((item, index) => {
  const button = document.getElementById(`upgrade-${index}`);
  const ownedDisplay = document.getElementById(`owned-${index}`);
  const message = document.getElementById("message");

  let isHovering = false; // track hover state

  if (button) {
    // Click behavior
    button.addEventListener("click", () => {
      if (clickCount >= item.cost) {
        clickCount -= item.cost;
        item.level++;
        bananasPerSecond += item.rate;
        item.cost = Math.floor(item.cost * item.costMultiplier);
        spawnBottomBanana();

        if (ownedDisplay) ownedDisplay.textContent = item.level.toString();
        updateCountDisplay();
        updateBananasPerDisplay();

        button.textContent =
          `${item.name} (+${item.rate} bananas/sec) — Cost: ${item.cost}`;
      } else {
        if (message) {
          message.textContent = "Not enough bananas!";
        }
        if (isHovering && message) {
          setTimeout(() => {
            message.textContent = item.description ?? "";
          }, 800);
        }
      }
    });

    // Hover behavior
    button.addEventListener("mouseenter", () => {
      isHovering = true;
      if (message) {
        message.textContent = item.description ?? "";
      }
    });

    button.addEventListener("mouseleave", () => {
      isHovering = false;
      if (message) {
        message.textContent = "";
      }
    });
  }
});
