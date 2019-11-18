import React from 'react';
import { DrawerItems, NavigationActions, Header } from 'react-navigation';
import { View, Dimensions, Image, Linking, Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { drawerHeaderStyle } from '../../assets/globalStyle/style.ios';

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
    <View style={drawerHeaderStyle.menuHeight}>
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
          justifyContent: 'flex-start',
          marginLeft: 12,
        }}
      >
        <Icon
          containerStyle={{ margin: 10, padding: 4 }}
          name="facebook-square"
          type="font-awesome"
          color="lightgrey"
          onPress={() => Linking.openURL(`https://www.facebook.com`)}
        />
        <Icon
          containerStyle={{ margin: 10, padding: 4 }}
          name="twitter"
          type="font-awesome"
          color="lightgrey"
        />
        <Icon
          containerStyle={{ margin: 10, padding: 4 }}
          name="linkedin"
          type="font-awesome"
          color="lightgrey"
        />
        <Icon
          containerStyle={{ margin: 10, padding: 4 }}
          name="instagram"
          type="font-awesome"
          color="lightgrey"
        />
      </View>
      <View
        style={{ position: 'absolute', bottom: 0, left: 12, marginBottom: 12 }}
      >
        <ListItem
          style={{ width: WINDOW_WIDTH - 24 }}
          key={0}
          title={() => (
            <View style={{ flexDirection: 'row', marginTop: 12 }}>
              <Text>Application powered by </Text>
              <Image
                source={require('../../assets/images/pb.png')}
                resizeMode="contain"
                style={{
                  width: 120,
                  height: 41,
                  position: 'relative',
                  top: -12,
                }}
              />
            </View>
          )}
          titleStyle={{
            fontFamily: 'robotoRegular',
            color: '#757575',
            fontSize: 14,
          }}
          topDivider
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
