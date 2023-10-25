import Constants from 'expo-constants';
import { Platform, StatusBar, StyleSheet, Text, View, Animated, Easing } from 'react-native';
import React, { Component } from 'react';
import NetInfo from '@react-native-community/netinfo';

const statusHeight = (Platform.OS === 'ios' ? Constants.statusBarHeight : 0);

export default class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
      bounceValue: new Animated.Value(1), // Initialize bounceValue to 1
    };
  }

  componentDidMount() {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      this.netInfoSubscription = NetInfo.addEventListener(this.handleConnectivityChange);
    }
  }

  componentWillUnmount() {
    if (this.netInfoSubscription) {
      this.netInfoSubscription();
    }
  }

  handleConnectivityChange = state => {
    this.setState({
      isConnected: state.isConnected,
    });

    // Trigger bounce animation when the network connection is lost
    if (!state.isConnected) {
      this.startBounceAnimation();
    }
  };

  startBounceAnimation() {
    const { bounceValue } = this.state;

    Animated.sequence([
      Animated.spring(bounceValue, {
        toValue: 1.2, // Bounce up slightly
        friction: 2, // Adjust the bounce effect
        tension: 140, // Adjust the speed of the bounce
        useNativeDriver: false,
      }),
      Animated.spring(bounceValue, {
        toValue: 1.0, // Return to original size
        friction: 2,
        tension: 140,
        useNativeDriver: false,
      }),
    ]).start();
  }

  render() {
    const { isConnected, bounceValue } = this.state;
    const backgroundColor = isConnected ? 'green' : 'red';
    const statusBar = (
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={isConnected ? 'dark-content' : 'light-content'}
        animated={false}
      />
    );

    const messageContainer = (
      <View style={styles.messageContainer} pointerEvents="none">
        {statusBar}
        {!isConnected && (
          <Animated.View
            style={[
              styles.bubble,
              { transform: [{ scale: bounceValue }] }, // Apply bounce animation
            ]}
          >
            <Text style={styles.text}>No network connection</Text>
          </Animated.View>
        )}
      </View>
    );

    if (Platform.OS === 'ios') {
      return <View style={[styles.status, { backgroundColor }]}></View>;
    }
    return messageContainer;
  }
}

const styles = StyleSheet.create({
  status: {
    zIndex: 1,
    height: statusHeight,
  },
  messageContainer: {
    zIndex: 1,
    position: 'absolute',
    top: statusHeight + 20,
    right: 0,
    left: 0,
    height: 80,
    alignItems: 'center',
  },
  bubble: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    paddingBottom: 10,
    backgroundColor: 'red',
  },
  text: {
    color: 'white',
  },
});
