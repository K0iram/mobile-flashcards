import React from 'react'
import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'

const NOTIFICATION_KEY = 'mobile-flashcards:notifications'

export const clearLocalNotification = () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

createNotification = () => {
  return {
    title: 'Study Alert!',
    body: '👋 Don\'t forget to study today!!',
    ios: {
      sound: true
    }
  }
}

export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}