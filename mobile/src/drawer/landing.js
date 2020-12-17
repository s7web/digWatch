import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { Icon } from 'react-native-elements';

import Landing from '../views/landing';

import config from '../config/stack';

const LandingDrawerItem = createStackNavigator(
  {
    Playground: {
      screen: Landing,
      navigationOptions: ({ navigation }) => ({
        title: 'Landing',
        headerLeft: (
          <Icon
            name="menu"
            size={30}
            type="entypo"
            iconStyle={{ paddingLeft: 10 }}
            onPress={navigation.toggleDrawer}
          />
        ),
      }),
    },
  },
  config
);

LandingDrawerItem.navigationOptions = {
  drawerLabel: 'Landing',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="email"
      size={30}
      iconStyle={{
        width: 30,
        height: 30,
      }}
      type="material"
      color={tintColor}
    />
  ),
};

export default LandingDrawerItem;
