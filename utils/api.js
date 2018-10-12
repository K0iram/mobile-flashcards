import { AsyncStorage } from 'react-native'

export const DECKS_STORAGE_KEY = 'mobile-flashcards:decks'
export const QUIZ_STORAGE_KEY = 'mobile-flashcards:quiz'

export const fetchDecks = () => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
}

export const addDeck = (key) => {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [key]: {
      title: key,
      questions: []
    }
  }))
}

export const submitCard = (key, card, cards) => {
  let newQuestions = cards.concat(card)
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [key]: {
      title: key,
      questions: newQuestions
    }
  }))
}

export const removeEntry = (key) => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined,
      delete data[key]
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}

export const addQuiz = (key, deck) => {
  return AsyncStorage.mergeItem(QUIZ_STORAGE_KEY, JSON.stringify({
    [key]: {
      deck: deck,
      correctAnswers: 0
    }
  }))
}

export const answerQuestion = (key, correctAnswers) => {
  return AsyncStorage.mergeItem(QUIZ_STORAGE_KEY, JSON.stringify({
    [key]: {
      correctAnswers: correctAnswers
    }
  }))
}