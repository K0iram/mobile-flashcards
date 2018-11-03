import {
  ADD_CARD_TO_DECK,
  SAVE_DECK_TITLE,
  CREATE_QUIZ,
  UPDATE_ANSWERS,
  REMOVE_DECK,
  REMOVE_CARD
} from '../actions'
import { combineReducers } from 'redux';

const decks = (state = {}, action) => {
  switch (action.type) {
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
    case REMOVE_DECK :
      delete state[action.deckTitle]
      return {
        ...state,
      }
    case REMOVE_CARD :
      let qRemoved = state[action.key].questions.filter((q, i) => i !== action.index)
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          questions: qRemoved
        }
      }
    default :
      return state
  }
}

export default combineReducers({
  decks
})

