window.onload = function() {
  let temp = document.getElementById("temperature");
  temp.addEventListener("input", handleInput);

  // Function to handle user input
  function handleInput() {
    let input = temp.value.trim();

    if (input.length > 0) {
      let value = parseFloat(input);
      let unit = input.slice(-1).toUpperCase();

      if (!isNaN(value)) {
        let convertedValue;

        if (unit === "C") {
          convertedValue = value;
        } else if (unit === "F") {
          convertedValue = (value - 32) * 5 / 9;
        } else if (unit === "K") {
          convertedValue = value - 273.15;
        } else {
          resetResults();
          return; // Exit the function if the temperature unit is not recognized
        }

        updateBackground(convertedValue);
        displayResults(convertedValue);
      } else {
        resetResults();
      }
    } else {
      resetResults();
    }
  }

  // Function to update the background color based on the temperature in Celsius
  function updateBackground(temperature) {
    let body = document.body;
    let hue;

    if (temperature <= -50) {
      hue = 240; // Blue (fixed color for temperatures below -50°C)
    } else if (temperature >= 200) {
      hue = 0; // Red (fixed color for temperatures above 200°C)
    } else {
      hue = 240 - ((temperature + 50) * 1.2); // Adjust the multiplier to control the color variation between -50°C and 200°C
    }

    // Add a 500 milliseconds (0.5 seconds) delay before updating the background
    setTimeout(function() {
      body.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
    }, 500);
  }


  // Function to display the results correctly
  function displayResults(value) {
    let celsius = document.getElementById("celsius");
    let fahrenheit = document.getElementById("fahrenheit");
    let kelvin = document.getElementById("kelvin");

    celsius.textContent = formatValue(value) + "°C";
    fahrenheit.textContent = formatValue(convertValue(value, "F")) + "°F";
    kelvin.textContent = formatValue(convertValue(value, "K")) + "K";
  }

  // Function to convert a temperature value to the desired scale
  function convertValue(value, scale) {
    if (scale === "C") {
      return value;
    } else if (scale === "F") {
      return (value * 9 / 5) + 32;
    } else if (scale === "K") {
      return value + 273.15;
    }
  }

  // Function to format the temperature value
  function formatValue(value) {
    if (Number.isInteger(value)) {
      return value.toString();
    } else {
      return value.toFixed(2);
    }
  }

  // Function to reset the results
  function resetResults() {
    let celsius = document.getElementById("celsius");
    let fahrenheit = document.getElementById("fahrenheit");
    let kelvin = document.getElementById("kelvin");

    celsius.textContent = "-";
    fahrenheit.textContent = "-";
    kelvin.textContent = "-";
  }

  // Initial call to set the background according to the current temperature
  handleInput();
};
