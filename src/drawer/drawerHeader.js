import React from 'react';
import { DrawerItems, NavigationActions } from 'react-navigation';
import { View, Dimensions, Image, Linking } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;

export const CustomDrawerContentComponent = props => {
  const navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'Landing',
      params: {},
      action: NavigationActions.navigate({ routeName: route }),
    });
    props.navigation.dispatch(navigateAction);
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        height: WINDOW_HEIGHT - 143,
      }}
    >
      <View
        style={{
          marginLeft: 26,
          marginTop: 22,
        }}
      >
        <Image
          source={require('../../assets/images/logo/mainlogo.png')}
          style={{ width: 90, height: 60 }}
          resizeMode="contain"
        />
      </View>
      <View style={{ marginLeft: 12 }}>
        <DrawerItems {...props} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Icon
          containerStyle={{ margin: 12, padding: 4 }}
          name="facebook-f"
          type="font-awesome"
          color="grey"
          onPress={() => Linking.openURL(`https://www.facebook.com`)}
        />
        <Icon
          containerStyle={{ margin: 12, padding: 4 }}
          name="instagram"
          type="font-awesome"
          color="grey"
        />
        <Icon
          containerStyle={{ margin: 12, padding: 4 }}
          name="twitter"
          type="font-awesome"
          color="grey"
        />
      </View>
    </View>
  );
};

export const navigationOptions = (title, lastItem = false) => ({
  drawerLabel: () =>
    title == null ? (
      title
    ) : (
      <ListItem
        style={{ width: WINDOW_WIDTH - 24 }}
        key={0}
        title={title}
        titleStyle={{ fontFamily: 'robotoRegular', color: '#757575' }}
        topDivider
        bottomDivider={lastItem}
      />
    ),
});
