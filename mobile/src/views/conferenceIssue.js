import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Linking,
  Dimensions,
  Image,
  Share,
} from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import { Loader } from '../utils/loader';
import { ApiRequests, apiRoutes } from '../api/requests';
import HTML from 'react-native-render-html';
import PLACEHOLDER_IMAGE from '../../assets/images/placeholder.png';

const uri = Image.resolveAssetSource(PLACEHOLDER_IMAGE).uri;

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
      apiRoutes.conferencesSessionDayReport + conferenceIssueData.sessionid
    ).then((dayReport) => {
      conferenceIssueData.body = dayReport.data.rows[0].reporttext;
      conferenceIssueData.path = dayReport.data.rows[0].path;

      this.setState({ conferenceIssueData });
    });
  }

  handleLinkOpen = (href) => {
    Linking.openURL(href);
  };

  render() {
    let { conferenceIssueData } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Divider style={styles.divider} />

          {!conferenceIssueData && <Loader loading={true} />}

          {conferenceIssueData && (
            <>
              <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                <Image
                  source={{
                    uri:
                      conferenceIssueData.image !== ''
                        ? conferenceIssueData.image
                        : uri,
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
                  {conferenceIssueData.time !== '' && (
                    <Text style={styles.title}>{conferenceIssueData.time}</Text>
                  )}
                  <Text style={styles.subtitle}>
                    {conferenceIssueData.title.split('&#039;').join("'")}
                  </Text>
                </View>
              </View>

              <Divider style={styles.divider} />

              {conferenceIssueData.path != undefined && (
                <Icon
                  name={'share'}
                  size={29}
                  type="entypo"
                  underlayColor={'white'}
                  iconStyle={{
                    marginLeft: 12,
                    color: '#757575',
                  }}
                  containerStyle={{
                    display: 'flex',
                    alignItems: 'flex-start',
                  }}
                  onPress={async () =>
                    await Share.share({
                      message: `${
                        conferenceIssueData.eventTitle
                      } - ${conferenceIssueData.title
                        .split('&#039;')
                        .join("'")} -  ${conferenceIssueData.formatedDate} ${
                        conferenceIssueData.time
                      } | https://dig.watch${conferenceIssueData.path.alias}`,
                    })
                  }
                />
              )}

              <ScrollView
                style={{
                  marginBottom: 12,
                  marginTop: 10,
                  paddingLeft: 12,
                  paddingRight: 12,
                }}
              >
                <HTML
                  baseFontStyle={{
                    fontSize: 14,
                    color: '#414040',
                  }}
                  source={{ html: conferenceIssueData.body }}
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
