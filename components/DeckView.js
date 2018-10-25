import React, { Component } from 'react'
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, AsyncStorage, Platform } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/colors'
import { Ionicons } from '@expo/vector-icons'
import { addQuiz } from '../utils/api'
import { createNewQuiz } from '../actions'
import SubmitBtn from './SubmitBtn'
import FlipCard from './FlipCard'


class DeckView extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckID } = navigation.state.params

    return {
      title: deckID
    }
  }

  shouldComponentUpdate (nextProps) {
    return nextProps.questions !== null
  }

  onCreateQuiz = () => {
    const { navigation, deckID, questions, quizes, onCreateQuiz} = this.props
    const newQuiz = {
      deck: deckID,
      timeStamp: Date.now(),
      correctAnswers: 0
    }

    addQuiz(deckID, newQuiz, quizes)
    onCreateQuiz(deckID, newQuiz)

    navigation.navigate(
      'Quiz',
      {
        deckID: deckID,
        questions: questions
      }
    )
  }

  render() {
    const { questions, deckID } = this.props

    if(questions.length < 1) {
      return (
        <View style={styles.container}>
          <View style={styles.center}>
            <Ionicons name={Platform.OS === 'ios' ? 'ios-sad-outline' : 'md-sad'} size={100}/>
            <Text>There are no cards in this deck!</Text>
          </View>
          <View>
            <SubmitBtn style={styles.btnContainer} onPress={() => this.props.navigation.navigate(
                'AddCard',
                { deckID: deckID }
              )}>
              Add A Card
            </SubmitBtn>
          </View>
        </View>

      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.infoBox}>
          <Text>Tap Cards To See The Answer</Text>
          <Text># of Cards: {questions.length}</Text>
        </View>
        <ScrollView style={styles.cardContainer}>
          {questions.map((q, i) => <FlipCard key={i} answer={q.answer} question={q.question}/>)}
        </ScrollView>
        <View style={styles.btnContainer}>
          <SubmitBtn style={styles.btnPadding} onPress={() => this.props.navigation.navigate(
              'AddCard',
              { deckID: deckID }
          )}>
            Add A Card
          </SubmitBtn>
          <SubmitBtn onPress={this.onCreateQuiz}>
            Quiz Yourself
          </SubmitBtn>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: white,
    padding: 15,
  },
  cardContainer: {
    flex: 2,
    backgroundColor: white
  },
  btnContainer: {
    backgroundColor: white
  },
  btnSpace: {
    marginBottom: 5,
    marginTop: 5
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
    marginLeft: 30
  },
  infoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

const mapStateToProps = (state, { navigation }) => {
  const { deckID } = navigation.state.params

  return {
    deckID,
    questions: state.decks[deckID].questions,
    quizes: state.decks[deckID].quizes
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
  const { deckID } = navigation.state.params

  return {
    goBack: () => navigation.goBack(),
    onCreateQuiz: (id, quiz) => dispatch(createNewQuiz(id, quiz))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DeckView)