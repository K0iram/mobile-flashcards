import React from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { gray, white } from '../utils/colors'
import { FontAwesome } from '@expo/vector-icons'
import { removeDeck } from '../actions'
import { NavigationActions } from 'react-navigation'
import { deleteDeck } from '../utils/api'

const onRemoveDeck = (deckTitle) => {
  const { onDelete } = this.props

  let title = deckTitle.toLowerCase()
  onDelete(title)
  deleteDeck(title)
}

const DeckCard = ({title, questions}) => {
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
                  {text: 'OK', onPress: () => onRemoveDeck(title)},
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

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between'
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
    onDelete: (deckTitle) => dispatch(removeDeck(title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckCard)