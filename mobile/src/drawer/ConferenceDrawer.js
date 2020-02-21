import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { Icon, Text } from 'react-native-elements';
import { Image } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { drawerHeaderStyle } from '../../assets/globalStyle/style';

import Conference from '../views/conference';

import config from '../config/stack';

const REPORTING_HEADER = require('../../assets/images/logo/reporting-header.png');

const ConferenceDrawer = createStackNavigator(
  {
    ConferenceDrawer: {
      screen: Conference,
      navigationOptions: ({ navigation }) => ({
        title: 'Conference',
        headerTitle: () => {
          return (
            <Text>
              <Image source={REPORTING_HEADER} style={drawerHeaderStyle.logo} />
            </Text>
          );
        },
        headerRight: (
          <Icon
            name={navigation.state.isDrawerOpen ? 'cross' : 'menu'}
            size={30}
            underlayColor={'#757575'}
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
            underlayColor={'#757575'}
            iconStyle={{ paddingLeft: 10, color: 'white' }}
            onPress={() => navigation.dispatch(NavigationActions.back())}
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
  config
);

ConferenceDrawer.navigationOptions = {
  drawerLabel: () => null,
};

export default ConferenceDrawer;
