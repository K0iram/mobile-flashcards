import React, { Component } from 'react'
import { View, TextInput, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import { saveDeckTitle } from '../actions'
import { NavigationActions } from 'react-navigation'
import { addDeck, fetchDecks } from '../utils/api'
import { purple, white } from '../utils/colors'
import SubmitBtn from './SubmitBtn'



class AddDeck extends Component {
  state = {
    deckTitle: ''
  }

  inputChange = (deckTitle) => {
    this.setState({deckTitle})
  }

  addNewDeck = () => {
    const { deckTitle } = this.state
    const { onSubmit } = this.props

    onSubmit(deckTitle)

    addDeck(deckTitle).then(() => {
      fetchDecks()
    })

    this.setState({deckTitle: ''})

    //Redirect to home on submit
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}> Add A New Deck </Text>
        <View>
          <TextInput
            placeholder="New Deck Title"
            style={styles.userInput}
            value={this.state.deckTitle}
            onChangeText={this.inputChange}
          />
          <SubmitBtn onPress={this.addNewDeck}>
            Add Deck
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

const mapStateToProps = (decks) => {
  return {
    decks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (title) => dispatch(saveDeckTitle(title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck)