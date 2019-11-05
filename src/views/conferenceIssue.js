import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Linking,
  Dimensions,
  Image,
} from 'react-native';
import { ListItem, Input, Avatar, Divider } from 'react-native-elements';
import { ApiRequests, apiRoutes } from '../api/requests';
import RNPickerSelect from 'react-native-picker-select';
import HTML from 'react-native-render-html';
import { Loader } from '../utils/loader';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class ConferenceIssueScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      conferenceIssueData: false,
    };
  }

  componentDidMount() {
    //Parent data
    //this.props.navigation.state.params.conferenceIssueData

    const conferenceIssueData = this.props.navigation.state.params
      .conferenceIssueData;

    ApiRequests.conferencesDayReport(
      apiRoutes.conferencesDayReport + conferenceIssueData.uuid
    ).then(dayReport => {
      conferenceIssueData.body =
        dayReport.data.data.attributes.field_report_text.processed;

      this.setState({ conferenceIssueData });
    });
  }

  handleLinkOpen = href => {
    Linking.openURL(href);
  };

  render() {
    let { conferenceIssueData } = this.state;
    const placeholder = {
      label: 'Filter by issue',
      value: null,
      color: '#9EA0A4',
    };
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Input
            inputContainerStyle={{
              borderBottomWidth: 0,
            }}
            containerStyle={styles.input}
            placeholder="Search"
          />

          <RNPickerSelect
            placeholder={placeholder}
            onValueChange={value => console.log(value)}
            style={pickerSelectStyles}
            items={[
              { label: 'Football', value: 'football' },
              { label: 'Baseball', value: 'baseball' },
              { label: 'Hockey', value: 'hockey' },
            ]}
          />

          <Divider style={styles.divider} />

          {!conferenceIssueData && <Loader loading={true} />}

          {conferenceIssueData && (
            <>
              <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                <Image
                  source={{
                    uri: conferenceIssueData.image,
                  }}
                  style={{
                    width: 100,
                    height: 60,
                    resizeMode: 'contain',
                    marginLeft: 12,
                  }}
                />
                <View style={{ paddingRight: 12 }}>
                  <Text style={styles.title}>
                    {conferenceIssueData.formatedDate}
                  </Text>
                  <Text style={styles.title}>{conferenceIssueData.time}</Text>
                  <Text style={styles.subtitle}>
                    {conferenceIssueData.title}
                  </Text>
                </View>
              </View>

              <Divider style={styles.divider} />

              <ScrollView
                style={{
                  marginBottom: 12,
                  marginTop: 10,
                  paddingLeft: 12,
                  paddingRight: 12,
                }}
              >
                <HTML
                  html={conferenceIssueData.body}
                  imagesMaxWidth={Dimensions.get('window').width}
                  onLinkPress={(evt, href, htmlAttribs) =>
                    this.handleLinkOpen(href)
                  }
                  baseFontStyle={{
                    fontSize: 14,
                    fontFamily: 'robotoRegular',
                    color: '#414040',
                  }}
                />
              </ScrollView>
            </>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 12,
  },
  listContainer: {
    flex: 1,
  },
  input: {
    marginBottom: 18,
    marginTop: 8,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#757575',
    width: SCREEN_WIDTH - 22,
    marginLeft: 11,
  },
  divider: {
    backgroundColor: '#757575',
    width: SCREEN_WIDTH - 22,
    marginLeft: 11,
    marginBottom: 18,
    marginTop: 18,
  },
  title: {
    color: '#414040',
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'robotoBold',
    paddingLeft: 12,
    paddingRight: 12,
  },
  subtitle: {
    color: '#414040',
    fontSize: 12,
    fontFamily: 'robotoRegular',
    paddingLeft: 12,
    paddingRight: 12,
    width: SCREEN_WIDTH / 1.5,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderColor: '#757575',
    borderRadius: 10,
    borderWidth: 0.5,
    color: '#414040',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: SCREEN_WIDTH - 22,
    marginLeft: 11,
    marginBottom: 10,
    height: 40,
  },
  inputAndroid: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#757575',
    color: '#414040',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: SCREEN_WIDTH - 22,
    marginLeft: 11,
    marginBottom: 10,
    height: 40,
  },
});
