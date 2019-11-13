import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import SlidingUpPanel from 'rn-sliding-up-panel';

const SCREEN_WIDTH = Dimensions.get('window').width;

{
  /* <Button title="Show panel" onPress={() => ref.show()} /> */
}

export const InAppNotification = ({ notifyData }) => {
  let animate = new Animated.Value(0);

  useEffect(() => {
    setTimeout(
      function() {
        startAnimation();
      }.bind(this),
      2000
    );
  }, []);

  startAnimation = () => {
    Animated.timing(animate, {
      toValue: 1,
      timing: 400,
    }).start(() => {
      setTimeout(function() {
        Animated.timing(animate, {
          toValue: 0,
          duration: 400,
        }).start();
      }, 5000);
    });
  };

  return (
    <Animated.View style={[styles.container, { opacity: animate }]}>
      <View>
        <Text style={styles.title}>{notifyData.title}</Text>
        <Text style={styles.text}>{notifyData.body}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    //width: SCREEN_WIDTH - 22,
    width: SCREEN_WIDTH,
    //marginLeft: 12,
    //marginRight: 12,
    position: 'absolute',
    top: 36,
    zIndex: 2,
    backgroundColor: '#757575',
    padding: 12,
    //borderRadius: 10,
    //borderWidth: 0.5,
    //borderColor: '#757778',
    height: 88,
  },
  title: {
    fontFamily: 'robotoRegular',
    fontSize: 18,
    color: 'white',
  },
  text: {
    fontFamily: 'robotoRegular',
    fontSize: 12,
    color: 'white',
  },
});
