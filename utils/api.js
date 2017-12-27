import { AsyncStorage } from "react-native";

export const MOBILE_FLASHCARDS_STORAGE = "mobile:234dfqw3";

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
