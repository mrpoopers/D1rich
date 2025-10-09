import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

let clickCount = 0;

document.body.innerHTML = `
  <h1 class="title">Counter Game</h1>
  <div class="image-container">
    <img src="${exampleIconUrl}" class="icon" id="clickable-image" />
    <div class="counter" id="click-count">0</div>
  </div>
`;

const image = document.getElementById("clickable-image");
const countDisplay = document.getElementById("click-count");

if (image && countDisplay) {
  image.addEventListener("click", () => {
    clickCount++;
    countDisplay.textContent = clickCount.toString();
    console.log("Image clicked", clickCount);
  });
}
