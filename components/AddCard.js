import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, TextInput, StyleSheet, Text, Button, AsyncStorage } from 'react-native'
import { submitCard } from '../utils/api'
import { addCardToDeck } from '../actions'
import { purple, white } from '../utils/colors'
import SubmitBtn from './SubmitBtn'



class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  onQuestionChange = (question) => {
    this.setState({question: question})
  }

  onAnswerChange = (answer) => {
    this.setState({answer: answer})
  }

  addNewQuestion = () => {
    const { question, answer } = this.state
    const { onAddCard, decks } = this.props

    let key = 'Javascript'
    let newCard = {
      question: question,
      answer: answer
    }

    onAddCard(key, newCard)

    submitCard(key, newCard, decks[key].questions)

    this.setState({
      question: '',
      answer: ''
    })
  }

  getItem = () => {
    AsyncStorage.getItem('mobile-flashcards:decks').then((res) => console.log(res))
  }

  clear = () => {
    AsyncStorage.clear()
  }

  render() {
    const { question, answer } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.header}> Add A New Question Card </Text>
        <View>
          <TextInput
            placeholder="New Question"
            style={styles.userInput}
            value={this.state.question}
            onChangeText={this.onQuestionChange}
          />
          <TextInput
            placeholder="New Answer"
            style={styles.userInput}
            value={this.state.answer}
            onChangeText={this.onAnswerChange}
          />
          <SubmitBtn onPress={this.addNewQuestion} disabled={!question || !answer}>
            Add Card
          </SubmitBtn>

          <Button title='Async' onPress={this.getItem}/>
          <Button title='Clear' onPress={this.clear}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  userInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10
  },
  header: {
    fontSize: 18,
    padding: 30,
    textAlign: 'center',
    fontWeight: 'bold'
  }
})

const mapStateToProps = (decks) => {
  return {
    decks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddCard: (title, card) => dispatch(addCardToDeck(title, card))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)