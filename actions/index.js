export const GET_DECKS = 'GET_DECKS'
export const GET_DECK = 'GET_DECK'
export const SAVE_DECK_TITLE = 'SAVE_DECK_TITLE'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const CREATE_QUIZ = 'CREATE_QUIZ'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'


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

export const addCardToDeck = (key, card) => {
  return {
    type: ADD_CARD_TO_DECK,
    key,
    card
  }
}

export const createNewQuiz = (quizId, quiz) => {
  return {
    type: CREATE_QUIZ,
    quizId,
    quiz
  }
}