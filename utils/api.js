import { AsyncStorage } from "react-native";

export const MOBILE_FLASHCARDS_STORAGE = "mobileflashcards:storage";

emptyDecks = () => {
  const starterData = {
    React: {
      title: "React",
      questions: [
        {
          question: "What is React?",
          answer: "A library for managing user interfaces"
        },
        {
          question: "Where do you make Ajax requests in React?",
          answer: "The componentDidMount lifecycle event"
        }
      ]
    },
    JavaScript: {
      title: "JavaScript",
      questions: [
        {
          question: "What is a closure?",
          answer:
            "The combination of a function and the lexical environment within which"
        }
      ]
    }
  };
  AsyncStorage.setItem(MOBILE_FLASHCARDS_STORAGE, JSON.stringify(starterData));

  return starterData;
};

export function saveDeckTitle(deck) {
  return AsyncStorage.mergeItem(
    MOBILE_FLASHCARDS_STORAGE,
    JSON.stringify(deck)
  );
}

export function fetchDecks() {
  return AsyncStorage.getItem(MOBILE_FLASHCARDS_STORAGE).then(decks => {
    return decks === null ? emptyDecks() : JSON.parse(decks);
  });
}

export function addCard({ card, title }) {
  return AsyncStorage.getItem(MOBILE_FLASHCARDS_STORAGE, (err, result) => {
    const decks = JSON.parse(result);

    const newQuestions = JSON.parse(JSON.stringify(decks[title].questions));
    newQuestions[newQuestions.length] = card;

    const value = JSON.stringify({
      [title]: { title: title, questions: newQuestions }
    });

    AsyncStorage.mergeItem(MOBILE_FLASHCARDS_STORAGE, value);
  });
}
