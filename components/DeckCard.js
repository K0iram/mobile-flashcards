import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { gray, white } from '../utils/colors'
import { FontAwesome } from '@expo/vector-icons'
import { removeDeck } from '../actions'
import { NavigationActions } from 'react-navigation'

class DeckCard extends Component {

  onRemoveDeck = (deckTitle) => {
    const { onDelete } = this.props
    onDelete(deckTitle)
  }

  render() {
    const { title, questions } = this.props
    return (
      <View style={styles.item}>
        <View style={styles.deleteBtn}>
          <TouchableOpacity
            onPress={
              () => {
                Alert.alert(
                  'Alert!',
                  `Are you sure you want to delete the deck - ${title}?`,
                  [
                    {text: 'OK', onPress: () => this.onRemoveDeck(title)},
                    {text: 'Cancel', onPress: () => console.log('OK Pressed')},
                  ],
                  { cancelable: false }
                )
              }
          }>
            <FontAwesome name='times' size={15}/>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <Text style={{fontSize: 20}}>
            {title}
          </Text>
          <Text style={{fontSize: 16, color: gray}}>
            # of Cards: {questions.length}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column'
  },
  item: {
    position: 'relative',
    backgroundColor: white,
    borderRadius: 10,
    padding: 20,
    marginTop: 17,
    marginRight: 10,
    marginLeft: 10,
    justifyContent: 'flex-start',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  deleteBtn: {
    position: 'absolute',
    top: 5,
    right: 10,
  }
})

const mapStateToProps = ({decks}) => {
  return {
    decks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDelete: (deckTitle) => dispatch(removeDeck(deckTitle))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckCard)