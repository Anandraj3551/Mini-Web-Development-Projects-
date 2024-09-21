//Anand

const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type = checkbox]");
const symbols = "!@#$%^&*()_+{}[]|:;<>,.?/~`";

//initially
let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
// set strength circle color to grey
setIndicator("#ccc");

//set passwordLength
function handleSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
  //or kuch bhi karna chahiye ? - HW
  const min = inputSlider.min;
  const max = inputSlider.max;
  inputSlider.style.backgroundSize =
    ((passwordLength - min) * 100) / (max - min) + "% 100%";
}

function setIndicator(color) {
  indicator.style.backgroundColor = color;
  //AddShadow

  indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
  return getRndInteger(0, 9);
}

function generateLowerCase() {
  return String.fromCharCode(getRndInteger(97, 123));
}

function generateUpperCase() {
  return String.fromCharCode(getRndInteger(65, 91));
}

function generateSymbol() {
  const randNum = getRndInteger(0, symbols.length);
  return symbols.charAt(randNum);
}

function calcStrength() {
  let hasUppper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;

  if (uppercaseCheck.checked) hasUppper = true;
  if (lowercaseCheck.checked) hasLower = true;
  if (numbersCheck.checked) hasNum = true;
  if (symbolsCheck.checked) hasSym = true;

  if (hasUppper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasLower || hasUppper) &&
    (hasNum || hasSym) &&
    passwordLength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "Copied";
  } catch (e) {
    copyMsg.innerText = "Failed";
  }

  //to make span visible
  copyMsg.classList.add("active");
  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}

//function to suffle password

function shufflePassword(array) {
  //Fisher yates Method
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  let str = "";
  array.forEach((el) => (str += el));
  return str;
}
function handleCheckBoxChange() {
  checkCount = 0;
  allCheckBox.forEach((checkBox) => {
    if (checkBox.checked) checkCount++;
  });

  // special condition
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
}

allCheckBox.forEach((checkBox) => {
  checkBox.addEventListener("change", handleCheckBoxChange);
});

inputSlider.addEventListener("input", (e) => {
  passwordLength = e.target.value;
  handleSlider();
});

copyBtn.addEventListener("click", () => {
  if (passwordDisplay.value) copyContent();
});

// main generate button
generateBtn.addEventListener("click", () => {
  //none of the checkBox are selected
  if (checkCount == 0) return;

  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }

  //remove old password
  password = "";

  //let put the steff mention by checkbox

  let funcArr = [];
  if (uppercaseCheck.checked) funcArr.push(generateUpperCase);
  if (lowercaseCheck.checked) funcArr.push(generateLowerCase);
  if (numbersCheck.checked) funcArr.push(generateRandomNumber);
  if (symbolsCheck.checked) funcArr.push(generateSymbol);
  // Compulsary addition

  for (let i = 0; i < funcArr.length; i++) {
    password += funcArr[i]();
  }

  // remaining addition

  for (let i = 0; i < passwordLength - funcArr.length; i++) {
    let randIndex = getRndInteger(0, funcArr.length);
    console.log("randIndex" + randIndex);
    password += funcArr[randIndex]();
  }

  // suffle the password

  password = shufflePassword(Array.from(password));

  // show to the ui

  passwordDisplay.value = password;

  //calculate strength
  calcStrength();
});
