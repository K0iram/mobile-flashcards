import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, TextInput, StyleSheet, Text } from 'react-native'
import { submitCard } from '../utils/api'
import { addCardToDeck } from '../actions'
import { purple, white, gray, red } from '../utils/colors'
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
    answer: '',
    qLength: 0,
    aLength: 0
  }

  onQuestionChange = (question) => {
    if(this.state.qLength >= 30) {
      return alert("Question can only be 30 characters long")
    }

    this.setState({
      question: question,
      qLength: question.length
    })
  }

  onAnswerChange = (answer) => {
    if(this.state.aLength === 125) {
      return alert("Answer can only be 125 characters long")
    }
    this.setState({
      answer: answer,
      aLength: answer.length
    })
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
    const { question, answer, qLength, aLength } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.header}> Add A New Question Card </Text>
        <View>
          <View>
            <Text style={[styles.cardLength, {color: qLength >= 30 ? red : gray}]}>{`${qLength}/30`}</Text>
            <TextInput
              placeholder="New Question"
              style={styles.userInput}
              value={this.state.question}
              onChangeText={this.onQuestionChange}
              disabled={qLength >= 30}
            />
          </View>
          <View>
            <Text style={[styles.cardLength, {color: aLength >= 125 ? red : gray}]}>{`${aLength}/125`}</Text>
            <TextInput
              placeholder="New Answer"
              style={styles.userInput}
              value={this.state.answer}
              onChangeText={this.onAnswerChange}
            />
          </View>
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
  },
  cardLength: {
    width: '100%',
    textAlign: 'right',
    fontSize: 12,
    paddingRight: 10
  }
})

const mapStateToProps = (state, { navigation }) => {
  const { deckID } = navigation.state.params
  return {
    deckID,
    decks: state.decks
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
  return {
    onAddCard: (title, card) => dispatch(addCardToDeck(title, card)),
    goBack: () => navigation.goBack()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)