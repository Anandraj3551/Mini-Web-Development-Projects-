const colors = document.querySelectorAll(".color");
const card = document.querySelector(".card");
const productImage = document.querySelector(".imgBox img");
const productTitle = document.querySelector(".details h3 ");
const productDec = document.querySelector(".details p ");
const buyButton = document.querySelector(".buy-btn");
const detailsSection = document.querySelector(".details");
const techCircle = document.querySelector(".tech-circle");
const holographic = document.querySelector(".holographic");
const sizeButtons = document.querySelectorAll(".size li");
const price = document.querySelector(".price");

const imageSources = {
  green: "image/shoe1.png",
  blue: "image/shoe3.png",
  red: "image/shoe4.png",
  yellow: "image/shoe2.png",
};

const productTitles = {
  green: "Nike Dunk",
  blue: "Air Jordan 1",
  red: "Jumpman Air",
  yellow: "Nike Air Max",
};

function updateProduct(color, colorName) {
  const rgbaColor = `rgba(${parseInt(color.slice(1, 3), 16)},${parseInt(
    color.slice(3, 5),
    16
  )},${parseInt(color.slice(5, 7), 16)}`;

  card.style.boxShadow = "0 0 10px #fff";
  card.style.borderColor = color;
  detailsSection.style.background = "#0000";

  techCircle.style.borderColor = "#fff";
  techCircle.style.setProperty("--tech-circle-color", `${color}`);

  holographic.style.background = "#000";

  buyButton.style.background = `${colorName}`;
  buyButton.style.color = "#000";

  productTitle.style.color = "#fff";
  productDec.style.color = `${color}`;

  price.style.color = `${color}`;

  productImage.style.filter = `drop-shadow(0 0 10px ${color})`;

  productImage.src = imageSources[colorName];
  productImage.alt = `${colorName} shoe`;

  productTitle.innerHTML = `${productTitles[colorName]} `;

  sizeButtons.forEach((button) => {
    button.style.borderColor = `${color}`;
  });

  document.documentElement.style.setProperty("--primary-color", color);
}

colors.forEach((colorElement) => {
  colorElement.addEventListener("click", (event) => {
    colors.forEach((c) => c.classList.remove("active"));
    event.target.classList.add("active");
    const selectedColor = event.target.style.backgroundColor;
    const colorName = event.target.getAttribute("data-color");
    updateProduct(selectedColor, colorName);
  });
});

// Initialize with green color
updateProduct("#29b864", "green");
