import React, { Component } from 'react'
import { View, ScrollView, Text, AsyncStorage, StyleSheet  } from 'react-native'
import QuestionCard from './QuestionCard'
import SubmitBtn from './SubmitBtn'


class Quiz extends Component {

  render() {
    return (
      <ScrollView>
        <Text style={styles.center}><Text style={styles.bolder}>Instructions:</Text> After answering question yourself click the card to see the answer. Check the box depending on if your answer was correct or incorrect. When you answer all the questions you will see your score. Good Luck!</Text>
        {this.props.navigation.state.params.questions.map((q, i) => (
          <View key={i}>
            <QuestionCard  answer={q.answer} question={q.question}/>
            <View style={styles.questionContainer}>
              <SubmitBtn width={styles.buttonSize} onPress={() => AsyncStorage.clear()}>Correct</SubmitBtn>
              <SubmitBtn width={styles.buttonSize} onPress={()=>{}}>Incorrect</SubmitBtn>
            </View>
          </View>
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