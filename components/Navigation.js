import React from 'react'
import { Platform } from 'react-native'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { purple, white } from '../utils/colors'
import { FontAwesome } from '@expo/vector-icons'
import AddCard from './AddCard'
import Quiz from './Quiz'
import AddDeck from './AddDeck'
import Dashboard from './Dashboard'
import DeckView from './DeckView'

  const Tabs = createBottomTabNavigator({
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        tabBarLabel: 'Your Decks',
        tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
      },
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'Add Deck',
        tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
      },
    }
  }, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: purple,
      style: {
        height: 56,
        backgroundColor: white,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  })

  const Navigation = createStackNavigator({
    Home: {
      screen: Tabs,
      navigationOptions: {
        header: null
      }
    },
    DeckView: {
      screen: DeckView,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple
        }
      }
    },
    AddCard: {
      screen: AddCard,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        }
      }
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        }
      }
    }
  })

export default Navigation