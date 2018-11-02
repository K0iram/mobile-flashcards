import React, { Component } from 'react'
import { View, TextInput, StyleSheet, Text, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { saveDeckTitle } from '../actions'
import { NavigationActions } from 'react-navigation'
import { purple, white, gray, red } from '../utils/colors'
import SubmitBtn from './SubmitBtn'


class AddDeck extends Component {
  state = {
    deckTitle: '',
    error: false
  }

  inputChange = (deckTitle) => {
    this.setState({
      deckTitle: deckTitle,
      error: false
    })
  }

  addNewDeck = () => {
    const { deckTitle } = this.state
    const { onSubmit, navigation, deckKeys } = this.props

    if(deckKeys.includes(deckTitle.toLowerCase())) {
      return this.setState({error: true})
    }

    onSubmit(deckTitle)

    this.setState({deckTitle: ''})

    navigation.navigate(
      'DeckView',
      { deckID: deckTitle }
    )
  }

  render() {
    const { deckTitle, errorMessage, error } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.header}> Add A New Deck </Text>
        <View>
          <TextInput
            placeholder="New Deck Title"
            style={[styles.userInput, {borderColor: error ? red : gray}]}
            value={deckTitle}
            onChangeText={this.inputChange}
            clearButtonMode='always'
          />
          <View style={{marginBottom: 20}}>
            {error && <Text style={styles.error}>That Deck Exists Try Another!</Text>}
          </View>
          <SubmitBtn onPress={this.addNewDeck} disabled={deckTitle === ''}>
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
    margin: 10,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0
  },
  header: {
    fontSize: 18,
    padding: 30,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  error: {
    color: red,
    width: '100%',
    textAlign: 'left',
    fontSize: 12,
    paddingLeft: 10
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