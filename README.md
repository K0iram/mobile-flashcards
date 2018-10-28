## Mobile Flashcards App - Study Time Mobile

This is the final assesment for Udacity React Nanodegree. The challenge was to build a mobile application that allows the user to create flashcard decks and use them to quiz themselves. This app will be be able to run on IOS and Android operating systems.

## Summary

This app is deveolped and tested for IOS devices. It is a basic flashcards app that allows users to create flashcard decks, add cards to the decks and quiz themselves on those cards. The app utelizes React Native's [AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage) and Redux to handle all state managment and uses [Redux Persist](https://github.com/rt2zz/redux-persist) to persist the data.

Upon opening the app if a user has no cards the hoem screen will show a message that you have no cards and prompt you to make one. On navigating to the 'Add Deck' Tab on the bottom of the screen there is a simple Input and Submit button to enter the name of you new deck. If the input matches a deck in your decks you will get an alert that the deck already exists otherwise it will create a new deck and bring you to that deck. When inside the new deck you will have the option to add a new card and once there are cards in the deck you will have the option to quiz yourself. If you navigate back to the home screen you will find your created deck with the number of cards the you've added. When a user quizes themselves the are first show a prompt explaining the instructions and then a buttonto start the quiz. Starting the quiz will show each card individualy with a 'Correct' and 'Incorrect' button. Clicking the card will show the answer and then the user must pick if they got the answer correct or incorrect. Once the cards have all been show the user is shown a prompt with how many questions the got correct and the options to continue studying(go back to the deck) or restart the quiz.

As of right now this app is at the MVP stage and need some new features added like: Deleting Cards and Decks, Quiz records, and an Option to skip a question for the end.

## Create React Native App

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).
