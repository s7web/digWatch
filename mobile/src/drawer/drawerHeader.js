import React from 'react';
import { DrawerItems } from 'react-navigation-drawer';
import {
  View,
  Dimensions,
  Image,
  Linking,
  Text,
  TouchableHighlight,
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

import { drawerHeaderStyle } from '../../assets/globalStyle/style.ios';
import imgSource from '../../assets/images/logo/mainlogo.png';

const WINDOW_WIDTH = Dimensions.get('window').width;

export const CustomDrawerContentComponent = (props) => {
  return (
    <View style={drawerHeaderStyle.menuHeight}>
      <TouchableHighlight
        underlayColor="white"
        style={{
          marginLeft: 26,
          marginTop: 22,
        }}
        onPress={() => Linking.openURL('https://dig.watch/')}
      >
        <Image
          source={imgSource}
          style={{ width: 90, height: 60 }}
          resizeMode="contain"
        />
      </TouchableHighlight>
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
          onPress={() =>
            Linking.openURL('https://www.facebook.com/GenevaInternetPlatform/')
          }
        />
        <Icon
          containerStyle={{ margin: 10, padding: 4 }}
          name="twitter"
          type="font-awesome"
          color="lightgrey"
          onPress={() => Linking.openURL('https://twitter.com/GenevaGIP')}
        />
        <Icon
          containerStyle={{ margin: 10, padding: 4 }}
          name="linkedin"
          type="font-awesome"
          color="lightgrey"
          onPress={() =>
            Linking.openURL('https://www.linkedin.com/company/diplofoundation/')
          }
        />
        <Icon
          containerStyle={{ margin: 10, padding: 4 }}
          name="instagram"
          type="font-awesome"
          color="lightgrey"
          onPress={() =>
            Linking.openURL('https://www.instagram.com/diplofoundation/')
          }
        />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 12,
          marginBottom: 12,
        }}
      >
        <ListItem
          style={{ width: WINDOW_WIDTH - 24 }}
          key={0}
          title={
            <View style={{ flexDirection: 'row', marginTop: 12 }}>
              <Text style={{ fontFamily: 'robotoRegular' }}>
                Application powered by
              </Text>
              <Image
                source={imgSource}
                resizeMode="contain"
                style={{
                  width: 120,
                  height: 41,
                  position: 'relative',
                  top: -12,
                }}
              />
            </View>
          }
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
    title && (
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
