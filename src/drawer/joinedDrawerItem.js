import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import { Dimensions } from 'react-native';

import Events from '../views/events';
import Conference from '../views/conference';
import ConferenceDay from '../views/conferenceDay';
import ConferenceDayIssue from '../views/conferenceIssue';
import ConferenceSearch from '../views/conferenceSearch';
import {
  CustomDrawerContentComponent,
  navigationOptions,
} from './drawerHeader';

const WINDOW_WIDTH = Dimensions.get('window').width;

const EmptyDrawer = () => {
  return null;
};

export const JoinedMenuWrapper = startPage => {
  const JoinedMenuDrawer = createDrawerNavigator(
    {
      Search: {
        screen: EmptyDrawer,
        navigationOptions: () => navigationOptions('Search'),
      },
      About: {
        screen: EmptyDrawer,
        navigationOptions: navigationOptions('About JIT reporting'),
      },
      Notifications: {
        screen: EmptyDrawer,
        navigationOptions: navigationOptions('Notifications', true),
      },
      ConferenceSearch: {
        screen: ConferenceSearch,
        navigationOptions: navigationOptions(null),
      },
      Landing: {
        screen: Events,
        navigationOptions: navigationOptions(null),
      },
      Conference: {
        screen: Conference,
        navigationOptions: navigationOptions(null),
      },
      ConferenceDay: {
        screen: ConferenceDay,
        navigationOptions: navigationOptions(null),
      },
      ConferenceDayIssue: {
        screen: ConferenceDayIssue,
        navigationOptions: navigationOptions(null),
      },
    },
    {
      initialRouteName: startPage,
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

  return JoinedMenuDrawer;
};
