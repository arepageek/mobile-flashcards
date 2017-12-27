import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { white, purple, gray, green, red } from "../utils/colors";

class Deck extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 30, color: purple }}>
          {this.props.navigation.state.params.title}
        </Text>
        <Text style={{ fontSize: 20, color: gray, padding: 20 }}>
          Questions:
          {
            this.props.decks[this.props.navigation.state.params.title].questions
              .length
          }
        </Text>
        <TouchableOpacity
          style={[styles.androidBtn, { backgroundColor: green }]}
          onPress={() =>
            this.props.navigation.navigate(
              "AddCard",
              this.props.navigation.state.params.title
            )
          }
        >
          <Text style={{ fontSize: 20 }}>Add card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.androidBtn, { backgroundColor: red }]}>
          <Text style={{ fontSize: 20 }}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
mapStateToProps = state => {
  return {
    decks: state
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: "center",
    justifyContent: "center"
  },
  androidBtn: {
    padding: 20,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    marginTop: 10
  }
});
export default connect(mapStateToProps)(Deck);
