import { StyleSheet, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

export const drawerHeaderStyle = StyleSheet.create({
  logoContainer: {
    position: 'absolute',
    left: SCREEN_WIDTH / 2 - 110,
  },
  logo: {
    width: 110,
    position: 'absolute',
    left: SCREEN_WIDTH / 2 - 125,
  },
  image: {
    resizeMode: 'contain',
  },
  logoAlone: {
    width: 110,
    resizeMode: 'contain',
    position: 'absolute',
    left: SCREEN_WIDTH / 2 - 55,
  },
  header: {
    height: 80,
    backgroundColor: '#757575',
  },
  menuHeight: {
    backgroundColor: 'white',
    height: WINDOW_HEIGHT - 124,
  },
});
