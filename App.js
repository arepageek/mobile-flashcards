import React from "react";
import { View } from "react-native";
import DeckList from "./components/DeckList";
import AddDeck from "./components/AddDeck";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { TabNavigator } from "react-navigation";
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

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <Tabs />
        </View>
      </Provider>
    );
  }
}
