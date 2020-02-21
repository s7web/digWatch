import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { primary } from '../config/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../assets/images/logo/landing-background.png');
const DIGI_LOGO = require('../../assets/images/logo/digital-watch-logo.png');
const REPORTING_LOGO = require('../../assets/images/logo/reporting-logo.png');

export default class LandingScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          <View style={styles.logo}>
            <Image style={styles.image} source={DIGI_LOGO} />
          </View>

          <View style={styles.logo}>
            <Image style={styles.image} source={REPORTING_LOGO} />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: primary,
    resizeMode: 'contain',
  },
  logo: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    margin: 0,
  },
  image: {
    width: SCREEN_WIDTH * 0.5,
    resizeMode: 'contain',
  },
});
