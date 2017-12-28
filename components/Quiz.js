import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert
} from "react-native";
import { connect } from "react-redux";
import { white, purple } from "../utils/colors";

function Question({ question }) {
  return (
    <View>
      <Text>{question}</Text>
    </View>
  );
}
function SubmitBtn({ onPress }) {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.androidBtn}>
        <Text style={{ color: white, fontSize: 16 }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
class Quiz extends Component {
  state = {
    index: 0,
    correct: 0,
    show: false,
    input: "",
    showCorrect: false,
    showIncorrect: false
  };

  submit = () => {
    const { answer } = this.props.decks[
      this.props.navigation.state.params
    ].questions[this.state.index];

    this.state.input === answer
      ? this.setState(state => ({
          showCorrect: true,
          correct: state.correct + 1
        }))
      : this.setState({ showIncorrect: true });
  };

  nextQuestion = () => {
    console.debug("next!");
    this.setState(state => ({
      index:
        this.props.decks[this.props.navigation.state.params].questions
          .length ===
        state.index + 1
          ? state.index
          : state.index + 1,
      showCorrect: false,
      showIncorrect: false,
      input: "",
      show: false
    }));
  };
  componentDidMount() {}
  render() {
    const title = this.props.navigation.state.params;
    return (
      <View style={{ flex: 1, backgroundColor: white }}>
        <Text>
          {this.state.index + 1} / {this.props.decks[title].questions.length}
        </Text>
        <Text>{JSON.stringify(this.state)}</Text>
        <View style={styles.container}>
          <Text>
            {this.props.decks[title].questions[this.state.index].question}
          </Text>
          {this.state.showCorrect || this.state.showIncorrect ? (
            this.state.showCorrect ? (
              <View>
                <Text>Correct! </Text>
                {this.props.decks[title].questions.length ===
                this.state.index + 1 ? (
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          correct: 0,
                          input: "",
                          showCorrect: false,
                          showIncorrect: false,
                          index: 0,
                          show: false
                        })
                      }
                    >
                      <Text> Reset </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    <TouchableOpacity onPress={() => this.nextQuestion()}>
                      <Text>Next Card!</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ) : (
              <View>
                <Text>Incorrect! </Text>
                {!this.state.show ? (
                  <TouchableOpacity
                    onPress={() => this.setState({ show: true })}
                  >
                    <Text>Show Answer!</Text>
                  </TouchableOpacity>
                ) : (
                  <Text>
                    {this.props.decks[title].questions[this.state.index].answer}
                  </Text>
                )}
                {this.props.decks[title].questions.length ===
                this.state.index + 1 ? (
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          correct: 0,
                          input: "",
                          showCorrect: false,
                          showIncorrect: false,
                          index: 0,
                          show: false
                        })
                      }
                    >
                      <Text> Reset </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    <TouchableOpacity onPress={() => this.nextQuestion()}>
                      <Text>Next Card!</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )
          ) : (
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                value={this.state.input}
                onChangeText={input => this.setState({ input })}
              />
              <SubmitBtn onPress={this.submit} />
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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

export default connect(mapStateToProps)(Quiz);
