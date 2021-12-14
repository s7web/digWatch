import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Dimensions } from 'react-native';

import Events from '../views/events';
import {
  CustomDrawerContentComponent,
  navigationOptions,
} from './drawerHeader';

const WINDOW_WIDTH = Dimensions.get('window').width;

const EmptyDrawer = () => {
  return null;
};

const EventsDrawer = createDrawerNavigator(
  {
    Search: {
      screen: EmptyDrawer,
      navigationOptions: () => navigationOptions('Search'),
    },
    About: {
      screen: EmptyDrawer,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: 'About JIT reporting',
      }),
    },
    Landing: {
      screen: Events,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: () => null,
      }),
    },
    Notifications: {
      screen: EmptyDrawer,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: 'Notifications',
      }),
    },
  },
  {
    initialRouteName: 'Landing',
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

export default EventsDrawer;
