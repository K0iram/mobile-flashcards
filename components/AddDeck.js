import React, { Component } from 'react'
import { View, TextInput, StyleSheet, Text, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { saveDeckTitle } from '../actions'
import { NavigationActions } from 'react-navigation'
import { addDeck } from '../utils/api'
import { purple, white } from '../utils/colors'
import SubmitBtn from './SubmitBtn'


class AddDeck extends Component {
  state = {
    deckTitle: ''
  }
  //Only for Development
  reset = () => {
    AsyncStorage.clear()
  }

  inputChange = (deckTitle) => {
    this.setState({deckTitle})
  }

  addNewDeck = () => {
    const { deckTitle } = this.state
    const { onSubmit, navigation, deckKeys } = this.props

    if(deckKeys.includes(deckTitle.toLowerCase())) {
      return alert('That Deck Exists Try Another!')
    }

    onSubmit(deckTitle)

    addDeck(deckTitle)

    this.setState({deckTitle: ''})

    navigation.navigate(
      'DeckView',
      { deckID: deckTitle }
    )
  }

  render() {
    const { deckTitle } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.header}> Add A New Deck </Text>
        <View>
          <TextInput
            placeholder="New Deck Title"
            style={styles.userInput}
            value={deckTitle}
            onChangeText={this.inputChange}
          />
          <SubmitBtn onPress={this.addNewDeck} disabled={deckTitle === ''}>
            Add Deck
          </SubmitBtn>
          <SubmitBtn onPress={this.reset}>
            Reset
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

const mapStateToProps = ({decks}) => {
  return {
    deckKeys: Object.keys(decks).map((deck) => deck.toLowerCase())
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (title) => dispatch(saveDeckTitle(title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck)