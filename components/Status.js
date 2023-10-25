import Constants from 'expo-constants';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';
import NetInfo from '@react-native-community/netinfo';

const statusHeight = (Platform.OS === 'ios' ? Constants.statusBarHeight : 0);

export default class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
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
  };

  render() {
    const { isConnected } = this.state;
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
          <View style={styles.bubble}>
            <Text style={styles.text}>No network connection</Text>
          </View>
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
