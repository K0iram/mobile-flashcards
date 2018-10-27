export const GET_DECKS = 'GET_DECKS'
export const GET_DECK = 'GET_DECK'
export const SAVE_DECK_TITLE = 'SAVE_DECK_TITLE'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const CREATE_QUIZ = 'CREATE_QUIZ'
export const UPDATE_ANSWERS = 'UPDATE_ANSWERS'


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

export const updateAnswers = (quizId, answers) => {
  return {
    type: UPDATE_ANSWERS,
    quizId,
    answers
  }
}