import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { fetchDecks } from "../utils/api";
import { getDecks } from "../actions";
import { gray } from "../utils/colors";

class DeckList extends Component {
  componentDidMount() {
    fetchDecks().then(deck => this.props.dispatch(getDecks(deck)));
  }
  RenderItems = ({ item }) => {
    return (
      <View style={styles.deck}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Deck", item)}
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.questions}>
            Questions: {item.questions.length}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    let data = Object.values(this.props.decks).sort(
      (a, b) => a.title > b.title
    );
    return (
      <View>
        <FlatList
          data={data}
          renderItem={this.RenderItems}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deck: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    borderLeftWidth: 5,
    borderTopWidth: 5,
    borderLeftColor: "transparent",
    borderTopColor: gray
  },
  title: {
    fontSize: 24
  },
  questions: {
    fontSize: 20,
    color: gray
  }
});
mapStateToProps = state => {
  return {
    decks: state
  };
};
export default connect(mapStateToProps)(DeckList);
