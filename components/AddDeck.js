import React, { Component } from "react";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import { white, purple } from "../utils/colors";
import { saveDeckTitle, fetchDecks } from "../utils/api";
import { connect } from "react-redux";
import { addDeck } from "../actions";
import { NavigationAction, NavigationActions } from "react-navigation";

function SubmitBtn({ onPress }) {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.androidBtn}>
        <Text style={{ color: white, fontSize: 16 }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

class AddDeck extends Component {
  state = {
    title: ""
  };
  handleTextChange = title => {
    this.setState(() => ({
      title
    }));
  };
  submit = () => {
    const { title } = this.state;
    const newDeck = {
      [title]: { title: title, questions: [] }
    };
    this.notEmpty(title)
      ? saveDeckTitle(newDeck)
          .then(this.props.dispatch(addDeck(newDeck)))
          .then(
            this.setState(() => ({
              title: ""
            }))
          )
          .then(
            this.props.navigation.dispatch(
              NavigationActions.back({
                key: "AddDeck"
              })
            )
          )
      : Alert.alert("Bad input", "Deck name cannot be blank");
  };

  notEmpty = string => {
    let re = /([^\s])/;

    return re.test(string);
  };

  render() {
    const { title } = this.state;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={{ fontSize: 30, color: purple }}>
          What is the title of your new deck?
        </Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={this.handleTextChange}
        />
        <SubmitBtn onPress={this.submit} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: "center",
    justifyContent: "center"
  },
  androidBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 2,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    width: 300,
    height: 44,
    padding: 2,
    margin: 10,
    color: purple
  }
});

mapStateToProps = state => {
  return {
    decks: state
  };
};
export default connect(mapStateToProps)(AddDeck);
