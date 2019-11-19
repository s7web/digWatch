import { StyleSheet, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

export const drawerHeaderStyle = StyleSheet.create({
  logoContainer: {
    width: 110,
  },
  logo: {
    width: 111,
    position: 'absolute',
    left: SCREEN_WIDTH / 2 - 110,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  logoAlone: {
    width: 110,
    resizeMode: 'contain',
    position: 'absolute',
    left: SCREEN_WIDTH / 2 - 55,
  },
  header: {
    //height: SCREEN_WIDTH * 0.25,
    height: 80,
    backgroundColor: '#757575',
  },
  menuHeight: {
    backgroundColor: 'white',
    height: WINDOW_HEIGHT - 80,
  },
});
