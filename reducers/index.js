import {GET_DECKS, GET_DECK, ADD_CARD_TO_DECK, SAVE_DECK_TITLE, CREATE_QUIZ, UPDATE_ANSWERS} from '../actions'

const decks = (state = {}, action) => {
  switch (action.type) {
    case GET_DECKS :
      return {
        ...state,
        ...action.decks
      }
    case GET_DECK :
      return {
        ...state,
        ...action.deck
      }
    case SAVE_DECK_TITLE :
      return {
        ...state,
        [action.newDeck]: {
          title: action.newDeck,
          questions: [],
          quiz: {}
        }
      }
    case ADD_CARD_TO_DECK :
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          questions: [...state[action.key].questions, action.card],
        }
      }
    case CREATE_QUIZ :
      return {
        ...state,
        [action.quizId]: {
          ...state[action.quizId],
          quiz: action.quiz
        }
      }
    case UPDATE_ANSWERS :
      return {
        ...state,
        [action.quizId]: {
          ...state[action.quizId],
          quiz: {
            ...state[action.quizId].quiz,
            correctAnswers: action.answers
          }
        }
      }
    default :
      return state
  }
}

export default decks

