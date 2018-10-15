import {GET_DECKS, GET_DECK, ADD_CARD_TO_DECK, SAVE_DECK_TITLE, CREATE_QUIZ} from '../actions'

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
          quizes: []
        }
      }
    case ADD_CARD_TO_DECK :
      return {
        ...state,
        [action.key]: {
          title: state[action.key].title,
          questions: [...state[action.key].questions, action.card]
        }
      }
    case CREATE_QUIZ :
      return {
        ...state,
        [action.quizId]: {
          ...action.quiz
        }
      }
    default :
      return state
  }
}

export default decks

