const crypto = require("crypto");

function generateRandomCode(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const halfLength = Math.ceil(length / 2);

  let randomLetters = "";
  let randomNumbers = "";

  // Generate random letters
  for (let i = 0; i < halfLength; i++) {
    const randomIndex = crypto.randomInt(52); // 26 for uppercase + 26 for lowercase
    randomLetters += characters.charAt(randomIndex);
  }

  // Generate random numbers
  for (let i = 0; i < halfLength; i++) {
    const randomIndex = crypto.randomInt(10) + 52; // Start from index 52 for numbers
    randomNumbers += characters.charAt(randomIndex);
  }

  // Shuffle the combined string
  const combinedString = randomLetters + randomNumbers;
  const shuffledString = combinedString
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return shuffledString;
}

module.exports = generateRandomCode;
