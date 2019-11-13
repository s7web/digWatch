import React from 'react';
import { DrawerItems, NavigationActions } from 'react-navigation';
import { View, Dimensions, Image, Text } from 'react-native';
import { ListItem } from 'react-native-elements';

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
        //onPress={() => alert(123)}
      />
    ),
});
