export const GET_DECKS = 'GET_DECKS'
export const GET_DECK = 'GET_DECK'
export const SAVE_DECK_TITLE = 'SAVE_DECK_TITLE'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'

export const getDecks = (decks) => {
  return {
    type: GET_DECKS,
    decks
  }
}

export const getDeck = (deck) => {
  return {
    type: GET_DECK,
    deck
  }
}

export const saveDeckTitle = (newDeck) => {
  return {
    type: SAVE_DECK_TITLE,
    newDeck
  }
}

export const addCardToDeck = (title, card) => {
  return {
    type: ADD_CARD_TO_DECK,
    title,
    card
  }
}