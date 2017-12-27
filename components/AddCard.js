import React, { Component } from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { addCard } from "../utils/api";
import { addDeck } from "../actions";

function SubmitBtn({ onPress }) {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
class AddCard extends Component {
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
    console.log(card);
    addCard({ card, title });

    this.props.dispatch(addDeck(newDeck));

    this.setState({
      question: "",
      answer: ""
    });
  };
  handleTextChange = text => {
    console.log(decks[title]);
  };
  render() {
    const { question, answer } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding">
        <Text>
          {" "}
          {JSON.stringify(
            this.props.decks[this.props.navigation.state.params].questions
          )}
        </Text>
        <Text>What is your question? </Text>
        <TextInput
          value={question}
          onChangeText={question =>
            this.setState({
              question
            })
          }
        />
        <Text>What is the answer?</Text>
        <TextInput
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

mapStateToProps = state => {
  return {
    decks: state
  };
};

export default connect(mapStateToProps)(AddCard);
