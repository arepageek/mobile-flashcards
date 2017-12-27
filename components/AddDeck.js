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
    saveDeckTitle(newDeck);
    this.props.dispatch(addDeck(newDeck));
    this.setState(() => ({
      title: ""
    }));
  };

  render() {
    const { title } = this.state;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={{ fontSize: 30, color: purple }}>
          What is the title of your new deck?sss
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
