import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import { white, purple, gray, red, green } from "../utils/colors";

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
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Quiz for: " + navigation.state.params
    };
  };
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
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1, backgroundColor: white }}
      >
        <Text style={styles.number}>
          {this.state.index + 1} / {this.props.decks[title].questions.length}
        </Text>
        <View style={styles.container}>
          <Text style={{ fontSize: 30, color: purple }}>
            {this.props.decks[title].questions[this.state.index].question}
          </Text>
          {this.state.showCorrect || this.state.showIncorrect ? (
            this.state.showCorrect ? (
              <View>
                <Text
                  style={{ fontSize: 40, alignSelf: "center", color: green }}
                >
                  Correct
                </Text>
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
                      <Text style={{ color: purple, fontSize: 50 }}>
                        Calification : {this.state.correct} /{" "}
                        {this.props.decks[title].questions.length}
                      </Text>
                      <Text
                        style={{
                          fontSize: 24,
                          color: red,
                          alignSelf: "center"
                        }}
                      >
                        Reset
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    <TouchableOpacity
                      onPress={() => this.nextQuestion()}
                      style={styles.nextBtn}
                    >
                      <Text style={{ color: white, fontSize: 18 }}>
                        Next Card!
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ) : (
              <View>
                <Text style={{ fontSize: 40, alignSelf: "center", color: red }}>
                  Incorrect
                </Text>
                {!this.state.show ? (
                  <TouchableOpacity
                    onPress={() => this.setState({ show: true })}
                  >
                    <Text
                      style={{ fontSize: 20, alignSelf: "center", color: gray }}
                    >
                      Show Answer
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <Text
                    style={{ fontSize: 20, color: purple, alignSelf: "center" }}
                  >
                    Answer:{" "}
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
                      <Text style={{ color: purple, fontSize: 50 }}>
                        Calification : {this.state.correct} /{" "}
                        {this.props.decks[title].questions.length}
                      </Text>
                      <Text
                        style={{
                          fontSize: 24,
                          color: red,
                          alignSelf: "center"
                        }}
                      >
                        Reset
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    <TouchableOpacity
                      onPress={() => this.nextQuestion()}
                      style={styles.nextBtn}
                    >
                      <Text style={{ color: white, fontSize: 18 }}>
                        Next Card!
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )
          ) : (
            <View>
              <TextInput
                style={styles.input}
                value={this.state.input}
                onChangeText={input => this.setState({ input })}
              />
              <SubmitBtn onPress={this.submit} />
            </View>
          )}
        </View>
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
    margin: 20,
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
  },
  number: {
    fontSize: 24,
    color: gray,
    padding: 20
  },
  nextBtn: {
    backgroundColor: green,
    padding: 10,
    margin: 20,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center"
  }
});
mapStateToProps = state => {
  return {
    decks: state
  };
};

export default connect(mapStateToProps)(Quiz);
