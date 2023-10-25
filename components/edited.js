import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, Platform, Animated, Easing } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const statusHeight = Platform.OS === 'ios' ? Constants.statusBarHeight : 0;

export default class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
      bubbleOpacity: new Animated.Value(0),
    };
  }

  componentDidMount() {
    NetInfo.addEventListener(this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.removeEventListener(this.handleConnectivityChange);
  }

  handleConnectivityChange = state => {
    const { isConnected } = state;
    this.setState({ isConnected });

    Animated.timing(this.state.bubbleOpacity, { 
      toValue: isConnected ? 0 : 1,
      duration: 5000,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  render() {
    const { isConnected, bubbleOpacity } = this.state;
    const backgroundColor = isConnected ? 'blue' : 'red';

    return (
      <View style={[styles.status, { backgroundColor }]}>
        <StatusBar
          barStyle={isConnected ? 'dark-content' : 'light-content'}
          animated={false}
        />
        {!isConnected && (
          <Animated.View style={[styles.bubble, { opacity: bubbleOpacity }]}>
            <Text style={styles.text}>No network connection</Text>
          </Animated.View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  status: {
    height: statusHeight,
  },
  bubble: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'red',
  },
  text: {
    color: 'white',
  },
});