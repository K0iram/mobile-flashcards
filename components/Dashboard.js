import React, { Component } from 'react'
import DeckCard from './DeckCard'
import { connect } from 'react-redux'
import { fetchDecks } from '../utils/api'
import { AsyncStorage } from 'react-native'
import { Container, Header, Content, Body, Text } from 'native-base'


class Dashboard extends Component {
  componentDidMount() {
    console.log(this.props.userDecks)
  }

  render() {
    const { userDecks } = this.props
    return (
      <Container>
        <Header>
          <Body>
            <Text>Your Flashcard Decks</Text>
          </Body>
        </Header>
        <Content>
          {
            userDecks.map((deck, i) => <DeckCard key={i} title={deck.title}/>)
          }
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (decks) => {
  return {
    userDecks: decks ? Object.values(decks) : []
  }
}

export default connect(mapStateToProps)(Dashboard)