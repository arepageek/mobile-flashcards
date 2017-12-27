import React from "react";
import { View } from "react-native";
import DeckList from "./components/DeckList";
import AddDeck from "./components/AddDeck";
import AddCard from "./components/AddCard";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { TabNavigator, StackNavigator } from "react-navigation";
import Deck from "./components/Deck";
const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: "List"
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: "New Deck"
    }
  }
});
const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  Deck: {
    screen: Deck
  },
  AddCard: {
    screen: AddCard
  }
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
