import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { white } from '../utils/colors'
import FlipCard from 'react-native-flip-card'


class QuestionCard extends Component {

  render() {
    const { question, answer } = this.props
    return (
      <FlipCard style={styles.item}>
        <View>
          <Text style={{fontSize: 20}}>
            {question}
          </Text>
        </View>
        <View>
          <Text style={{fontSize: 20}}>
            {answer}
          </Text>
        </View>
      </FlipCard>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between'
  },
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 10 : 2,
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
    }
  },
})


export default QuestionCard