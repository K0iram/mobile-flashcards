import React, { Component } from 'react'
import { View, ScrollView, Text, AsyncStorage, StyleSheet  } from 'react-native'
import QuestionCard from './QuestionCard'
import SubmitBtn from './SubmitBtn'


class Quiz extends Component {
  state = {
    step: 0,
    toShow: 1
  }

  nextQuestion = () => {
    // Update Redux Store
    // Update AsyncStorage

    // Set state to next index
    this.setState((prevState) => ({
      step: prevState.step + 1,
      toShow: prevState.toShow + 1
    }))
  }

  render() {
    const questionsArray = this.props.navigation.state.params.questions
    return (
      <ScrollView>
        <Text style={styles.center}>
          <Text style={styles.bolder}>Instructions:</Text>
          After answering question yourself click the card to see the answer. Check the box depending on if your answer was correct or incorrect. When you answer all the questions you will see your score. Good Luck!
        </Text>

        {questionsArray.map((q, i) => (
          <ScrollView key={i}>
            <QuestionCard  answer={q.answer} question={q.question}/>
            <View style={styles.questionContainer}>
              <SubmitBtn width={styles.buttonSize} onPress={this.nextQuestion}>Correct</SubmitBtn>
              <SubmitBtn width={styles.buttonSize} onPress={this.nextQuestion}>Incorrect</SubmitBtn>
            </View>
          </ScrollView>
        ))}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  center: {
    textAlign: 'left',
    marginRight: 10,
    marginLeft: 10
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