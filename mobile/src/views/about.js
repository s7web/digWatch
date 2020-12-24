import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  Button,
  Linking,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { ApiRequests } from '../api/requests';
import HTML from 'react-native-render-html';
import HTMLView from 'react-native-htmlview';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default AboutPage = ({ navigation }) => {
  const [content, setContent] = useState(false);
  useEffect(() => {
    if (navigation.state.params == undefined) {
      navigation.push('About', { once: true });
    }

    ApiRequests.aboutPageContent().then((content) => {
      let data = content['data']['rows'][0];

      data.email = data.body.match(
        /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/g
      );

      data.body = data.body.replace(data.email.toString(), '-split-');
      data.body = data.body.split('-split-');
      data.body = data.body[0];
      data.email = data.email.toString();
      setContent(data);
    });
  }, []);
  return (
    <ScrollView style={styles.container}>
      {content && (
        <>
          <Text style={styles.title}>{content.title}</Text>
          <HTMLView
            stylesheet={(styles.body, { paddingBottom: 30 })}
            value={'<div>' + content.body + '</div>'}
            addLineBreaks={false}
            bullet=" &#x25cf; "
          />
          <Text
            style={
              (styles.body,
              {
                paddingBottom: 30,
                textDecorationLine: 'underline',
                color: 'blue',
              })
            }
            onPress={() => Linking.openURL(`mailto:${content.email}`)}
          >
            {content.email}
          </Text>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    marginTop: 12,
    marginBottom: 12,
    fontFamily: 'robotoRegular',
    color: '#757575',
  },
  body: {
    fontSize: 14,
    marginTop: 16,
    fontFamily: 'robotoRegular',
    color: '#757575',
  },
});
