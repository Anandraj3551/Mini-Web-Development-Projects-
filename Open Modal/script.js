const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const button = document.querySelector(".btn-follow");

//model Open
const openModal = () => {
  console.log("Modal is open");
  modal.classList.add("active");
  overlay.classList.add("overlayactive");
};

//modal Close
const closeModal = () => {
  modal.classList.remove("active");
  overlay.classList.remove("overlayactive");
};

// Toggle button text and background color on click
button.addEventListener("click", () => {
  if (button.innerHTML === "following") {
    button.innerHTML = "follow me";
    button.style.backgroundColor = ""; // Reset to original background color
  } else {
    button.innerHTML = "following";
    button.style.backgroundColor = "#4facfe"; // Change to the desired background color (e.g., green)
  }
});
