import React, { Component } from 'react'
import DeckCard from './DeckCard'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { white } from '../utils/colors'


class Home extends Component {
  componentDidMount() {
    this.props.navigation.setParams({title: "Home"})
  }

  render() {
    const { userDecks } = this.props

    if(userDecks && userDecks.length < 1) {
      return (
        <View style={styles.center}>
          <Ionicons name={Platform.OS === 'ios' ? 'ios-sad-outline' : 'md-sad'} size={100}/>
          <Text>You Don't Have Any Decks Yet</Text>
        </View>
      )
    }

    return (
      <View>
        {userDecks.map((deck) => (
          <TouchableOpacity key={deck.title} onPress={() => this.props.navigation.navigate(
            'DeckView',
            { deckID: deck.title }
          )}>
            <DeckCard title={deck.title} questions={deck.questions}/>
          </TouchableOpacity>
          )
        )}
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

const mapStateToProps = (state) => {
  return {
    userDecks: state.decks ? Object.values(state.decks) : []
  }
}

export default connect(mapStateToProps)(Home)