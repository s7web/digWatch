import React from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';

import ConferenceDay from '../views/conferenceDay';
import { CustomDrawerContentComponent } from './drawerHeader';

const WINDOW_WIDTH = Dimensions.get('window').width;

const EmptyDrawer = () => {
  return null;
};

const ConferenceDayDrawer = createDrawerNavigator(
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
    ConferenceDay: {
      screen: ConferenceDay,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: () => null,
      }),
    },
  },
  {
    initialRouteName: 'ConferenceDay',
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

export default ConferenceDayDrawer;
