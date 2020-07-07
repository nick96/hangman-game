import React from "react";
import styled from "styled-components";
import StickPerson from "./StickPerson";
import data from "./data/words.json";

// Number of lives the user starts with initially.
const INITIAL_LIVES = 6;

// Styled container that the whole app is wrapped in.
const AppContainer = styled.div`
  text-align: center;
  min-height: 100vh;
  display: grid;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
`;

// Display for the life count.
const LifeDisplayContainer = styled.div`
  grid-row: 3;
`;

const DynamicGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(
    ${(props: { wordLength: number }) => props.wordLength},
    1fr
  );
  grid-gap: 10px;
`;

const SelectedLettersContainer = styled(DynamicGridContainer)`
  grid-row: 2;
`;

const WordDisplayContainer = styled(DynamicGridContainer)`
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
  grid-row: 4;
`;

const LetterInputForm = styled.form`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-column: 1 / 4;
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

enum PlayerStatus {
  Play,
  Win,
  Lose,
}

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
  // State of play the player is in.
  playerStatus: PlayerStatus;
  // All letters the user has selected in the game.
  selectedLetters: string[];
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
    if (letter.trim() === "") {
      return;
    }

    if (gameState.selectedLetters.includes(letter)) {
      alert(`You've already selected '${letter}'`);
      return;
    }

    gameState.selectedLetters.push(letter);
    const letterIndicies = matchAll(
      gameState.word,
      new RegExp(letter, "gi")
    ).map((m) => m.index);
    if (letterIndicies.length > 0) {
      for (let index of letterIndicies) {
        gameState.guessedLetters[index] = letter;
      }
    } else {
      gameState.lives -= 1;
    }

    if (gameState.lives === 0) {
      gameState.playerStatus = PlayerStatus.Lose;
    } else if (
      gameState.guessedLetters.every((letter: string | null) => letter !== null)
    ) {
      gameState.playerStatus = PlayerStatus.Win;
    }

    // Set the game state down here because there are many things that modify
    // the game state in this function.
    setGameState({ ...gameState });
    setLetter("");

    // Do the alerting after we've set the game state so that changes will be display before the popup.
    switch (gameState.playerStatus) {
      case PlayerStatus.Win:
        alert("You win!");
        break;
      case PlayerStatus.Lose:
        alert(`You lose! The word was ${gameState.word}`);
        break;
    }
  };

  const resetGameState = () => {
    const word = newRandomWord();
    setGameState({
      word: word,
      lives: INITIAL_LIVES,
      guessedLetters: word.split("").map((_) => null),
      playerStatus: PlayerStatus.Play,
      selectedLetters: [],
    });
  };

  return (
    <LetterInputContainer>
      <LetterInputForm>
        <TextInput
          type="text"
          size={1}
          maxLength={1}
          minLength={1}
          onChange={(e) => setLetter(e.target.value)}
          value={letter}
          disabled={gameState.playerStatus !== PlayerStatus.Play}
        />
        <LetterSubmitButton
          onClick={(e) => {
            updateGameState(letter);
            e.preventDefault();
          }}
          disabled={
            gameState.playerStatus !== PlayerStatus.Play || letter.trim() === ""
          }
          type="submit"
        >
          Submit
        </LetterSubmitButton>
      </LetterInputForm>
      <ResetButton onClick={resetGameState}>Reset</ResetButton>
    </LetterInputContainer>
  );
};

const SelectedLettersDisplay: React.FunctionComponent<{
  letters: string[];
}> = ({ letters }) => {
  let displayLetters = letters.map((letter, i) => {
    return (
      <LetterDisplay
        key={`selected-${i + 1}`}
        index={i + 1}
        wordLength={letters.length}
      >
        {letter}
      </LetterDisplay>
    );
  });

  return (
    <SelectedLettersContainer wordLength={letters.length}>
      {displayLetters}
    </SelectedLettersContainer>
  );
};

const newRandomWord = (): string => {
  const words = Object.keys(data);
  const index = Math.floor(Math.random() * words.length);
  return words[index];
};

const App = () => {
  const word = newRandomWord();
  let [gameState, setGameState] = React.useState<GameState>({
    word: word,
    guessedLetters: word.split("").map((_) => null),
    lives: INITIAL_LIVES,
    playerStatus: PlayerStatus.Play,
    selectedLetters: [],
  });

  return (
    <AppContainer>
      <WordDisplay guessedLetters={gameState.guessedLetters}></WordDisplay>
      <SelectedLettersDisplay letters={gameState.selectedLetters} />
      <LifeDisplay lives={gameState.lives} />
      <LetterInput gameState={gameState} setGameState={setGameState} />
    </AppContainer>
  );
};

export default App;
