let display = document.getElementById("display");

function appendToDisplay(value) {
  display.value += value;
}

function calculate() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = "Error";
  }
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function reset() {
  display.value = "";
}
