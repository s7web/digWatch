import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { Icon } from 'react-native-elements';
import {
  createAppContainer,
  createStackNavigator,
  StackActions,
  NavigationActions,
} from 'react-navigation';

import AppLoading from './components/AppLoading';
import { cacheImages, cacheFonts } from './helpers/AssetsCaching';

import { JoinedMenuWrapper } from './drawer/joinedDrawerItem';

import { drawerHeaderStyle } from '../assets/globalStyle/style';
const REPORTING_HEADER = require('../assets/images/logo/reporting-header.png');

import vectorFonts from './helpers/vector-fonts';

import registerForPushNotificationsAsync from './utils/pushNotifications';
import { Notifications } from 'expo';
import { InAppNotification } from './utils/inAppNotification';

const MainRoot = createAppContainer(
  createStackNavigator(
    {
      Landing: {
        path: '/',
        screen: JoinedMenuWrapper('Landing'),
        navigationOptions: ({ navigation }) => ({
          headerTitle: () => {
            return (
              <Image source={REPORTING_HEADER} style={drawerHeaderStyle.logo} />
            );
          },
          headerRight: (
            <Icon
              name="menu"
              size={30}
              type="entypo"
              iconStyle={{ paddingRight: 10, color: 'white' }}
              onPress={navigation.toggleDrawer}
            />
          ),
          headerLeft: (
            <Icon
              name="keyboard-backspace"
              size={30}
              type="material"
              iconStyle={{ color: 'transparent' }}
            />
          ),
          headerStyle: drawerHeaderStyle.header,
          headerTitleStyle: {
            marginLeft: 'auto',
            marginRight: 'auto',
          },
        }),
      },
      Conference: {
        path: '/conference',
        screen: JoinedMenuWrapper('Conference'),
        navigationOptions: ({ navigation }) => ({
          headerTitle: () => {
            return (
              <Image source={REPORTING_HEADER} style={drawerHeaderStyle.logo} />
            );
          },
          headerRight: (
            <Icon
              name="menu"
              size={30}
              type="entypo"
              iconStyle={{ paddingRight: 10, color: 'white' }}
              onPress={navigation.toggleDrawer}
            />
          ),
          headerLeft: (
            <Icon
              name="keyboard-backspace"
              size={30}
              type="material"
              iconStyle={{ paddingLeft: 10, color: 'white' }}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
          headerStyle: drawerHeaderStyle.header,
          headerTitleStyle: {
            marginLeft: 'auto',
            marginRight: 'auto',
          },
        }),
      },
      ConferenceDay: {
        path: '/conference/day',
        screen: JoinedMenuWrapper('ConferenceDay'),
        navigationOptions: ({ navigation }) => ({
          headerTitle: () => {
            return (
              <Image source={REPORTING_HEADER} style={drawerHeaderStyle.logo} />
            );
          },
          headerRight: (
            <Icon
              name="menu"
              size={30}
              type="entypo"
              iconStyle={{ paddingRight: 10, color: 'white' }}
              onPress={navigation.toggleDrawer}
            />
          ),
          headerLeft: (
            <Icon
              name="keyboard-backspace"
              size={30}
              type="material"
              iconStyle={{ paddingLeft: 10, color: 'white' }}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
          headerStyle: drawerHeaderStyle.header,
          headerTitleStyle: {
            marginLeft: 'auto',
            marginRight: 'auto',
          },
        }),
      },
      ConferenceDayIssue: {
        path: '/conference/day/issue',
        screen: JoinedMenuWrapper('ConferenceDayIssue'),
        navigationOptions: ({ navigation }) => ({
          headerTitle: () => {
            return (
              <Image source={REPORTING_HEADER} style={drawerHeaderStyle.logo} />
            );
          },
          headerRight: (
            <Icon
              name="menu"
              size={30}
              type="entypo"
              iconStyle={{ paddingRight: 10, color: 'white' }}
              onPress={navigation.toggleDrawer}
            />
          ),
          headerLeft: (
            <Icon
              name="keyboard-backspace"
              size={30}
              type="material"
              iconStyle={{ paddingLeft: 10, color: 'white' }}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
          headerStyle: drawerHeaderStyle.header,
          headerTitleStyle: {
            marginLeft: 'auto',
            marginRight: 'auto',
          },
        }),
      },
      ConferenceSearch: {
        path: '/conference/day/issue/search',
        screen: JoinedMenuWrapper('ConferenceSearch'),
        navigationOptions: ({ navigation }) => ({
          headerTitle: () => {
            return (
              <Image source={REPORTING_HEADER} style={drawerHeaderStyle.logo} />
            );
          },
          headerRight: (
            <Icon
              name="menu"
              size={30}
              type="entypo"
              iconStyle={{ paddingRight: 10, color: 'white' }}
              onPress={navigation.toggleDrawer}
            />
          ),
          headerLeft: (
            <Icon
              name="keyboard-backspace"
              size={30}
              type="material"
              iconStyle={{ paddingLeft: 10, color: 'white' }}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
          headerStyle: drawerHeaderStyle.header,
          headerTitleStyle: {
            marginLeft: 'auto',
            marginRight: 'auto',
          },
        }),
      },
      About: {
        path: '/website/page/for/about/details',
        screen: JoinedMenuWrapper('About'),
        navigationOptions: ({ navigation }) => ({
          headerTitle: () => {
            return (
              <Image source={REPORTING_HEADER} style={drawerHeaderStyle.logo} />
            );
          },
          headerRight: (
            <Icon
              name="menu"
              size={30}
              type="entypo"
              iconStyle={{ paddingRight: 10, color: 'white' }}
              onPress={navigation.toggleDrawer}
            />
          ),
          headerLeft: (
            <Icon
              name="keyboard-backspace"
              size={30}
              type="material"
              iconStyle={{ paddingLeft: 10, color: 'white' }}
              onPress={() => {
                const resetAction = StackActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({ routeName: 'Landing' }),
                  ],
                });
                navigation.dispatch(resetAction);
              }}
            />
          ),
          headerStyle: drawerHeaderStyle.header,
          headerTitleStyle: {
            marginLeft: 'auto',
            marginRight: 'auto',
          },
        }),
      },
    },
    {
      headerMode: 'float',
    }
  )
);

export default () => {
  const [isReady, setIsReady] = useState(false);
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    registerForPushNotificationsAsync().then(() => {
      _notificationSubscription = Notifications.addListener(
        _handleNotification
      );
    });
  }, []);

  _handleNotification = notification => {};

  const loadAssetsAsync = async () => {
    const imageAssets = cacheImages([
      require('../assets/images/logo/digital-watch-logo.png'),
      require('../assets/images/logo/landing-background.png'),
      require('../assets/images/logo/reporting-logo.png'),
      require('../assets/images/logo/reporting-header.png'),
      require('../assets/icons/calendar.png'),
    ]);

    const fontAssets = cacheFonts([
      ...vectorFonts,
      { robotoRegular: require('../assets/fonts/Roboto-Regular.ttf') },
      { robotoBold: require('../assets/fonts/Roboto-Bold.ttf') },
    ]);

    await Promise.all([...imageAssets, ...fontAssets]);
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadAssetsAsync}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <>
      <MainRoot />
    </>
  );
};
