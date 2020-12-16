// import { createDrawerNavigator } from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Dimensions } from 'react-native';

import Conference from '../views/conference';
import { CustomDrawerContentComponent } from './drawerHeader';

const WINDOW_WIDTH = Dimensions.get('window').width;

const EmptyDrawer = () => {
  return null;
};

const ConferenceDrawer = createDrawerNavigator(
  {
    Search: {
      screen: EmptyDrawer,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: 'Search',
      }),
    },
    About: {
      screen: EmptyDrawer,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: 'About JIT reporting',
      }),
    },
    Notifications: {
      screen: EmptyDrawer,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: 'Notifications',
      }),
    },
    Conference: {
      screen: Conference,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: () => null,
      }),
    },
  },
  {
    initialRouteName: 'Conference',
    drawerPosition: 'right',
    contentOptions: {
      activeTintColor: 'black',
      activeBackgroundColor: 'white',
      inactiveTintColor: 'grey',
      inactiveBackgroundColor: 'white',
      labelStyle: {
        fontSize: 15,
        marginLeft: 0,
      },
    },
    drawerWidth: WINDOW_WIDTH,
    contentComponent: CustomDrawerContentComponent,
    drawerBackgroundColor: 'transparent',
    overlayColor: 'transparent',
    headerLayoutPreset: 'center',
  }
);

export default ConferenceDrawer;
