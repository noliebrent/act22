import React from 'react';
import { View, StyleSheet } from 'react-native';
import Status from './components/Status';
import Edited from './components/edited';
import Rainbow from './components/rainbow';
import Tornado from './components/tornado';

export default function App() {
  return (
  <View style={styles.container}>
    <Rainbow></Rainbow>
    <View style={styles.content}></View>
    <View style={styles.inputMethodEditor}></View>
    <View style={styles.toolbar}></View>
    </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    backgroundColor: 'blue',
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: 'green',
  },
  toolbar: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.04)',
    backgroundColor: 'black',
  },
});
