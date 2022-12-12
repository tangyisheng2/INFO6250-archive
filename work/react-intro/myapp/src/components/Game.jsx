import { useState } from "react";
import { compareWord, isSameWord, isValidWord } from "../controller/word";

function Game({ word, setWord, setMessage }) {
  const [tempWord, setTempWord] = useState("");

  const onWordChange = (e) => {
    e.preventDefault();
    const wordInput = e.target.value;
    setTempWord(wordInput);
    console.log(wordInput);
  };

  const onWordSubmit = (e) => {
    e.preventDefault();
    if (isValidWord(tempWord)) {
      const isSame = isSameWord(tempWord);
      const numberCommonCharacter = compareWord(tempWord);
      if (isSame) {
        setMessage(`Your word "${tempWord}" is the secret word!`);
      } else {
        setMessage(
          `Your word "${tempWord}" has ${numberCommonCharacter} with the secret word!`
        );
      }

      setWord(tempWord);
      setTempWord("");
    } else {
      setTempWord("");
      setMessage(
        `Word "${tempWord}" is invalid, please enter a 5 character word.`
      );
    }
  };

  return (
    <div className="word-container">
      <form action="" method="post" onSubmit={onWordSubmit}>
        <label>
          Input a new word:
          <input
            type="text"
            className="word-input"
            value={tempWord}
            onChange={onWordChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default Game;
