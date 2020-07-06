import React from "react";
import styled from "styled-components";
import StickPerson from "./StickPerson";

// Number of lives the user starts with initially.
const INITIAL_LIVES = 6;

// Styled container that the whole app is wrapped in.
const AppContainer = styled.div`
  text-align: center;
  /* background-color: #282c34; */
  min-height: 100vh;
  display: grid;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  /* color: white; */
`;

// Display for the life count.
const LifeDisplayContainer = styled.div`
  grid-row: 2;
`;

const WordDisplayContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(
    ${(props: { wordLength: number }) => props.wordLength},
    1fr
  );
  grid-gap: 10px;
  grid-row: 1;
`;

const LetterDisplay = styled.span`
  grid-column: ${(props: { index: number; wordLength: number }) => props.index};
  grid-row: 1;
`;

const LetterInputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-row: 3;
`;

const TextInput = styled.input`
  grid-column: 1 / 3;
  grid-row: 1;
`;
const LetterSubmitButton = styled.button`
  grid-column: 3;
  grid-row: 1;
`;

const ResetButton = styled.button`
  grid-column: 1/4;
  grid-row: 2;
`;

// Game state represents the current state of the game.
interface GameState {
  // Word the user is guessing
  word: string;
  // List of the letters in the word the user has guessed. This list will be
  // the length of the number of characters in `word`. For unguessed letters,
  // the element at the index will be null, for guessed letters it will be the
  // letter.
  guessedLetters: (string | null)[];
  // Number of lives the user has left.
  lives: number;
}

const WordDisplay: React.FunctionComponent<{
  guessedLetters: (string | null)[];
}> = ({ guessedLetters }) => {
  let displayLetters = guessedLetters.map((letter, i) => {
    const displayLetter = letter === null ? "_" : letter;
    return (
      <LetterDisplay
        key={i + 1}
        index={i + 1}
        wordLength={guessedLetters.length}
      >
        {displayLetter}
      </LetterDisplay>
    );
  });

  return (
    <WordDisplayContainer wordLength={guessedLetters.length}>
      {displayLetters}
    </WordDisplayContainer>
  );
};

const LifeDisplay: React.FunctionComponent<{ lives: number }> = ({ lives }) => {
  return (
    <LifeDisplayContainer>
      <StickPerson
        head={lives < 6}
        torso={lives < 5}
        leftArm={lives < 4}
        rightArm={lives < 3}
        leftLeg={lives < 2}
        rightLeg={lives < 1}
      />
    </LifeDisplayContainer>
  );
};

const matchAll = (str: string, regexp: RegExp): { index: number }[] => {
  let match;
  let matches = [];

  while ((match = regexp.exec(str)) !== null) {
    matches.push(match);
  }
  return matches;
};

const LetterInput: React.FunctionComponent<{
  gameState: GameState;
  setGameState: (gs: GameState) => void;
}> = ({ gameState, setGameState }) => {
  const [letter, setLetter] = React.useState("");

  const updateGameState = (letter: string) => {
    const letterIndicies = matchAll(
      gameState.word,
      new RegExp(letter, "gi")
    ).map((m) => m.index);
    if (letterIndicies.length > 0) {
      for (let index of letterIndicies) {
        gameState.guessedLetters[index] = letter;
      }
      setGameState({ ...gameState });
    } else {
      gameState.lives -= 1;
      setGameState({ ...gameState });
    }
    setLetter("");

    if (gameState.lives === 0) {
      alert("You lose!");
    } else if (
      gameState.guessedLetters.every((letter: string | null) => letter !== null)
    ) {
      alert("You win!");
    }
  };

  const resetGameState = () => {
    setGameState({
      word: gameState.word,
      lives: INITIAL_LIVES,
      guessedLetters: gameState.word.split("").map((_) => null),
    });
  };

  return (
    <LetterInputContainer>
      <TextInput
        type="text"
        size={1}
        maxLength={1}
        onChange={(e) => setLetter(e.target.value)}
        value={letter}
      />
      <LetterSubmitButton onClick={() => updateGameState(letter)}>
        Submit
      </LetterSubmitButton>
      <ResetButton onClick={resetGameState}>Reset</ResetButton>
    </LetterInputContainer>
  );
};

function App() {
  const word = "test";
  let [gameState, setGameState] = React.useState<GameState>({
    word: word,
    guessedLetters: word.split("").map((_) => null),
    lives: INITIAL_LIVES,
  });

  return (
    <AppContainer>
      <WordDisplay guessedLetters={gameState.guessedLetters}></WordDisplay>
      <LifeDisplay lives={gameState.lives} />
      <LetterInput gameState={gameState} setGameState={setGameState} />
    </AppContainer>
  );
}

export default App;
