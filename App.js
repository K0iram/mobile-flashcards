import React, { Component } from 'react'
import { View, StatusBar, StyleSheet, ActivityIndicator } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { purple } from './utils/colors'
import { Constants } from 'expo'
import Navigation from './components/Navigation'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import { setLocalNotification } from './utils/notifications'

FlashStatusBar = ({backgroundColor, ...props}) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}


class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }

  renderLoading = () => (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  )

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={this.renderLoading()}>
          <View style={{flex: 1}}>
            <FlashStatusBar backgroundColor={purple} barStyle="light-content" />
            <Navigation />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App