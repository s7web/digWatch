import { StyleSheet, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
export const drawerHeaderStyle = StyleSheet.create({
  logo: {
    width: 110,
    resizeMode: 'contain',
  },
  header: {
    //height: SCREEN_WIDTH * 0.25,
    height: 80,
    backgroundColor: '#757575',
  },
});
