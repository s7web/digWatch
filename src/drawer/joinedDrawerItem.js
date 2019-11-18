import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import { Dimensions, Easing, Animated } from 'react-native';
import Events from '../views/events';
import Conference from '../views/conference';
import ConferenceDay from '../views/conferenceDay';
import ConferenceDayIssue from '../views/conferenceIssue';
import ConferenceSearch from '../views/conferenceSearch';
import AboutPage from '../views/about';
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
      About: {
        screen: AboutPage,
        navigationOptions: navigationOptions('About JIT reporting', true),
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
      //drawerType: 'slide',
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
