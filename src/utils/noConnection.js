import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Icon } from 'react-native-elements';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

export const NoConnection = () => (
  <View style={noConnectionStyles.container}>
    <Icon reverse size={30} name="wifi-lock" color="grey" />
  </View>
);

const noConnectionStyles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    backgroundColor: 'rgba(201, 201, 201, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
  },
});
