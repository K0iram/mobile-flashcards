import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/colors'
import TextBtn from './TextBtn'
import QuestionCard from './QuestionCard'


class DeckView extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckID } = navigation.state.params

    return {
      title: deckID
    }
  }

  reset = () => {
    const { goBack, deckID } = this.props
    goBack()
  }

  shouldComponentUpdate (nextProps) {
    return nextProps.question !== null
  }

  render() {
    const { questions } = this.props

    if(questions.length < 1) {
      return (
        <Text>There is not questions in this deck!</Text>

      )
    }

    return (
      <View style={styles.container}>
        {questions.map((q, i) => <QuestionCard key={i} answer={q.answer} question={q.question}/>)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15
  },
})

const mapStateToProps = (state, { navigation }) => {
  const { deckID } = navigation.state.params

  return {
    deckID,
    questions: state[deckID].questions,
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
  const { deckID } = navigation.state.params

  return {
    goBack: () => navigation.goBack(),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DeckView)