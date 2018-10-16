import React, { Component } from 'react'
import { View, ScrollView, Text, AsyncStorage, StyleSheet  } from 'react-native'
import QuestionCard from './QuestionCard'
import SubmitBtn from './SubmitBtn'


class Quiz extends Component {
  state = {
    step: 0,
    quizReady: false,
    quizFinished: false
  }

  nextQuestion = () => {
    const q = this.props.navigation.state.params.questions
    // Update Redux Store
    // Update AsyncStorage
    if(q.length >= this.state.step){
      this.setState({quizFinished: true})
    }

    // Set state to next index
    this.setState((prevState) => ({
      step: prevState.step + 1
    }))
  }

  startQuiz = () => {
    this.setState({quizReady: true})
  }

  render() {
    const q = this.props.navigation.state.params.questions
    const { step } = this.state
    const currentQ = q[step]

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
        <View>
          <Text>
            YOUR FINISHED
          </Text>
        </View>
      )
    }

    return (
      <View>
        <Text>Question: {step} of {q.length}</Text>
        <View>
          <QuestionCard answer={currentQ.answer} question={currentQ.question}/>
        </View>
        <View style={styles.questionContainer}>
          <SubmitBtn width={styles.buttonSize} onPress={this.nextQuestion}>Correct</SubmitBtn>
          <SubmitBtn width={styles.buttonSize} onPress={this.nextQuestion}>Incorrect</SubmitBtn>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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