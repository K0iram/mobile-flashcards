import React, { Component } from 'react'
import { View, ScrollView, Text, AsyncStorage, StyleSheet  } from 'react-native'
import SubmitBtn from './SubmitBtn'
import FlipCard from './FlipCard'


class Quiz extends Component {
  constructor(props) {
    super(props)
      this.state = {
        step: 0,
        correct: 0,
        quizReady: false,
        quizFinished: false,
        questions: props.navigation.state.params.questions
      }
  }

  onCorrect = () => {
    const { step, questions } = this.state
    if(questions.length === (step + 1) && questions.length >= 1) {
      this.setState({
        quizFinished: true
      })
    }
    this.setState((prevState) => ({
      step: prevState.step + 1,
      correct: prevState.correct + 1
    }))
  }

  onIncorrect = () => {
    const { step, questions } = this.state
    if(questions.length === (step + 1) && questions.length >= 1) {
      this.setState({
        quizFinished: true
      })
    }
    this.setState((prevState) => ({
      step: prevState.step + 1,
    }))
  }

  startQuiz = () => {
    this.setState({quizReady: true})
  }

  render() {
    const { step, questions } = this.state
    const currentQ = questions[step]

    if(!this.state.quizReady) {
      return (
        <View style={styles.center}>
          <Text style={styles.bolder}>Instructions:</Text>
          <Text>
            After answering question yourself click the card to see the answer. Check the box depending on if your answer was correct or incorrect. When you answer all the questions you will see your score. Good Luck!
          </Text>
          <View style={{marginTop: 20}}>
            <SubmitBtn onPress={this.startQuiz}>Start The Quiz</SubmitBtn>
          </View>
        </View>
      )
    }

    if(this.state.quizFinished) {
      return (
        <View style={styles.center}>
          <Text>
            You got {this.state.correct} out of {this.state.questions.length} Correct!
          </Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text>Question: {step + 1} of {questions.length}</Text>
        <View style={{height: 500}}>
          <FlipCard answer={currentQ.answer} question={currentQ.question}/>
        </View>
        <View style={styles.questionContainer}>
          <SubmitBtn width={styles.buttonSize} onPress={this.onCorrect}>Correct</SubmitBtn>
          <SubmitBtn width={styles.buttonSize} onPress={this.onIncorrect}>Incorrect</SubmitBtn>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  center: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
    marginLeft: 30
  },
  bolder: {
    fontWeight: 'bold'
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10
  },
  buttonSize: {
    width: 100
  }
})

export default Quiz