import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { gray, white } from '../utils/colors'


const DeckCard = ({title, questions}) => {
  return (
    <View style={styles.item}>
      <View style={styles.card}>
        <Text style={{fontSize: 20}}>
          {title}
        </Text>
        <Text style={{fontSize: 16, color: gray}}>
          # of Cards: {questions.length}
        </Text>
      </View>
    </View>
  )
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

export default DeckCard