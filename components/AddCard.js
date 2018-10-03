import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, TextInput, StyleSheet, Text } from 'react-native'
import { submitCard } from '../utils/api'
import { addCardToDeck } from '../actions'
import { purple, white } from '../utils/colors'
import SubmitBtn from './SubmitBtn'



class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckID } = navigation.state.params

    return {
      title: `Add a card to: ${deckID}`
    }
  }

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
    const { onAddCard, decks, deckID, goBack } = this.props

    let newCard = {
      question: question,
      answer: answer
    }

    onAddCard(deckID, newCard)

    submitCard(deckID, newCard, decks[deckID].questions)

    this.setState({
      question: '',
      answer: ''
    })

    goBack()
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

const mapStateToProps = (decks, { navigation }) => {
  const { deckID } = navigation.state.params
  return {
    deckID,
    decks
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
  return {
    onAddCard: (title, card) => dispatch(addCardToDeck(title, card)),
    goBack: () => navigation.goBack()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)