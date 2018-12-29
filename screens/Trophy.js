import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Trophy extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Trophy</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  Name: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
