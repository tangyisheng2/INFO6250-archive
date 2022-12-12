const secretWord = "REACT";

export function isValidWord(word) {
  console.log(word);
  return word && word.length === 5;
}

/**
 * This function will count every characters and its occurance in a string
 * @param {String} str String to count
 * @returns {Object} an Object with each character as key and its number of occurance as value
 */
function characterCounter(str) {
  const arr = str.split("");
  const count = {};
  arr.forEach((character) => {
    count[character] = (count[character] || 0) + 1;
  });
  return count;
}

/**
 *
 * @param {Object} wordCount1 an Object with each character as key and its number of occurance as value
 * @param {Object} wordCount2 an Object with each character as key and its number of occurance as value
 */
function countCommonCharacter(wordCount1, wordCount2) {
  let ans = 0;
  Object.keys(wordCount1).map((ch) => {
    return (ans += wordCount2[ch] || 0);
  });
  return ans;
}

export function compareWord(word) {
  if (word.length !== secretWord.length) {
    return 0;
  }

  const wordCharacterCount = characterCounter(word.toLowerCase());
  const secretWordCharacterCount = characterCounter(secretWord.toLowerCase());

  return countCommonCharacter(wordCharacterCount, secretWordCharacterCount);
}

export function isSameWord(word) {
  return word.toLowerCase() === secretWord.toLowerCase();
}
