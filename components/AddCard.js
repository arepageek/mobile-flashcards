import React, { Component } from "react";
import {
  Alert,
  View,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { white, purple } from "../utils/colors";
import { connect } from "react-redux";
import { addCard } from "../utils/api";
import { addDeck } from "../actions";
import { NavigationAction, NavigationActions } from "react-navigation";

function SubmitBtn({ onPress }) {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.androidBtn}>
        <Text style={{ color: white }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Adding Card to Deck: " + navigation.state.params
    };
  };
  state = {
    question: "",
    answer: ""
  };
  submit = () => {
    const { question, answer } = this.state;
    const title = this.props.navigation.state.params;
    const card = { question, answer };

    const newDeck = {
      [title]: {
        title: title,
        questions: [...this.props.decks[title].questions, card]
      }
    };
    if (this.notEmpty(question) && this.notEmpty(answer)) {
      addCard({ card, title });

      this.props.dispatch(addDeck(newDeck));

      this.setState({
        question: "",
        answer: ""
      });

      this.props.navigation.dispatch(NavigationActions.back());
    } else {
      Alert.alert("Invalid", "Question or answer cannot be blank");
    }
  };
  handleTextChange = text => {
    console.log(decks[title]);
  };
  notEmpty = string => {
    let re = /([^\s])/;

    return re.test(string);
  };
  render() {
    const { question, answer } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={{ fontSize: 30, color: purple }}>
          What is your question?{" "}
        </Text>
        <TextInput
          style={styles.input}
          value={question}
          onChangeText={question =>
            this.setState({
              question
            })
          }
        />
        <Text style={{ fontSize: 30, color: purple }}>What is the answer?</Text>
        <TextInput
          style={styles.input}
          value={answer}
          onChangeText={answer =>
            this.setState({
              answer
            })
          }
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

export default connect(mapStateToProps)(AddCard);
