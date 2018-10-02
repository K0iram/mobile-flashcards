import React, { Component } from 'react'
import { View, Text, TextInput, Button, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { saveDeckTitle } from '../actions'
import { NavigationActions } from 'react-navigation'
import { addDeck, fetchDecks } from '../utils/api'
import { purple, white } from '../utils/colors'



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
      <View>
        <TextInput
          placeholder="New Deck Title"
          value={this.state.deckTitle}
          onChangeText={this.inputChange}
        />
        <Button
          title='Add Deck'
          color={purple}
          onPress={this.addNewDeck}
        />
      </View>
    )
  }
}

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