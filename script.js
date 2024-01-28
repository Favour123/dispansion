"use strict";
const prompt = require("prompt-sync")();
class DescriptiveStatistics {
  constructor(data) {
    this.data = data;
  }

  // Measure of Central Tendency: Mean
  calculateMean() {
    const sum = this.data.reduce((acc, value) => acc + value, 0);
    return sum / this.data.length;
  }

  // Measure of Central Tendency: Median
  calculateMedian() {
    const sortedData = this.data.slice().sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedData.length / 2);

    if (sortedData.length % 2 === 0) {
      return (sortedData[middleIndex - 1] + sortedData[middleIndex]) / 2;
    } else {
      return sortedData[middleIndex];
    }
  }

  // Measure of Central Tendency: Mode
  calculateMode() {
    const frequencyMap = {};
    this.data.forEach(value => {
      frequencyMap[value] = (frequencyMap[value] || 0) + 1;
    });

    let mode;
    let maxFrequency = 0;

    for (const value in frequencyMap) {
      if (frequencyMap[value] > maxFrequency) {
        mode = Number(value);
        maxFrequency = frequencyMap[value];
      }
    }

    return mode;
  }

  // Measure of Dispersion: Range
  calculateRange() {
    const max = Math.max(...this.data);
    const min = Math.min(...this.data);
    return max - min;
  }

  // Measure of Dispersion: Variance
  calculateVariance() {
    const mean = this.calculateMean();
    const squaredDifferences = this.data.map(value => Math.pow(value - mean, 2));
    const sumSquaredDifferences = squaredDifferences.reduce((acc, value) => acc + value, 0);
    return sumSquaredDifferences / this.data.length;
  }

  // Measure of Dispersion: Standard Deviation
  calculateStandardDeviation() {
    return Math.sqrt(this.calculateVariance());
  }
}

// Function to collect data from the user
function collectUserData() {
  const data = [];
  let input;

  do {
    input = prompt("Enter a number (or type 'done' to finish):");

    if (input && input.toLowerCase() !== "done") {
      const number = parseFloat(input);
      if (!isNaN(number)) {
        data.push(number);
      } else {
        console.log("Invalid input. Please enter a valid number.");
      }
    }

  } while (input && input.toLowerCase() !== "done");

  return data;
}

// Collect data from the user
const userData = collectUserData();

// Calculate and display descriptive statistics
if (userData.length > 0) {
  const statsCalculator = new DescriptiveStatistics(userData);

  console.log("Mean:", statsCalculator.calculateMean());
  console.log("Median:", statsCalculator.calculateMedian());
  console.log("Mode:", statsCalculator.calculateMode());
  console.log("Range:", statsCalculator.calculateRange());
  console.log("Variance:", statsCalculator.calculateVariance());
  console.log("Standard Deviation:", statsCalculator.calculateStandardDeviation());
} else {
  console.log("No data entered. Exiting...");
}
