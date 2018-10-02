import React, { Component } from 'react'
import DeckCard from './DeckCard'
import { connect } from 'react-redux'
import { fetchDecks } from '../utils/api'
import { AsyncStorage } from 'react-native'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { white } from '../utils/colors'


class Dashboard extends Component {

  render() {
    const { userDecks } = this.props

    if(userDecks.length < 1) {
      return (
        <View style={styles.center}>
          <Ionicons name={Platform.OS === 'ios' ? 'ios-sad-outline' : 'md-sad'} size={100}/>
          <Text>You Don't Have Any Decks Yet</Text>
        </View>
      )
    }

    return (
      <View>
        {userDecks.map((deck) => <DeckCard key={deck.title} title={deck.title} questions={deck.questions}/>)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
    marginLeft: 30
  }
})

const mapStateToProps = (decks) => {
  return {
    userDecks: decks ? Object.values(decks) : []
  }
}

export default connect(mapStateToProps)(Dashboard)