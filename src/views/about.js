import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Dimensions, Text } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { ApiRequests } from '../api/requests';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default AboutPage = ({ navigation }) => {
  const [content, setContent] = useState(false);
  useEffect(() => {
    console.log('navigation', navigation);
    if (navigation.state.params == undefined) {
      navigation.push('About', { once: true });
    }

    ApiRequests.aboutPageContent().then(content => {
      setContent(content['data']['rows'][0]);
    });
  }, []);
  return (
    <ScrollView style={styles.container}>
      {content && (
        <>
          <Text style={styles.title}>{content.title}</Text>
          <Text style={styles.body}>{content.body}</Text>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
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
