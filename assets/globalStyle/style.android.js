import { StyleSheet, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
export const drawerHeaderStyle = StyleSheet.create({
  logo: {
    width: 110,
    resizeMode: 'contain',
    position: 'absolute',
    left: SCREEN_WIDTH / 2 - 110,
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
});
