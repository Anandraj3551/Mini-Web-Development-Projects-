window.onload = function () {
  // Get the elements we need
  var diagram = document.getElementById("diagram");
  var line2 = document.getElementById("line2");
  var distanceDisplay = document.getElementById("distance");

  // Set the position of line1 (it doesn't move)
  var line1Position = 50;

  // Variables to handle dragging
  var isDragging = false;
  var startMouseY;
  var startLine2Y;

  // Function to update the distance display
  function updateDistance() {
    var line2Position = parseInt(line2.style.top) || 150;
    var distance = Math.abs(line2Position - line1Position);
    distanceDisplay.innerHTML = distance;
  }

  // When the mouse is pressed on line2
  line2.onmousedown = function (e) {
    isDragging = true;
    startMouseY = e.clientY;
    startLine2Y = parseInt(line2.style.top) || 150;
    e.preventDefault();
  };

  // When the mouse moves
  document.onmousemove = function (e) {
    if (isDragging) {
      var mouseMoved = e.clientY - startMouseY;
      var newPosition = startLine2Y + mouseMoved;

      // Make sure line2 doesn't go above line1 or below the diagram
      if (newPosition < line1Position) {
        newPosition = line1Position;
      }
      if (newPosition > diagram.clientHeight - 2) {
        newPosition = diagram.clientHeight - 2;
      }

      line2.style.top = newPosition + "px";
      updateDistance();
    }
  };

  // When the mouse is released
  document.onmouseup = function () {
    isDragging = false;
  };

  // Update the distance when the page loads
  updateDistance();
};
