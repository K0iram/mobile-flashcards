import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Alert
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import SubmitBtn from './SubmitBtn'

class FlipCard extends Component {
  constructor(props) {
    super(props)
    this.animatedValue = new Animated.Value(0)
    this.value = 0
    this.animatedValue.addListener(({ value }) => {
      this.value = value
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
  }

  flipCard = () => {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 10
      }).start()
    } else {
      Animated.spring(this.animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 10
      }).start()
    }

  }

  render() {
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate}
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }

    const {answer, question, deckTitle, index, isEditing, deleteCard} = this.props
    return (
        <View style={styles.container}>
          {isEditing &&
            <TouchableOpacity
              onPress={
                () => {
                  Alert.alert(
                    'Alert!',
                    `Are you sure you want to delete the this card?`,
                    [
                      {text: 'OK', onPress: () => deleteCard(deckTitle, index)},
                      {text: 'Cancel', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                  )
                }
              }
              style={styles.deleteBtn}
            >
              <FontAwesome name='times' size={15}/>
            </TouchableOpacity>
          }
          <TouchableOpacity onPress={this.flipCard}>
            <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
              <Text style={[styles.flipText, styles.flipTextFront]}>
                {`${question}${question.slice(question.length - 1) === '?' ? '' : '?'}`}
              </Text>
            </Animated.View>
            <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
              <Text style={styles.flipText}>
                {answer}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row'
  },
  flipCard: {
    width: 300,
    height: 125,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginTop: 17,
    marginRight: 10,
    marginLeft: 10,
    justifyContent: 'flex-start',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    alignItems: 'center',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    position: "absolute",
    top: 0,
    width: 300
  },
  flipText: {
    fontSize: 16,
    color: '#888',
    fontWeight: 'bold',
  },
  flipTextFront: {
    justifyContent: 'center'
  },
  deleteBtn: {
    margin: 10
  }
})


export default FlipCard

