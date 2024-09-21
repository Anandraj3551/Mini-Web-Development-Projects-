// const sizes = document.querySelectorAll(".size");
// const colors = document.querySelectorAll(".color");
// const fruits = document.querySelectorAll(".fruit");
// const gradients = document.querySelectorAll(".gradient");
// const fruitBg = document.querySelector(".fruitBackground");

// let prevColor = "blue";
// let animationEnd = true;

// function changeSize() {
//   sizes.forEach((size) => size.classList.remove("active"));
//   this.classList.add("active");
// }

// function changeColor() {
//   if (!animationEnd) return;
//   let primary = this.getAttribute("primary");
//   let color = this.getAttribute("color");
//   let fruit = document.querySelector(`.fruit[color="${color}"]`);
//   let gradient = document.querySelector(`.gradient[color="${color}"]`);
//   let prevGradient = document.querySelector(`.gradient[color="${prevColor}"]`);

//   if (color == prevColor) return;

//   colors.forEach((c) => c.classList.remove("active"));
//   this.classList.add("active");

//   document.documentElement.style.setProperty("--primary", primary);

//   fruits.forEach((s) => s.classList.remove("show"));
//   fruit.classList.add("show");

//   gradients.forEach((g) => g.classList.remove("first", "second"));
//   gradient.classList.add("first");
//   prevGradient.classList.add("second");

//   prevColor = color;
//   animationEnd = false;

//   gradient.addEventListener("animationend", () => {
//     animationEnd = true;
//   });
// }

// sizes.forEach((size) => size.addEventListener("click", changeSize));
// colors.forEach((c) => c.addEventListener("click", changeColor));

// let x = window.matchMedia("(max-width: 1000px)");

// function changeHeight() {
//   if (x.matches) {
//     let fruitHeight = fruits[0].offsetHeight;
//     fruitBg.style.height = `${fruitHeight * 0.9}px`;
//   } else {
//     fruitBg.style.height = "475px";
//   }
// }

// changeHeight();

// window.addEventListener("resize", changeHeight);

const sizes = document.querySelectorAll(".size");
const colors = document.querySelectorAll(".color");
const fruits = document.querySelectorAll(".fruit");
const gradients = document.querySelectorAll(".gradient");
const fruitBg = document.querySelector(".fruitBackground");
const fruitName = document.querySelector(".big");
const fruitDescription = document.querySelector(".text");
const priceElement = document.querySelector(".price h1");

let prevColor = "blue";
let animationEnd = true;

const fruitInfo = {
  blue: {
    name: "BlueBerry",
    description:
      "Blueberries are sweet, antioxidant-rich berries that support immune health and skin vitality. Perfect for snacking, smoothies, or adding to desserts.",
    prices: { 0.5: 100, 1: 200, 2: 399, 5: 899, 10: 1799 },
  },
  red: {
    name: "Apple",
    description:
      "Crisp and juicy, apples are rich in fiber and vitamin C. Great for snacking or adding to your favorite salad.",
    prices: { 0.5: 80, 1: 150, 2: 290, 5: 700, 10: 1300 },
  },
  green: {
    name: "Kiwi",
    description:
      "Kiwi is a tropical fruit packed with vitamin C and dietary fiber. Enjoy its sweet-tart flavor in smoothies or as a refreshing snack.",
    prices: { 0.5: 120, 1: 220, 2: 420, 5: 950, 10: 1850 },
  },
  orange: {
    name: "Orange",
    description:
      "Oranges are known for their vibrant color and high vitamin C content. Perfect for juicing or enjoying as a healthy snack.",
    prices: { 0.5: 90, 1: 180, 2: 350, 5: 800, 10: 1600 },
  },
  black: {
    name: "Blackberry",
    description:
      "Blackberries are juicy and packed with antioxidants. Great for desserts, jams, or eating fresh.",
    prices: { 0.5: 110, 1: 210, 2: 399, 5: 900, 10: 1750 },
  },
};

function changeSize() {
  sizes.forEach((size) => size.classList.remove("active"));
  this.classList.add("active");

  let selectedSize = this.textContent.trim();
  let selectedColor = document
    .querySelector(".color.active")
    .getAttribute("color");

  // Update price based on selected weight and color
  let price = fruitInfo[selectedColor].prices[selectedSize];
  priceElement.textContent = price;
}

function changeColor() {
  if (!animationEnd) return;
  let primary = this.getAttribute("primary");
  let color = this.getAttribute("color");
  let fruit = document.querySelector(`.fruit[color="${color}"]`);
  let gradient = document.querySelector(`.gradient[color="${color}"]`);
  let prevGradient = document.querySelector(`.gradient[color="${prevColor}"]`);

  if (color == prevColor) return;

  colors.forEach((c) => c.classList.remove("active"));
  this.classList.add("active");

  document.documentElement.style.setProperty("--primary", primary);

  fruits.forEach((s) => s.classList.remove("show"));
  fruit.classList.add("show");

  gradients.forEach((g) => g.classList.remove("first", "second"));
  gradient.classList.add("first");
  prevGradient.classList.add("second");

  // Update product info
  fruitName.textContent = fruitInfo[color].name;
  fruitDescription.textContent = fruitInfo[color].description;

  // Update price based on the current weight selection
  let selectedSize = document.querySelector(".size.active").textContent.trim();
  let price = fruitInfo[color].prices[selectedSize];
  priceElement.textContent = price;

  prevColor = color;
  animationEnd = false;

  gradient.addEventListener("animationend", () => {
    animationEnd = true;
  });
}

sizes.forEach((size) => size.addEventListener("click", changeSize));
colors.forEach((c) => c.addEventListener("click", changeColor));

let x = window.matchMedia("(max-width: 1000px)");

function changeHeight() {
  if (x.matches) {
    let fruitHeight = fruits[0].offsetHeight;
    fruitBg.style.height = `${fruitHeight * 0.9}px`;
  } else {
    fruitBg.style.height = "475px";
  }
}

changeHeight();
window.addEventListener("resize", changeHeight);
